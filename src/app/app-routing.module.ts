import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NasaComponent } from './components/nasa/nasa.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {path: '', component: NasaComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// {path: '', component: NasaComponent, canActivate: [AuthGuard]},
