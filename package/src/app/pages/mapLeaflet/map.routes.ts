import { Routes } from '@angular/router';

import {LeafletMapComponent} from "./map/map.component";

export const MapRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'map', component: LeafletMapComponent },
    ],
  },
];
