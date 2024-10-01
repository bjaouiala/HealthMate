import { Component } from '@angular/core';
import {AuthService} from "../../services/authService/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activation-account',
  templateUrl: './activation-account.component.html',
  styleUrls: ['./activation-account.component.css']
})
export class ActivationAccountComponent {
  message =''
  isOkay = true
  isSubmitted = false


  constructor(private authService:AuthService,private router:Router) {
  }

  redirectToLogin() {
    this.router.navigate(['login'])
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
