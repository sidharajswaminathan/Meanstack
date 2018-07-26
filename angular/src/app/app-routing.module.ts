import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';

const routers: Routes = [
  {path: '', redirectTo: '/loginpage', pathMatch: 'full'},
  {path: 'signuppage', component: SignupComponent},
  {path: 'loginpage', component: LoginComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
