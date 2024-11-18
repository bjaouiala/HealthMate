import { Component, OnInit } from '@angular/core';
import { HealthGoalService } from '../../../../services/HealthGoals-service/health-goals-service.service';
import { PredefinedHealthGoal } from '../../../../models/health-goal.model';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-predefined-health-goal-list',
  templateUrl: './predefined-health-goal-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatListItem,
    MatButton,
    MatTooltip,
    MatListItemTitle,
    MatListItemLine
  ],
  styleUrls: ['./predefined-health-goal-list.component.scss']
})
export class PredefinedHealthGoalListComponent implements OnInit {
  predefinedHealthGoals: PredefinedHealthGoal[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private healthGoalService: HealthGoalService) {}

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

  deletePredefinedHealthGoal(goalId: number): void {
    if (confirm('Are you sure you want to delete this goal?')) {
      this.healthGoalService.deletePredefinedHealthGoal(goalId).subscribe({
        next: () => {
          this.predefinedHealthGoals = this.predefinedHealthGoals.filter(goal => goal.id !== goalId);
        },
        error: (err) => console.error('Error deleting predefined health goal:', err),
      });
    }
  }
}
