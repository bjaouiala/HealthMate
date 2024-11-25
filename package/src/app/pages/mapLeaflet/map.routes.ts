import { Routes } from '@angular/router';

import {LeafletMapComponent} from "./map/map.component";
import {MedicalCenterFormComponent} from "./medical-center-form-component/medical-center-form-component.component";


export const MapRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/map', pathMatch: 'full' }, // Default route
      { path: 'map', component: LeafletMapComponent }, // Map route
      { path: '**', redirectTo: '/map' }, // Wildcard route
    ],
  },
];
