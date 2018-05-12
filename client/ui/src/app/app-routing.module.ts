import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './auth-guard.service';

const Ruts: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'register',
    component: RegistrationComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path:'login',
    component: LoginComponent,
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(Ruts,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
