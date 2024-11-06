import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = 'http://localhost:8094/api/v1/health-indices/averages';

  constructor(private http: HttpClient) { }

  getAverageStats(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.apiUrl);
  }

    private baseUrl = 'http://localhost:8094/api/v1/health-indices/single-stats';

    getHealthStats(userId: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${userId}`);
    }

}
