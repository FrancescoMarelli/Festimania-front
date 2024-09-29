import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Festival} from "../festival";
import {FestivalService} from "../festival.service";
import {FormsModule} from "@angular/forms";
import {MenubarModule} from "primeng/menubar";
import {Router} from "@angular/router";
import {ArtistService} from "../artist.service";
import {Artista} from "../artista";

@Component({
  selector: 'app-festival-list',
  standalone: true,
  imports: [
    Button,
    CardModule,
    NgForOf,
    NgIf,
    PrimeTemplate,
    FormsModule,
    MenubarModule
  ],
  templateUrl: './festival-list.component.html',
  styleUrl: './festival-list.component.css'
})
export class FestivalListComponent implements OnInit {
  public festivals: Festival[] = [];
  public selectedFestival: Festival | null = null;
  public isFormVisible: boolean = false;
  public isEditing: boolean = false;
  public newFestival: Festival = {
    id: this.generatedId(), nombre: '', lugar: '', fecha: '', artistas: [{
      id: this.generatedId(),
      nombre: '',
      albums: [],
      canciones: [],
      genero: '',
      pais: ''
    }
    ]
  };


  constructor(private festivalService: FestivalService,
              private artistService: ArtistService,
              private router: Router) {
  }

  ngOnInit() {
    this.getFestivals();
  }

  public getFestivals(): void {
    this.festivalService.getFestivals().subscribe({
      next: (response: Festival[]) => {
        this.festivals = response;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Festival data successfully fetched');
      }
    });
  }

  public selectFestival(festival: Festival): void {
    this.selectedFestival = festival;
  }

  public goBack(): void {
    this.selectedFestival = null;
  }

  public showForm(): void {
    this.isFormVisible = true;
    this.isEditing = false;
    this.selectedFestival = null;
  }

  public cancelForm(): void {
    this.isFormVisible = false;
    this.newFestival = {'id': '', 'nombre': '', 'lugar': '', 'fecha': '', 'artistas': []};
  }

  public onSubmit(): void {
    if (this.isEditing) {
      this.festivalService.updateFestival(this.newFestival).subscribe({
        next: (response: Festival) => {
          const index = this.festivals.findIndex(f => f.id === response.id);
          if (index !== -1) {
            this.festivals[index] = response; // Update the festival in the list
          }
          this.isFormVisible = false;
          // Guardar cada artista en la base de datos
          this.newFestival.artistas.forEach(artist => {
            this.artistService.addArtist(artist).subscribe({
              next: () => {
                console.log('Artista agregado correctamente');
              },
              error: (error: any) => {
                console.error('Error al agregar artista:', error);
              }
            });
          });
          this.newFestival = {id: this.newFestival.id, nombre: '', lugar: '', fecha: '', artistas: []};
        },
        error: (error: any) => {
          console.error('Error al guardar los cambios:', error);
        }
      });
    } else {
      this.festivalService.addFestival(this.newFestival).subscribe({
        next: (response: Festival) => {
          this.festivals.push(response);
          this.isFormVisible = false;
          this.newFestival.artistas.forEach(artist => {
            this.artistService.addArtist(artist).subscribe({
              next: () => {
                console.log('Artista agregado correctamente');
              },
              error: (error: any) => {
                console.error('Error al agregar artista:', error);
              }
            });
          });

          this.newFestival = {id: this.generatedId(), nombre: '', lugar: '', fecha: '', artistas: []};
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

  addArtist() {
    const lastArtistIndex = this.newFestival.artistas.length - 1;
    const artistNombre = this.newFestival.artistas[lastArtistIndex].nombre;

    this.newFestival.artistas.push({
      id: '', // Inicialmente vacío, se llenará con el ID del input
      nombre: '',
      albums: [],
      canciones: [],
      genero: '',
      pais: ''
    });

    // Enviar el artista al backend
    this.artistService.addArtistToFestival(this.newFestival.id, {
      id: this.generatedId(),
      nombre: artistNombre,
      albums: [],
      canciones: [],
      genero: '',
      pais: ''
    }).subscribe({
      next: (response: any) => {
        console.log('Artista agregado correctamente al festival');
      },
      error: (error: any) => {
        console.error('Error al agregar artista:', error);
      }
    });
  }

  public editFestival(festival: Festival): void {
    this.isFormVisible = true;
    this.isEditing = true;
    this.newFestival = { ...festival }; // Copy the festival details to newFestival
  }


  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  protected generatedId(): string {
    return Date.now().toString(); // Devuelve el timestamp actual como un string
  }
}
