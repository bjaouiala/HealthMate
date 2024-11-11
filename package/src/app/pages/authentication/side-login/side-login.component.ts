import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import {AuthRequest} from "../../../services/auth-service/model/authenticationModel/authRequest";
import {AuthServiceService} from "../../../services/auth-service/auth-service.service";
import {TokenService} from "../../../services/auth-service/token.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  authRequest:AuthRequest={email: "", password: ""}
  constructor(private router: Router,private authService:AuthServiceService
              ,private tokenService:TokenService,
              private toastService:ToastrService){ }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid){
      this.authRequest = this.form.value as AuthRequest

    }
    this.authService.authenticate(this.authRequest).subscribe({
      next: tokenResponse => {
        this.tokenService.token = tokenResponse.token as string
        this.router.navigate(['dashboard'])
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
}
