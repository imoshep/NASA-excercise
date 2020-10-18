import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule} from "@angular/material/datepicker"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NasaComponent } from './components/nasa/nasa.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApodCardComponent } from './components/apod-card/apod-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NasaComponent,
    SearchboxComponent,
    SearchResultsComponent,
    ApodCardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AuthService, DatePipe, {provide: MAT_DATE_LOCALE, useValue: 'en-IL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
