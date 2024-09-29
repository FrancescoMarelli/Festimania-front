import { Component, OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { CardModule } from "primeng/card";
import { NgForOf, NgIf } from "@angular/common";
import { PrimeTemplate } from "primeng/api";
import { Festival } from "../festival";
import { FestivalService } from "../festival.service";
import { FormsModule } from "@angular/forms";
import { MenubarModule } from "primeng/menubar";
import { Router } from "@angular/router";
import { ArtistService } from "../artist.service";
import { Artista } from "../artista";

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
  styleUrls: ['./festival-list.component.css'] // Corrected this to 'styleUrls'
})
export class FestivalListComponent implements OnInit {
  public festivals: Festival[] = [];
  public selectedFestival: Festival | null = null;
  public isFormVisible: boolean = false;
  public isEditing: boolean = false;
  public newFestival: Festival = {
    id: this.generatedId(),
    nombre: '',
    lugar: '',
    fecha: '',
    artistas: []
  };

  constructor(
    private festivalService: FestivalService,
    private artistService: ArtistService,
    private router: Router
  ) {}

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
    this.newFestival = { id: this.generatedId(), nombre: '', lugar: '', fecha: '', artistas: [] }; // Reset newFestival
  }

  public cancelForm(): void {
    this.isFormVisible = false;
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

          // Add artists to the festival
          this.newFestival.artistas.forEach(artist => {
            this.artistService.addArtistToFestival(response.id, artist).subscribe({
              next: () => {
                console.log('Artista agregado correctamente al festival');
              },
              error: (error: any) => {
                console.error('Error al agregar artista:', error);
              }
            });
          });

          this.newFestival = { id: this.generatedId(), nombre: '', lugar: '', fecha: '', artistas: [] };
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

  public addArtist(): void {
    const newArtist: Artista = {
      id: this.generatedId(),
      nombre: '',
      albums: [],
      canciones: [],
      genero: '',
      pais: ''
    };

    this.newFestival.artistas.push(newArtist);
    console.log('Artista añadido:', newArtist);
  }

  public editFestival(festival: Festival): void {
    this.isFormVisible = true;
    this.isEditing = true;
    this.newFestival = { ...festival };
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  protected generatedId(): string {
    return Date.now().toString();
  }
  public deleteFestival(festival: Festival): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el festival "${festival.nombre}"?`)) {
      this.festivalService.deleteFestival(festival.id).subscribe({
        next: () => {
          this.festivals = this.festivals.filter(f => f.id !== festival.id);
          console.log(`Festival "${festival.nombre}" eliminado correctamente.`);
        },
        error: (error: any) => {
          console.error('Error al eliminar el festival:', error);
        }
      });
    }
  }

}
