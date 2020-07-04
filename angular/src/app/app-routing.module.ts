import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ReactiveformSignupComponent} from "./reactiveform-signup/reactiveform-signup.component";
import { FamilyPageComponent } from './family-page/family-page.component';

const routers: Routes = [
  {path: '', redirectTo: '/familytree', pathMatch: 'full'},
  {path: 'signuppage', component: ReactiveformSignupComponent},
  {path: 'loginpage', component: LoginComponent},
  {path: 'familytree',component:FamilyPageComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
