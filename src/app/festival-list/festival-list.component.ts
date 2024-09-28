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
  public newFestival: Festival = { id: '', nombre: '', lugar: '', fecha: '', artistas: [    {
      id: '',
      nombre: '',
      albums: [],
      canciones: [],
      genero: '',
      pais: ''
    }
    ] };


  constructor(private festivalService: FestivalService, private artistService: ArtistService, private router: Router) { }

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
    const festivalCard = document.querySelector('.expanded');
  }

  public goBack(): void {
    this.selectedFestival = null;
  }

  public showForm(): void {
    this.isFormVisible = true;
    this.selectedFestival = null;
  }

  public cancelForm(): void {
    this.isFormVisible = false;
    this.newFestival = { 'id': '', 'nombre': '', 'lugar': '', 'fecha': '', 'artistas': [] };
  }

  public onSubmit(): void {
    this.festivalService.addFestival((this.newFestival)).subscribe({
      next: (response: Festival) => {
        this.festivals.push(response);
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Festival data successfully added');
      }
    });
    }

  addArtist() {
    // Obtener el último artista de la lista
    const lastArtistIndex = this.newFestival.artistas.length - 1;

    // Asegurarse de que el ID y el nombre del último artista no estén vacíos
    const artistId = this.newFestival.artistas[lastArtistIndex].id;
    const artistNombre = this.newFestival.artistas[lastArtistIndex].nombre;

    if (!artistId || !artistNombre) {
      console.warn('Por favor, completa el ID y el Nombre del artista antes de agregar uno nuevo.');
      return;
    }

    // Añadir un nuevo artista vacío a la lista
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
      id: artistId,
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


  removeArtist(index: number) {
    this.newFestival.artistas.splice(index, 1);
  }


  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
