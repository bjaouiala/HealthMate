import { Component } from '@angular/core';
import {AuthServiceService} from "../../../services/auth-service/auth-service.service";
import {Router} from "@angular/router";
import {CodeInputModule} from "angular-code-input";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-activation-account',
  standalone: true,
  imports: [
    CodeInputModule,
    CommonModule
  ],
  templateUrl: './activation-account.component.html',
  styleUrl: './activation-account.component.scss'
})
export class ActivationAccountComponent {
  message =''
  isOkay = true
  isSubmitted = false


  constructor(private authService:AuthServiceService,private router:Router) {
  }

  redirectToLogin() {
    this.router.navigate(['authentication/login'])
  }

  onCodeCompleted(token: string) {
    this.confirmationAccount(token);
  }

  private confirmationAccount(token:string){
    this.authService.activationAccount({token:token}).subscribe({
      next : (res)=>{
        this.message = 'your account has been successfully activated'
        this.isSubmitted = true
      },
      error :(res)=>{
        this.message ='Token has been expired or invalid please try again'
        this.isSubmitted = true
        this.isOkay=false
      }
    })

  }

}
