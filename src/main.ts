import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {AppRoutingModule} from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, AppRoutingModule) //  Angular 17
  ]
})
  .catch((err) => console.error(err));
