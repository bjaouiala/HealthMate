import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthGoalService } from '../../../../services/HealthGoals-service/health-goals-service.service';
import { HealthGoal } from '../../../../models/health-goal.model';
import { PredefinedHealthGoal } from '../../../../models/health-goal.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Location, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-health-goal-edit',
  templateUrl: './health-goal-edit-component.component.html',
  styleUrls: ['./health-goal-edit-component.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    NgIf
  ],
  standalone: true
})
export class HealthGoalEditComponent implements OnInit {
  healthGoalForm: FormGroup;
  healthGoal: HealthGoal | undefined;
  predefinedGoal: PredefinedHealthGoal | undefined;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private healthGoalService: HealthGoalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchHealthGoal();
    this.fetchPredefinedGoal();
  }

  // Initialize form with default values
  initForm(): void {
    this.healthGoalForm = this.fb.group({
      actualValue: ['', Validators.required],
      targetValue: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      userDescription: ['', Validators.maxLength(500)],
    });
  }

  // Fetch the health goal to be edited using the goal ID from the route
  fetchHealthGoal(): void {
    const goalId = Number(this.activatedRoute.snapshot.paramMap.get('goalId'));
    this.healthGoalService.getHealthGoalsByUser().subscribe({
      next: (goals) => {
        this.healthGoal = goals.find(goal => goal.id === goalId);
        if (this.healthGoal) {
          this.healthGoalForm.patchValue({
            actualValue: this.healthGoal.actualValue,
            targetValue: this.healthGoal.targetValue,
            startDate: this.healthGoal.startDate,
            endDate: this.healthGoal.endDate,
            userDescription: this.healthGoal.userDescription,
          });
          this.loading = false;
        } else {
          this.error = 'Health Goal not found';
        }
      },
      error: (err) => {
        this.error = 'Error fetching health goal';
        this.loading = false;
      },
    });
  }

  // Fetch predefined goal details if they exist
  fetchPredefinedGoal(): void {
    const goalId = Number(this.activatedRoute.snapshot.paramMap.get('goalId'));
    this.healthGoalService.getPredefinedHealthGoals().subscribe({
      next: (goals) => {
        this.predefinedGoal = goals.find(goal => goal.id === goalId);
      },
      error: (err) => {
        console.error('Error fetching predefined goal:', err);
      },
    });
  }

  // Submit the form to update the health goal
  submitForm(): void {
    if (this.healthGoalForm.invalid) {
      return;
    }

    const updatedGoal: HealthGoal = {
      ...this.healthGoal,
      ...this.healthGoalForm.value,
    };

    const goalId = this.healthGoal?.id || 0;
    this.healthGoalService.updateHealthGoal(goalId,  updatedGoal).subscribe({
      next: (updated) => {
        this.router.navigate(['/healthGoals/user/health-goals-list']);
      },
      error: (err) => {
        console.error('Error updating health goal:', err);
        this.error = 'Failed to update health goal';
      },
    });
  }

  // Cancel editing and go back
  cancelEdit(): void {
    this.location.back();
  }
}
