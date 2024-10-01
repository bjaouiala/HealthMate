import { Component } from '@angular/core';
import {RegistrationRequest, Role} from "../../services/model/authenticationModel/RegistrationRequest";
import {AuthService} from "../../services/authService/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../customValidation";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegistrationRequest={}
  registerForm!:FormGroup
  constructor(private authService:AuthService,private router:Router,private toastService:ToastrService) {
    this.registerForm= new FormGroup({
      firstname: new FormControl("",Validators.required),
      lastname: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,passwordValidator]),
      phoneNumber: new FormControl("",Validators.required),
      address: new FormControl("",Validators.required),
      role: new FormControl("",Validators.required),

    })

  }

  register() {
    if (this.registerForm.valid){
      this.registerRequest = this.registerForm.value
    }
    this.authService.register(this.registerRequest).subscribe({
      next: res=>{
        this.router.navigate(['activation-account'])
      },
      error: err => {
        if (err.error.validationErrors){
          return
        }
        this.toastService.error("something went wrong","Oups !!")
      }
    })
  }

  login() {
    this.router.navigate(['login'])
  }

  protected readonly Role = Role;
}
