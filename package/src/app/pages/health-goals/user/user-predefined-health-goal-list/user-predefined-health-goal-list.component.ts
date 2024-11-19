import { Component, OnInit } from '@angular/core';
import { HealthGoalService } from '../../../../services/HealthGoals-service/health-goals-service.service';
import { PredefinedHealthGoal } from '../../../../models/health-goal.model';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-user-predefined-health-goal-list',
  templateUrl: './user-predefined-health-goal-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatListItemTitle,
    MatListItemLine,
    MatButton,
    MatTooltip,
    MatCardTitle
  ],
  styleUrls: ['./user-predefined-health-goal-list.component.scss']
})
export class UserPredefinedHealthGoalListComponent implements OnInit {
  predefinedHealthGoals: PredefinedHealthGoal[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private healthGoalService: HealthGoalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPredefinedHealthGoals();
  }

  loadPredefinedHealthGoals(): void {
    this.isLoading = true;
    this.healthGoalService.getPredefinedHealthGoals().subscribe({
      next: (goals) => {
        this.predefinedHealthGoals = goals;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading predefined health goals:', err);
        this.errorMessage = 'Failed to load health goals.';
        this.isLoading = false;
      },
    });
  }

  pickHealthGoal(goalId: number): void {
    this.router.navigate(['/healthGoals/user/health-goals/create'], { queryParams: { predefinedGoalId: goalId } });
  }

  // Method to handle redirection to the health-goals-list page
  goToHealthGoalsList(): void {
    this.router.navigate(['/healthGoals/user/health-goals-list']);
  }
}
