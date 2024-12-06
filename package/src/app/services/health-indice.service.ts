
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthIndice } from '../models/health-indice.model';
import { PredictionResponse } from '../models/prediction-response.model';

@Injectable({
  providedIn: 'root',
})
export class HealthIndiceService {
  private apiUrl = 'http://localhost:8080/api/v1/health-indices';
  private predictUrl = 'http://localhost:8080/api/v1/predict'; // Adjust the URL for prediction
  // Adjust as per your backend endpoint

  constructor(private http: HttpClient) {}

  // Create a new health indice
  createHealthIndice(healthIndice: HealthIndice): Observable<HealthIndice> {
    // POST request to create a health index with userId as a query parameter
    return this.http.post<HealthIndice>(`${this.apiUrl}`, healthIndice);
  }

  // Get all health indices for a specific user
  getHealthIndicesByUser(): Observable<HealthIndice[]> {
    return this.http.get<HealthIndice[]>(`${this.apiUrl}/user`);
  }

  // Get a single health indice by ID
  getHealthIndiceById(id: number): Observable<HealthIndice> {
    return this.http.get<HealthIndice>(`${this.apiUrl}/${id}`);
  }

  // Update a health indice
  updateHealthIndice(id: number, healthIndice: HealthIndice): Observable<HealthIndice> {
    return this.http.put<HealthIndice>(`${this.apiUrl}/${id}`, healthIndice);
  }

  // Delete a health indice
  deleteHealthIndice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   // Method to get risk assessment result by health index ID
   getRiskAssessmentResult(id: number): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(`${this.predictUrl}/${id}`, {}); // Sending an empty body if not required
  }

  getAllProblems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat `);
  }

  getAdvice(problem: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/chat/advice/${problem}`, { responseType: 'text' });  }
}
