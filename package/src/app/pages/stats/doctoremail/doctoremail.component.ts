import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Route, Router, RouterLink} from '@angular/router';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-doctoremail',
  standalone: true,
    imports: [CommonModule, FormsModule,

        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule, RouterLink],
  templateUrl: './doctoremail.component.html',
  styleUrl: './doctoremail.component.scss'
})
export class DoctoremailComponent {
  emailData = {
    to: '',
    subject: '',
    messageBody: '',
    attachment: null as File | null // Correctly defined as File or null
  };

  constructor(private emailService: StatsService , private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.emailData.attachment = file || null; // Assign the selected file or null if no file is selected
  }

  sendEmail() {
    if (this.emailData.to && this.emailData.subject && this.emailData.messageBody && this.emailData.attachment) {
      // Now we can safely pass emailData.attachment since it's guaranteed to be a File
      this.emailService.sendEmail(this.emailData.to, this.emailData.subject, this.emailData.messageBody, this.emailData.attachment).subscribe(
        response => {
          console.log('Email sent successfully!', response);
          this.router.navigate(['/stats']);        },
        error => {
          console.error('Error sending email', error);
          this.router.navigate(['/stats']);

        }
      );
    } else {
      alert('Please fill in all fields correctly and attach a file.');
    }
  }
}
