import { Routes } from '@angular/router';

import {PostListComponent} from "./post-list.component";
import {MyPostsComponent} from "../my-posts/my-posts.component";
import {ManagePostsComponent} from "../manage-posts/manage-posts.component";


export const postRoute: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostListComponent,
      },
      {
        path: 'my-posts',
        component: MyPostsComponent,
      },{
      path: 'manage-post',
        component:ManagePostsComponent
      }

    ],
  },
];
