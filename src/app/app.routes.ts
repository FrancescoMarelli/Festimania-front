import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {NgModule} from "@angular/core";
import {FestivalDetailComponent} from "./festival-detail/festival-detail.component";
import {FestivalListComponent} from "./festival-list/festival-list.component";

export const routes: Routes = [
  { path: 'festival-list', component: FestivalListComponent },
  { path: 'festival/:id', component: FestivalDetailComponent },
  { path : '', redirectTo: '/festival-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
