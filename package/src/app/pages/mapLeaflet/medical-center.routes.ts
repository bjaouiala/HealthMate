import { Routes } from '@angular/router';

import {LeafletMapComponent} from "./map/map.component";
import {MedicalCenterFormComponent} from "./medical-center-form-component/medical-center-form-component.component";


export const MedicalCenterRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/map', pathMatch: 'full' }, // Default route
      { path: 'medical-center/add', component: MedicalCenterFormComponent }, // Add medical center route
      { path: 'medical-center/edit/:id', component: MedicalCenterFormComponent }, // Edit medical center route
      { path: '**', redirectTo: '/map' }, // Wildcard route
    ],
  },
];
