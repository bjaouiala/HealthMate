import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventRequest } from 'src/app/models/EventRequest.model';
import { EventResponse } from 'src/app/models/EventResponse.model';
import { TokenService } from 'src/app/services/auth-service/token.service';
import { EventService } from 'src/app/services/events/event.service';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss'
})
export class UpdateEventComponent {
}