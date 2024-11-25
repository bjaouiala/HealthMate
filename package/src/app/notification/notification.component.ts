import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {NotificationService} from "../services/notification-service/notification.service";
import {TablerIconsModule} from "angular-tabler-icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatBadgeModule,
    TablerIconsModule,
    RouterLink
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  providers: [NotificationService]
})
export class NotificationComponent implements OnInit{
  notifications : any[]=[];
  showNotifications: boolean = false;

  constructor(private notificatonService : NotificationService) {

  }
  ngOnInit(): void {
    this.notificatonService.getNotifications().subscribe(
      {
        next:value => {
          this.notifications=value;
        }
      }
    )
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
