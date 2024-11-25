import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../auth-service/token.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8080/api/v1/notificationMed';

  constructor(private http: HttpClient,private tokenservice : TokenService) {
  }

  getNotifications(): Observable<any> {
    const token = this.tokenservice.token;

    if (!token) {
      throw new Error('No authentication token available');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
