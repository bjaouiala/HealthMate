import { Component, OnInit } from '@angular/core';
import { HealthGoalService } from '../../../../services/HealthGoals-service/health-goals-service.service';
import { TokenService } from '../../../../services/auth-service/token.service';
import { HealthGoal } from '../../../../models/health-goal.model';
import { Router } from '@angular/router';
import { PredefinedHealthGoal } from '../../../../models/health-goal.model';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-health-goals-list',
  templateUrl: './health-goals-list-component.component.html',
  styleUrls: ['./health-goals-list-component.component.scss'],
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    MatButton,
    MatCardTitle
  ],
  standalone: true
})
export class HealthGoalsListComponent implements OnInit {
  healthGoals: HealthGoal[] = [];
  predefinedHealthGoals: PredefinedHealthGoal[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private healthGoalService: HealthGoalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch health goals for the currently authenticated user
    this.fetchHealthGoals();
    // Fetch predefined goals to associate with health goals
    this.fetchPredefinedGoals();
  }

  fetchHealthGoals(): void {
    this.healthGoalService.getHealthGoalsByUser().subscribe({
      next: (goals) => {
        this.healthGoals = goals;
        this.loading = false; // Set loading to false after data is fetched
      },
      error: (err) => {
        console.error('Error fetching health goals:', err);
        this.error = 'Failed to load health goals';
        this.loading = false;
      },
    });
  }

  fetchPredefinedGoals(): void {
    this.healthGoalService.getPredefinedHealthGoals().subscribe({
      next: (goals) => {
        this.predefinedHealthGoals = goals;
      },
      error: (err) => {
        console.error('Error fetching predefined health goals:', err);
      },
    });
  }

  // Method to get the predefined goal based on its ID
  getPredefinedGoal(predefinedGoalId: number): PredefinedHealthGoal | undefined {
    return this.predefinedHealthGoals.find(goal => goal.id === predefinedGoalId);
  }

  // Method to handle redirection to the user-predefined-health-goals page
  goToUserPredefinedGoals(): void {
    this.router.navigate(['/healthGoals/user/user-predefined-health-goals']);
  }

  editGoal(goalId: number): void {
    // Navigate to the edit page with the goal ID
    this.router.navigate([`/healthGoals/user/edit/${goalId}`]);
  }
}
