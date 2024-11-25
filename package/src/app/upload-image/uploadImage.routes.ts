import {Routes} from "@angular/router";
import {UploadImageComponent} from "./upload-image.component";

export const UploadImageRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UploadImageComponent,
      },
    ],
  },
];
