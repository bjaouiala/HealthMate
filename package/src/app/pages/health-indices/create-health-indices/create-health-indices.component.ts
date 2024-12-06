import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthIndice } from 'src/app/models/health-indice.model';
import { HealthIndiceService } from 'src/app/services/health-indice.service';
import {User} from 'src/app/models/user.model';
import { MatCardModule } from '@angular/material/card';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-create-health-indices',
  standalone: true,
  imports: [CommonModule,FormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './create-health-indices.component.html',
  styleUrl: './create-health-indices.component.scss'
})
export class CreateHealthIndicesComponent implements OnInit {

  // Form model for health index
  healthIndice: HealthIndice = {
    id: 0,
    age: 0,
    systolicBP: 0,
    diastolicBP: 0,
    bs: 0,
    bodyTemp: 0,
    heartRate: 0,
  };

  userId: number = 1; // Example userId, can be replaced with dynamic userId logic

  constructor(
    private healthIndiceService: HealthIndiceService,
    private router: Router,
    private toastServoce:ToastrService
  ) {}

  ngOnInit(): void {}

  createHealthIndice(): void {
    console.log('Sending health index data:', this.healthIndice);

    // Call service to create a new health index
    this.healthIndiceService.createHealthIndice(this.healthIndice).subscribe(
      {
        next : res =>{
          this.toastServoce.success("toast added successfully")
          this.router.navigate(['healthindices/list'])
        }
      }
    );
  }
}
