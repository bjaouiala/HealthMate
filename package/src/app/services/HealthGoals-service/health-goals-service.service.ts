import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../auth-service/base.service';
import { HealthGoal, PredefinedHealthGoal } from '../../models/health-goal.model';
import { Observable } from 'rxjs';
import { TokenService } from '../auth-service/token.service'; // Import TokenService

@Injectable({
  providedIn: 'root',
})
export class HealthGoalService {
  private readonly userHealthGoalsUrl = '/goals'; // API endpoints
  private readonly predefinedGoalsUrl = '/goals/predefined';

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
    private tokenService: TokenService // Inject TokenService
  ) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.token}`, // Add token to headers
    });
  }

  // User Health Goals
  getHealthGoalsByUser(): Observable<HealthGoal[]> {
    return this.httpClient.get<HealthGoal[]>(
      `${this.baseService.rootUrl}${this.userHealthGoalsUrl}`,
      { headers: this.headers }
    );
  }

  // health-goals-service.service.ts
  createHealthGoal( goalId: number, goal: HealthGoal): Observable<HealthGoal> {
    return this.httpClient.post<HealthGoal>(
      `${this.baseService.rootUrl}${this.userHealthGoalsUrl}/${goalId}`, // Adjusted URL
      goal,
      { headers: this.headers }
    );
  }


  updateHealthGoal(goalId: number, goal: HealthGoal): Observable<HealthGoal> {
    return this.httpClient.put<HealthGoal>(
      `${this.baseService.rootUrl}${this.userHealthGoalsUrl}/${goalId}`,
      goal,
      { headers: this.headers }
    );
  }

  deleteHealthGoal(goalId: number, userId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseService.rootUrl}${this.userHealthGoalsUrl}/${goalId}/${userId}`,
      { headers: this.headers }
    );
  }

  // Predefined Health Goals
  getPredefinedHealthGoals(): Observable<PredefinedHealthGoal[]> {
    return this.httpClient.get<PredefinedHealthGoal[]>(
      `${this.baseService.rootUrl}${this.predefinedGoalsUrl}`,
      { headers: this.headers }
    );
  }

  createPredefinedHealthGoal(goal: PredefinedHealthGoal): Observable<PredefinedHealthGoal> {
    return this.httpClient.post<PredefinedHealthGoal>(
      `${this.baseService.rootUrl}${this.predefinedGoalsUrl}`,
      goal,
      { headers: this.headers }
    );
  }

  updatePredefinedHealthGoal(goalId: number, goal: PredefinedHealthGoal): Observable<PredefinedHealthGoal> {
    return this.httpClient.put<PredefinedHealthGoal>(
      `${this.baseService.rootUrl}${this.predefinedGoalsUrl}/${goalId}`,
      goal,
      { headers: this.headers }
    );
  }

  deletePredefinedHealthGoal(goalId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseService.rootUrl}${this.predefinedGoalsUrl}/${goalId}`,
      { headers: this.headers }
    );
  }
}
