import { Routes } from "@angular/router";
import { ListEventsComponent } from "./list-events/list-events.component";
import { CreateEventComponent } from "./create-event/create-event.component";
import { UpdateEventComponent } from "./update-event/update-event.component";

export const EvenstRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'create',
          component: CreateEventComponent,
        },

        {
            path: 'list',
            component: ListEventsComponent,
          },

          
        {
          path: 'update/:id',
          component: UpdateEventComponent,
        },

        // { path: 'risk-result/:id', component: RiskAssessmentResultComponent },

       
      ],
    },
  ];