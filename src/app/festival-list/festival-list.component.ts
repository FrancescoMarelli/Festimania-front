import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Festival} from "../festival";
import {FestivalService} from "../festival.service";
import {FormsModule} from "@angular/forms";
import {MenubarModule} from "primeng/menubar";

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
  public newFestival: Festival = { id: '', nombre: '', lugar: '', fecha: '', artistas: [] };


  constructor(private festivalService: FestivalService) { }

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


}
