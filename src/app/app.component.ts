import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {Festival} from "./festival";
import {FestivalService} from "./festival.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {MenubarModule} from "primeng/menubar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,     // Required for structural directives like *ngFor
    HttpClientModule,
    RouterOutlet,
    CardModule,
    Button,
    MenubarModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public festivals: Festival[] = [];
  items: any[] = [];

  constructor(private festivalService: FestivalService, private router: Router) { }

  ngOnInit() {
    this.getFestivals();
  }

  public getFestivals(): void {
    this.router.navigate(['/festival-list']);
  }

  showDetails(festival: Festival) {
    console.log('Navigating to festival with id: ' + festival.id);
    this.router.navigate(['/festival', festival.id]);
  }

}
