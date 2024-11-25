import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { EventRequest } from 'src/app/models/EventRequest.model';
import { TokenService } from 'src/app/services/auth-service/token.service';
import { EventService } from 'src/app/services/events/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule,FormsModule,
 
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  event: EventRequest = {
    title: '',
    description: '',
    eventDate: '', // Will be set from input
    createdDate: new Date().toISOString(), // Automatically set to current date and time
    location: '',
    organizer: '',
    status: 'SCHEDULED' // Default status
  };
  errorMessage: string | null = null;

  constructor(private eventService: EventService, private tokenService: TokenService, private router: Router) {}

  createEvent(): void {
    const token = this.tokenService.token; // Retrieve the token here

    if (!token) {
      this.errorMessage = 'No authentication token found. Please log in.';
      return; // Exit if no token is available
    }

    // Ensure that eventDate is in the correct format (YYYY-MM-DDTHH:mm:ss)
    this.event.eventDate = this.event.eventDate; // Keep it as is since it's already formatted correctly

    // Set createdDate to the current date and time in ISO format
    this.event.createdDate = new Date().toISOString(); // This includes both date and time

    this.eventService.createEvent(this.event, token).subscribe(
      (response) => {
        console.log('Event created successfully:', response);
        this.router.navigate(['/events/list']); // Navigate back to the event list after creation
      },
      (error) => {
        this.errorMessage = 'Failed to create event. Please try again later.'; // Handle errors
        console.error('Error creating event:', error);
      }
    );
  }
}

