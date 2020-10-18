import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NasaComponent } from './components/nasa/nasa.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLoggedInToApod = () => redirectLoggedInTo(['apod']);
const redirectUnothorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'apod', component: NasaComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnothorizedToLogin }},
  {path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToApod }},
  {path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToApod }},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

