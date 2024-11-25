import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HealthGoalService } from '../../../../services/HealthGoals-service/health-goals-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PredefinedGoal } from '../../../../models/health-goal.model';
import { HealthGoal } from '../../../../models/health-goal.model';
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";

@Component({
  selector: 'app-add-health-goal',
  templateUrl: './add-health-goal.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatButton,
    MatInput,
    MatCardTitle,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatDatepicker
  ],
  styleUrls: ['./add-health-goal.component.scss']
})
export class AddHealthGoalComponent implements OnInit {
  healthGoalForm: FormGroup;
  predefinedGoalId: number | null = null;
  predefinedGoal: PredefinedGoal | null = null;

  constructor(
    private fb: FormBuilder,
    private healthGoalService: HealthGoalService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    // Get the predefined goal ID from the query parameters
    this.predefinedGoalId = +this.route.snapshot.queryParamMap.get('predefinedGoalId')!;

    if (!this.predefinedGoalId) {
      this.router.navigate(['/healthGoals/user/predefined-health-goals']); // Redirect if no goal is selected
      return;
    }

    this.loadPredefinedGoal(this.predefinedGoalId);

    this.healthGoalForm = this.fb.group({
      actualValue: [null, [Validators.required]],
      targetValue: [null, [Validators.required]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      userDescription: ['', Validators.required],
    });
  }

  loadPredefinedGoal(goalId: number): void {
    // Load the predefined goal by its ID to display information to the user
    this.healthGoalService.getPredefinedHealthGoals().subscribe({
      next: (goals) => {
        this.predefinedGoal = goals.find(goal => goal.id === goalId) || null;
      },
      error: (err) => console.error('Error loading predefined health goal:', err)
    });
  }

  submitForm(): void {
    if (this.healthGoalForm.invalid) {
      return;
    }

    const newGoal: HealthGoal = {
      ...this.healthGoalForm.value,
      title: this.predefinedGoal?.title || 'Untitled Goal',
      description: this.predefinedGoal?.description || 'No description provided',
      id: 0,  // ID will be assigned by the backend
    };

    const userId = 1; // Example, replace this with the actual userId

    if (this.predefinedGoalId) {
      this.healthGoalService.createHealthGoal(this.predefinedGoalId, newGoal).subscribe({
        next: () => {
          this.router.navigate(['/healthGoals/user/health-goals-list']); // Redirect after successful creation
        },
        error: (err) => console.error('Error creating health goal:', err),
      });
    }
  }
}
