import { Routes } from "@angular/router";
import { HealthStatsChartComponent } from "./health-stats-chart/health-stats-chart.component";
import { DoctoremailComponent } from "./doctoremail/doctoremail.component";

export const StasRouts : Routes = [

    {
        path: '',
        children: [
          {
            path: '',
            component: HealthStatsChartComponent,
          },
          {
            path: 'doctoremail',
            component: DoctoremailComponent,
          },




        ],
    },
  ];