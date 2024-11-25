import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import {ActivationAccountComponent} from "./activation-account/activation-account.component";
import {PostListComponent} from "../post-list/post-list.component";


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },{
        path:'activation-account',
        component: ActivationAccountComponent

      },{
      path:"posts",
        component:PostListComponent
      }

    ],
  },
];
