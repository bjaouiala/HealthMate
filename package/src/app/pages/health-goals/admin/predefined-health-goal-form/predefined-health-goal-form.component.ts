import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { HealthGoalService } from '../../../../services/HealthGoals-service/health-goals-service.service';
import { PredefinedHealthGoal } from '../../../../models/health-goal.model';
import { ActivatedRoute, Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-predefined-health-goal-form',
  templateUrl: './predefined-health-goal-form.component.html',
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
    MatCardTitle
  ],
  styleUrls: ['./predefined-health-goal-form.component.scss']
})
export class PredefinedHealthGoalFormComponent implements OnInit {
  predefinedHealthGoalForm: FormGroup;
  predefinedHealthGoal: PredefinedHealthGoal | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private healthGoalService: HealthGoalService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.predefinedHealthGoalForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    const goalId = this.route.snapshot.paramMap.get('id');
    if (goalId) {
      this.isEditing = true;
      this.loadGoal(parseInt(goalId, 10));
    }
  }

  loadGoal(goalId: number): void {
    this.healthGoalService.getPredefinedHealthGoals().subscribe({
      next: (goals) => {
        const goal = goals.find((g) => g.id === goalId);
        if (goal) {
          this.predefinedHealthGoal = goal;
          this.predefinedHealthGoalForm.patchValue(goal);
        }
      },
      error: (err) => console.error('Error loading predefined health goal:', err),
    });
  }

  submitForm(): void {
    if (this.predefinedHealthGoalForm.invalid) {
      return;
    }

    if (this.isEditing && this.predefinedHealthGoal) {
      this.updatePredefinedHealthGoal();
    } else {
      this.createPredefinedHealthGoal();
    }
  }

  createPredefinedHealthGoal(): void {
    this.healthGoalService.createPredefinedHealthGoal(this.predefinedHealthGoalForm.value).subscribe({
      next: () => {
        this.router.navigate(['/healthGoals/admin/predefined-health-goals']);
      },
      error: (err) => console.error('Error creating health goal:', err),
    });
  }

  updatePredefinedHealthGoal(): void {
    if (this.predefinedHealthGoal) {
      this.healthGoalService.updatePredefinedHealthGoal(this.predefinedHealthGoal.id, this.predefinedHealthGoalForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/predefined-health-goals']);
        },
        error: (err) => console.error('Error updating health goal:', err),
      });
    }
  }
}
