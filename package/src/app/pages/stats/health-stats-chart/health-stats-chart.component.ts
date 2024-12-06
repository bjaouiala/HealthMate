import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-health-stats-chart',
  standalone: true,
    imports: [FormsModule, CommonModule, MatIconModule, MatTableModule, MatCardModule, RouterLink],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './health-stats-chart.component.html',
  styleUrls: ['./health-stats-chart.component.scss']
})
export class HealthStatsChartComponent implements OnInit {

  private combinedChart: Chart | undefined;
  private individualCharts: Chart[] = []; // Array to hold individual chart instances

  // Selection flags for indicators
  includeAge = false;
  includeSystolicBP = false;
  includeDiastolicBP = false;
  includeBloodSugar = false;
  includeBodyTemp = false;
  includeHeartRate = false;

  constructor(private statsService: StatsService) {
    // Register all chart types
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Replace with dynamic user ID as needed
    this.statsService.getHealthStats().subscribe(data => {
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

  generateReport(): void {
    const pdf = new jsPDF();

    // Capture selected charts and add them to the PDF
    const promises = [];

    // Capture combined chart if included
    promises.push(this.captureChart('myCombinedChart'));

    if (this.includeAge) {
      promises.push(this.captureChart('myChartAge'));
    }
    if (this.includeSystolicBP) {
      promises.push(this.captureChart('myChartSystolicBP'));
    }
    if (this.includeDiastolicBP) {
      promises.push(this.captureChart('myChartDiastolicBP'));
    }
    if (this.includeBloodSugar) {
      promises.push(this.captureChart('myChartBloodSugar'));
    }
    if (this.includeBodyTemp) {
      promises.push(this.captureChart('myChartBodyTemp'));
    }
    if (this.includeHeartRate) {
      promises.push(this.captureChart('myChartHeartRate'));
    }

    Promise.all(promises).then(images => {
      images.forEach((imgData, index) => {
        if (index > 0) { // Add page break after the first image
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 160); // Adjust dimensions as needed
      });

      pdf.save('health_report.pdf'); // Save the PDF with a filename
    });
  }

  private captureChart(chartId: string): Promise<any> {
    const chartElement = document.getElementById(chartId) as HTMLCanvasElement | null; // Assert as HTMLCanvasElement or null

    if (!chartElement) {
      console.error(`Canvas element with id ${chartId} not found.`);
      return Promise.reject(`Canvas element with id ${chartId} not found.`);
    }

    return html2canvas(chartElement).then(canvas => {
      return canvas.toDataURL('image/png');
    });
  }
}
