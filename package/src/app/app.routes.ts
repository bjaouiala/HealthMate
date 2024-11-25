import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {MedicalCenterRoutes} from "./pages/mapLeaflet/medical-center.routes";

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',

        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
      {
        path: 'healthindices',
        loadChildren: () =>
          import('./pages/health-indices/health-indices.routes').then((m) => m.HealthIndiceRoutes),
      },
      {
        path: 'healthGoals',
        loadChildren: () =>
          import('./pages/health-goals/health-goals.routes').then((m) => m.HealthGoalsRoutes),
      },
      {
        path: 'medicalCenter',
        loadChildren: () =>
          import('./pages/mapLeaflet/medical-center.routes').then((m) => m.MedicalCenterRoutes),
      },


      {
        path: 'stats',
        loadChildren: () =>
          import('./pages/stats/stats.routes').then((m) => m.StasRouts),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./pages/chat/chat.routes').then((m) => m.ChatRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
      {
        path: 'map',
        loadChildren: () =>
          import('./pages/mapLeaflet/map.routes').then((m) => m.MapRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
