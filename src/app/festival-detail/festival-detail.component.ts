import {Component, OnInit} from '@angular/core';
import {Festival} from "../festival";
import {FestivalService} from "../festival.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";

@Component({
  selector: 'app-festival-detail',
  standalone: true,
  imports: [CommonModule, CardModule, Button],
  templateUrl: './festival-detail.component.html',
  styleUrl: './festival-detail.component.css'
})

export class FestivalDetailComponent implements OnInit {
  festival!: Festival;
  constructor( private route: ActivatedRoute,
               private festivalService: FestivalService,
               private router: Router
  ) { }

  ngOnInit(): void {
    this.getFestival();
  }

  getFestival(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      throw new Error('Festival ID is null');
    }
    this.festivalService.getFestivalById(id)
      .subscribe({
        next: (response: Festival) => {
          this.festival = response;
        },
        error: (error: any) => {
          console.error(error);
        }
      }
    );
  }

  protected goBack(): void {
    this.router.navigate(['/festival-list']);
  }

}
