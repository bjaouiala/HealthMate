import { Routes } from '@angular/router';
import { CreateHealthIndicesComponent } from './create-health-indices/create-health-indices.component';
import { ListHealthIndicesComponent } from './list-health-indices/list-health-indices.component';
import { UpdateHealthIndicesComponent } from './update-health-indices/update-health-indices.component';
import { RiskAssessmentResultComponent } from './risk-assessment-result/risk-assessment-result.component';
import { HealthStatsChartComponent } from '../stats/health-stats-chart/health-stats-chart.component';

export const HealthIndiceRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'create',
          component: CreateHealthIndicesComponent,
        },

        {
            path: 'list',
            component: ListHealthIndicesComponent,
          },

          
        {
          path: 'update/:id',
          component: UpdateHealthIndicesComponent,
        },

        { path: 'risk-result/:id', component: RiskAssessmentResultComponent },

       
      ],
    },
  ];