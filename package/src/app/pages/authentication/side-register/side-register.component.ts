<<<<<<< HEAD
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material.module';
import {passwordValidator} from "../../../services/auth-service/passwordValidator";
import {RegistrationRequest, Role} from "../../../services/auth-service/model/authenticationModel/RegistrationRequest";
import {AuthServiceService} from "../../../services/auth-service/auth-service.service";
import {ToastrService} from "ngx-toastr";
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

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  registrationRequest:RegistrationRequest={}
  constructor(private router: Router,private authService:AuthServiceService,private toastService:ToastrService) {}

  form = new FormGroup({
    firstname: new FormControl("",Validators.required),
    lastname: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,passwordValidator]),
    phoneNumber: new FormControl("",Validators.required),
    address: new FormControl("",Validators.required),

  constructor(private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form)
    if (this.form.valid){
      this.registrationRequest = this.form.value as RegistrationRequest
      this.registrationRequest.role = Role.USER
      console.log(this.registrationRequest)
    }
    this.authService.register(this.registrationRequest).subscribe({
      next: res=>{
        this.router.navigate(['authentication/activation-account'])
      },
      error: err => {
        console.log(err)
        if (err.error.validationErrors){
          return
        }
        this.toastService.error("something went wrong","Oups !!")
      }
    })


    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
