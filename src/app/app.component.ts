import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Festival} from "./festival";
import {FestivalService} from "./festival.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,     // Required for structural directives like *ngFor
    HttpClientModule,
    RouterOutlet,
    CardModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public festivals: Festival[] = [];

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

}
