import { Component, OnInit } from '@angular/core';
import { HealthGoalService } from '../../../../services/HealthGoals-service/health-goals-service.service';
import {HealthGoal, PredefinedGoal} from '../../../../models/health-goal.model';
import { Router } from '@angular/router';
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatList, MatListItem, MatListItemTitle } from "@angular/material/list";
import { MatButton } from "@angular/material/button";
import { MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelTitle } from "@angular/material/expansion";

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
    MatCardTitle,
    MatListItemTitle,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    MatExpansionModule
  ],
  standalone: true
})
export class HealthGoalsListComponent implements OnInit {
  healthGoals: HealthGoal[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private healthGoalService: HealthGoalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHealthGoals();
  }

  loadHealthGoals(): void {
    this.loading = true;
    this.healthGoalService.getHealthGoalsByUser().subscribe({
      next: (goals) => {
        console.log('Fetched health goals:', goals);
        this.healthGoals = goals;
        console.log('health goals:', this.healthGoals);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load health goals.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  editGoal(goalId: number): void {
    this.router.navigate([`/healthGoals/user/edit/${goalId}`]);
  }

  deleteHealthGoal(goalId: number): void {
    if (confirm('Are you sure you want to delete this health goal?')) {
      this.healthGoalService.deleteHealthGoal(goalId).subscribe({
        next: () => {
          this.healthGoals = this.healthGoals.filter((goal) => goal.id !== goalId);
          alert('Health goal deleted successfully.');
        },
        error: (err) => {
          this.error = 'Failed to delete the health goal.';
          console.error(err);
        }
      });
    }
  }

  goToUserPredefinedGoals(): void {
    this.router.navigate(['/healthGoals/user/user-predefined-health-goals']);
  }
}
