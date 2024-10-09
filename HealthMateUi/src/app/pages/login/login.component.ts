import { Component } from '@angular/core';
import {AuthRequest} from "../../services/model/authenticationModel/authRequest";
import {AuthService} from "../../services/authService/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/authService/token.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest: AuthRequest = {email: "", password: ""};
  formGroup!:FormGroup

  constructor(private authService:AuthService,private router:Router,private tokenService:TokenService,private toastService:ToastrService) {
    this.formGroup = new FormGroup({
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    })
  }

  login() {
    if (this.formGroup.valid){
      this.authRequest = this.formGroup.value

    }
    this.authService.authenticate(this.authRequest).subscribe({
      next: tokenResponse => {
        this.tokenService.token = tokenResponse.token as string
      },
      error: err => {
        if (!this.authRequest.email || !this.authRequest.password){
          this.toastService.info("please enter your credential","INFO !!")
          return
        }
        if (err.error.errorCode == 302){
          this.toastService.info("email or password incorrect","INFO !!")
          return;
        }
        this.toastService.error("something went wrong","Oups !!")
      }
    })
  }

  register() {
    this.router.navigate(['register'])
  }
}
