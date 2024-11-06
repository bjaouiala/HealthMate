import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-health-stats-chart',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatCardModule],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './health-stats-chart.component.html',
  styleUrls: ['./health-stats-chart.component.scss']
})
export class HealthStatsChartComponent implements OnInit {
  
  private combinedChart: Chart | undefined;
  private individualCharts: Chart[] = []; // Array to hold individual chart instances

  constructor(private statsService: StatsService) {
    // Register all chart types
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const userId = 1; // Replace with dynamic user ID as needed
    this.statsService.getHealthStats(userId).subscribe(data => {
      this.createCombinedChart(data);
      this.createIndividualCharts(data);
    });
  }

  private createCombinedChart(data: any): void {
    const ctx = document.getElementById('myCombinedChart') as HTMLCanvasElement;

    if (this.combinedChart) {
      this.combinedChart.destroy(); // Destroy previous instance if it exists
    }

    this.combinedChart = new Chart(ctx, {
      type: 'bar', // Use bar chart for better visibility of means
      data: {
        labels: ['Age', 'Systolic BP', 'Diastolic BP', 'Blood Sugar', 'Body Temp', 'Heart Rate'],
        datasets: [{
          label: 'Average Health Indices',
          data: [
            data.ageStats.mean,
            data.systolicBPStats.mean,
            data.diastolicBPStats.mean,
            data.bloodSugarStats.mean,
            data.bodyTemperatureStats.mean,
            data.heartRateStats.mean
          ],
          backgroundColor: '#3e95cd',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Average Health Indices'
          }
        }
      }
    });
  }

  private createIndividualCharts(data: any): void {
    // Destroy existing charts if they exist
    this.individualCharts.forEach(chart => chart.destroy());
    this.individualCharts = [];

    // Create a chart for each attribute showing mean, median, and standard deviation
    this.createIndividualChart('myChartAge', data.ageStats, 'Age', 'Average Age');
    this.createIndividualChart('myChartSystolicBP', data.systolicBPStats, 'Systolic BP', 'Average Systolic Blood Pressure');
    this.createIndividualChart('myChartDiastolicBP', data.diastolicBPStats, 'Diastolic BP', 'Average Diastolic Blood Pressure');
    this.createIndividualChart('myChartBloodSugar', data.bloodSugarStats, 'Blood Sugar', 'Average Blood Sugar');
    this.createIndividualChart('myChartBodyTemp', data.bodyTemperatureStats, 'Body Temperature', 'Average Body Temperature');
    this.createIndividualChart('myChartHeartRate', data.heartRateStats, 'Heart Rate', 'Average Heart Rate');
  }

  private createIndividualChart(canvasId: string, statsData: any, label: string, title: string): void {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

    if (!ctx) {
      console.error(`Canvas element with id ${canvasId} not found.`);
      return;
    }

    const chart = new Chart(ctx, {
      type: 'bar', // Use bar chart for better visibility of statistics
      data: {
        labels: ['Mean', 'Median', 'Standard Deviation'],
        datasets: [{
          label: title,
          data: [statsData.mean, statsData.median, statsData.standardDeviation],
          backgroundColor: ['#3e95cd', '#8e5ea2', '#f39c12'], // Different colors for each statistic
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title
          }
        }
      }
    });

    this.individualCharts.push(chart); // Store the chart instance
  }
}