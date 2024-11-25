import {Routes} from "@angular/router";
import {NotificationlistComponent} from "./notificationlist.component";

export const NotificationlistRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NotificationlistComponent,
      },
    ],
  },
];
