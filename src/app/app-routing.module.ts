import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NasaComponent } from './components/nasa/nasa.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { Redirect24HComponent } from './components/redirect24-h/redirect24-h.component';

import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { reduce } from 'rxjs/operators';
import { SearcheHistoryComponent } from './components/search-history/search-history.component';

const redirectLoggedInToApod = () => redirectLoggedInTo(['apod']);
const redirectUnothorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'apod', component: NasaComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnothorizedToLogin}},
  {path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToApod}},
  {path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToApod}},
  {path: 'history', component: SearcheHistoryComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnothorizedToLogin}},
  {path: 'redirect24h', component: Redirect24HComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


// const redirect24HToLogin = () => map((user: UserFromFirebase) => {
//   if (user) {
//     const lastLogin = parseInt(user.metadata.b)
//     const difference = Date.now() - lastLogin;
//     if (difference > 10000) {
//       return ['redirect24h']
//     } else {
//       return ['apod']
//     }
//   } else {
//     return ['login']
//   }
// })
