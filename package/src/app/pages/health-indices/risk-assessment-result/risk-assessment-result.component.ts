import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredictionResponse } from 'src/app/models/prediction-response.model';
import { HealthIndiceService } from 'src/app/services/health-indice.service';

@Component({
  selector: 'app-risk-assessment-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-assessment-result.component.html',
  styleUrl: './risk-assessment-result.component.scss'
})
export class RiskAssessmentResultComponent implements OnInit {
  predictionResult: PredictionResponse = { risk_level: '', feedback: [] };

  constructor(
    private route: ActivatedRoute,
    private healthIndexService: HealthIndiceService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.healthIndexService.getRiskAssessmentResult(id).subscribe(
      (result) => {
        this.ngZone.run(() => {
          this.predictionResult = result;
          console.log('Fetched prediction result:', this.predictionResult);
        });
      },
      (error) => {
        console.error('Error fetching prediction result:', error);
      }
    );
  }
}
