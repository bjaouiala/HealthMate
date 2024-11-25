import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {TablerIconsModule} from "angular-tabler-icons";
import {NotificationService} from "../services/notification-service/notification.service";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-notificationlist',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatBadgeModule,
    TablerIconsModule,
    MatCard,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './notificationlist.component.html',
  styleUrl: './notificationlist.component.scss',
  providers: [NotificationService]
})
export class NotificationlistComponent implements OnInit{
  notifications : any[]=[];

  constructor(private notificatonService : NotificationService) {}

  ngOnInit(): void {
    this.notificatonService.getNotifications().subscribe(
      {
        next:value => {
          this.notifications=value;
          console.log(value)
        }
      }
    )
  }
}
