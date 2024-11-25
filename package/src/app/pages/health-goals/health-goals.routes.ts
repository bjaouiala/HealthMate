import { Routes } from '@angular/router';

import {PredefinedHealthGoalFormComponent} from "./admin/predefined-health-goal-form/predefined-health-goal-form.component";
import {PredefinedHealthGoalListComponent} from "./admin/predefined-health-goal-list/predefined-health-goal-list.component";
import {AddHealthGoalComponent} from "./user/add-health-goal/add-health-goal.component";
import {UserPredefinedHealthGoalListComponent} from "./user/user-predefined-health-goal-list/user-predefined-health-goal-list.component";
import {HealthGoalsListComponent} from "./user/health-goals-list-component/health-goals-list-component.component";
import {HealthGoalEditComponent} from "./user/health-goal-edit-component/health-goal-edit-component.component";



export const HealthGoalsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'admin/predefined-health-goals', component: PredefinedHealthGoalListComponent },
      { path: 'admin/predefined-health-goals/create', component: PredefinedHealthGoalFormComponent },
      { path: 'admin/predefined-health-goals/edit/:id', component: PredefinedHealthGoalFormComponent },
      { path: 'user/user-predefined-health-goals', component: UserPredefinedHealthGoalListComponent },
      { path: 'user/health-goals/create', component: AddHealthGoalComponent },
      { path: 'user/health-goals-list', component: HealthGoalsListComponent },
      { path: 'user/edit/:goalId', component: HealthGoalEditComponent },
      { path: '', redirectTo: '/user/health-goals', pathMatch: 'full' }
    ],
  },
];
