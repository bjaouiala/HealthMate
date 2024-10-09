import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {ActivationAccountComponent} from "./pages/activation-account/activation-account.component";

const routes: Routes = [{
  path:'register',
  component:RegisterComponent
},{
  path:'login',
  component: LoginComponent
},{
  path:'activation-account',
  component: ActivationAccountComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
