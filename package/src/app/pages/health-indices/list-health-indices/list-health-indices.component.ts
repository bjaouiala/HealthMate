import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { HealthIndice } from 'src/app/models/health-indice.model';
import { HealthIndiceService } from 'src/app/services/health-indice.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-health-indices',
  standalone: true,
  imports: [CommonModule,

    MatIconModule, MatTableModule, MatCardModule, RouterLink],
  templateUrl: './list-health-indices.component.html',
  styleUrl: './list-health-indices.component.scss'
})
export class ListHealthIndicesComponent implements OnInit {
  healthIndices: HealthIndice[] = [];
  userId: number = 1; // Example user ID; replace with dynamic value

  constructor(
    private healthIndiceService: HealthIndiceService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadHealthIndices();
  }

  loadHealthIndices(): void {
    this.healthIndiceService.getHealthIndicesByUser().subscribe(
      {
        next : data => {
      this.healthIndices = data;
    }
      }

    );
  }

  deleteHealthIndice(id: number): void {
    this.healthIndiceService.deleteHealthIndice(id).subscribe(
      () => {
        this.healthIndices = this.healthIndices.filter((hi) => hi.id !== id);
        console.log(`Deleted health index with ID: ${id}`);
      },
      (error) => console.error('Error deleting health index', error)
    );
  }

  updateHealthIndice(id: number): void {
    console.log('Attempting to navigate to update with ID:', id); // Debug log
    if (id) {
      this.router.navigate([`/healthindices/update/${id}`]); // Navigate to update page
    } else {
      console.error('Cannot navigate to update page: ID is undefined');
    }
  }

  // Method to navigate to the risk result page
showRiskResult(healthIndexId: number): void {
  // Navigate to the risk result page with health index ID
  this.router.navigate([`/healthindices/risk-result/${healthIndexId}`]); // Use backticks for template literals
}
}
