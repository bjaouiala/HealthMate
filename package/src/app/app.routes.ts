import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

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
      },{
      path: "posts",
        loadChildren: ()=> import("./pages/post-list/post-route").then((m)=>m.postRoute)

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
        path: 'stats',
        loadChildren: () =>
          import('./pages/stats/stats.routes').then((m) => m.StasRouts),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./pages/chat/chat.routes').then((m) => m.ChatRoutes),
      },{
      path:"users",
        loadChildren: () =>
        import('./pages/user-profile/UserRouter').then((m)=> m.UserRouter)

      }
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
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
