import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Message } from 'src/app/models/message.model';
import { HealthIndiceService } from 'src/app/services/health-indice.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,
 
    MatIconModule,MatTableModule,MatCardModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessageContent: string = '';
  selectedHealthIssue: string = '';
  username: string = 'User'; // You can make this dynamic based on user input
  problems: any[] = [];

  constructor(private chatService: HealthIndiceService) {}

  ngOnInit() {
    this.chatService.getAllProblems().subscribe(data => {
      this.problems = data;
      if (this.problems.length > 0) {
        this.selectedHealthIssue = this.problems[0].problem; // Default selection
      }
    });
  }

  sendMessage() {
    if (this.newMessageContent.trim()) {
      const message: Message = {
        sender: this.username,
        content: this.newMessageContent,
        timestamp: new Date().toLocaleTimeString()
      };
      this.messages.push(message); // Add user message to local array
      
      // Get advice based on selected health issue
      this.chatService.getAdvice(this.selectedHealthIssue).subscribe(advice => {
        const responseMessage: Message = {
          sender: 'System',
          content: this.formatAdvice(advice), // Format the advice for display
          timestamp: new Date().toLocaleTimeString()
        };
        this.messages.push(responseMessage); // Add system response message
      });

      this.newMessageContent = ''; // Clear input after sending
    }
  }

  // Function to format advice into an array of lines
  formatAdvice(advice: string): string {
    return advice.split('\n').join('<br/>'); // Split by newline and join with HTML line break
  }
}