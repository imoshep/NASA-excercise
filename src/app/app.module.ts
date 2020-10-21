import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule} from "@angular/material/datepicker"
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NasaComponent } from './components/nasa/nasa.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AuthService } from './services/auth.service';
import { ApodCardComponent } from './components/apod-card/apod-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { Redirect24HComponent } from './components/redirect24-h/redirect24-h.component';
import { SearcheHistoryComponent } from './components/search-history/search-history.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

import { environment } from 'src/environments/environment';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NasaComponent,
    SearchboxComponent,
    SearchResultsComponent,
    ApodCardComponent,
    NavbarComponent,
    RegisterComponent,
    HomepageComponent,
    Redirect24HComponent,
    SearcheHistoryComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    AngularToastifyModule
  ],
  providers: [AuthService, DatePipe, {provide: MAT_DATE_LOCALE, useValue: 'en-IL'}, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
