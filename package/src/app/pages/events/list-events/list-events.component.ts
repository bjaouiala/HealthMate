import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventResponse } from 'src/app/models/EventResponse.model';
import { TokenService } from 'src/app/services/auth-service/token.service';
import { EventService } from 'src/app/services/events/event.service';

@Component({
  selector: 'app-list-events',
  standalone: true,
  imports: [CommonModule,
 
    MatIconModule,MatTableModule,MatCardModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.scss'
})
export class ListEventsComponent implements OnInit {
  events: EventResponse[] = []; // Array to hold the list of events
  errorMessage: string | null = null; // Variable to hold error messages

  constructor(private eventService: EventService, private tokenService: TokenService , private router: Router) {}

  ngOnInit(): void {
    this.loadEvents(); // Load events when the component initializes
  }

  loadEvents(): void {
    const token = this.tokenService.token; // Retrieve the token here
    console.log('Retrieved Token:', token); // Debugging line
  
    if (!token) {
      this.errorMessage = 'No authentication token found. Please log in.';
      return; // Exit if no token is available
    }
  
    this.eventService.getAllEvents().subscribe(
      (data: EventResponse[]) => {
        this.events = data; // Assign the fetched data to the events array
      },
      (error) => {
        this.errorMessage = 'Failed to load events. Please try again later.'; // Handle errors
        console.error('Error fetching events:', error);
      }
    );
  }
  editEvent(id: number): void {
    // Navigate to the edit event page with the event ID
    this.router.navigate(['/events/update', id]); // Assuming you have a route set up for editing events
  }

  deleteEvent(id: number): void {
    const token = this.tokenService.token; // Retrieve the token here

    if (!token) {
      this.errorMessage = 'No authentication token found. Please log in.';
      return; // Exit if no token is available
    }

    this.eventService.deleteEvent(id, token).subscribe(
      () => {
        // Reload events after successful deletion
        this.loadEvents();
      },
      (error) => {
        this.errorMessage = 'Failed to delete the event. Please try again later.'; // Handle errors
        console.error('Error deleting event:', error);
      }
    );
  }

  viewEventDetails(id: number): void {
    // Navigate to the event details page with the event ID
    this.router.navigate(['/event-details', id]); // Assuming you have a route set up for viewing event details
  }
}