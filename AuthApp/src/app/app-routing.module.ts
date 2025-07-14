import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-User',
    component: AddUsersComponent
  },
  {
    path: 'manage-User',
    component: ManageUsersComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'Reset-password',
  //   component: ResetPasswordComponent
  // },
  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent
  // },
  {
    path: 'Profile',
    component: ProfileComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
