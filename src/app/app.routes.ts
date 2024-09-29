import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {FestivalDetailComponent} from "./festival-detail/festival-detail.component";
import {FestivalListComponent} from "./festival-list/festival-list.component";
import {AuthComponent} from "./auth/auth.component";

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'festival-list', component: FestivalListComponent },
  { path: 'festival/:id', component: FestivalDetailComponent },
  { path : '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
