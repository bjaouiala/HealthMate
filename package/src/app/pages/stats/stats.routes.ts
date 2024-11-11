import { Routes } from "@angular/router";
import { HealthStatsChartComponent } from "./health-stats-chart/health-stats-chart.component";

export const StasRouts : Routes = [

    {
        path: '',
        children: [
          {
            path: '',
            component: HealthStatsChartComponent,
          },




        ],
    },
  ];