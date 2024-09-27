import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Festival} from "../festival";
import {FestivalService} from "../festival.service";

@Component({
  selector: 'app-festival-list',
  standalone: true,
    imports: [
        Button,
        CardModule,
        NgForOf,
        NgIf,
        PrimeTemplate
    ],
  templateUrl: './festival-list.component.html',
  styleUrl: './festival-list.component.css'
})
export class FestivalListComponent implements OnInit {
  public festivals: Festival[] = [];
  public selectedFestival: Festival | null = null;

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

}
