import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthIndice } from 'src/app/models/health-indice.model';
import { HealthIndiceService } from 'src/app/services/health-indice.service';

@Component({
  selector: 'app-update-health-indices',
  standalone: true,
  imports: [CommonModule,FormsModule,
 
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './update-health-indices.component.html',
  styleUrl: './update-health-indices.component.scss'
})
export class UpdateHealthIndicesComponent implements OnInit {
  id: number; // ID of the health index to update
  healthIndice: HealthIndice; // The health index to be updated

  constructor(
    private route: ActivatedRoute,
    private healthIndiceService: HealthIndiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); // Retrieve the ID from the route

    if (this.id) {
      // Fetch the existing health index data if the ID is valid
      this.healthIndiceService.getHealthIndiceById(this.id).subscribe(
        (data) => {
          this.healthIndice = data; // Assign the fetched data to the component's healthIndice
        },
        (error) => {
          console.error('Error fetching health index data', error);
        }
      );
    } else {
      console.error('Invalid ID retrieved from the route:', this.id);
    }
  }

  // Method to update the health index
  updateHealthIndice(): void {
    this.healthIndiceService.updateHealthIndice(this.id, this.healthIndice).subscribe(
      (response) => {
        console.log('Health index updated successfully', response);
        this.router.navigate(['/healthindices/list']); // Adjust the route as necessary

      },
      (error) => {
        console.error('Error updating health index', error);
      }
    );
  }
}
