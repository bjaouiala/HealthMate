import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRequest } from 'src/app/models/EventRequest.model';
import { EventResponse } from 'src/app/models/EventResponse.model';
import { TokenService } from '../auth-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8094/api/v1/events'; // Replace with your actual API URL
  

  constructor(private http: HttpClient,private tokenService: TokenService) {}

  // Get all events
  // Get all events
  getAllEvents(): Observable<EventResponse[]> {
    const token = this.tokenService.token; // Retrieve the token here
    console.log('Token in EventService:', token); // Debugging line

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include token in headers
    });

    return this.http.get<EventResponse[]>(this.apiUrl, { headers });
  }

  // Get a single event by ID
  getEventById(eventId: number): Observable<EventResponse> {
    const token = this.tokenService.token; // Retrieve the token here
    console.log('Token in EventService:', token); // Debugging line

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include token in headers
    });
    return this.http.get<EventResponse>(`${this.apiUrl}/${eventId}`);
  }

  // Create a new event
  createEvent(eventRequest: EventRequest, token: string): Observable<EventResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<EventResponse>(this.apiUrl, eventRequest, { headers });
  }

  // Update an existing event
  updateEvent(eventId: number, eventRequest: EventRequest, token: string): Observable<EventResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<EventResponse>(`${this.apiUrl}/${eventId}`, eventRequest, { headers });
  }

  // Delete an event by ID
  deleteEvent(eventId: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`, { headers });
  }
}
