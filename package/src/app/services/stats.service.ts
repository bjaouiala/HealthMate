import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = 'http://localhost:8094/api/v1/health-indices/averages';

  private emailUrl = 'http://localhost:8094/api/v1/health-indices';

  constructor(private http: HttpClient) { }

  getAverageStats(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.apiUrl);
  }

    private baseUrl = 'http://localhost:8094/api/v1/health-indices/single-stats';

    getHealthStats(userId: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${userId}`);
    }

    sendEmail(to: string, subject: string, messageBody: string, attachment?: File): Observable<any> {
      const formData = new FormData();
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('messageBody', messageBody);
      
      // Only append the attachment if it exists
    if (attachment) {
      formData.append('file', attachment); // Ensure this matches what your backend expects
    }
  
      return this.http.post(this.emailUrl, formData);
    }

}
