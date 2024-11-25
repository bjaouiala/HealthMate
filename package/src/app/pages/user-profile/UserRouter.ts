import { Routes } from '@angular/router';
import {UserProfileComponent} from "./user-profile.component";


export const UserRouter: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserProfileComponent,
      },
    ],
  },
];
