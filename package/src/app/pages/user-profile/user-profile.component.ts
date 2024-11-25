import { Component, OnInit } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { UserResponse } from '../../services/auth-service/model/UserResponse';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    CommonModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserResponse = {};
  isEditingPhoneNumber = false;
  isEditingAddress = false;
  isEditingFirstname = false;
  isEditingLastname = false;
  isChangingPassword = false;
  newPassword = '';
  confirmPassword = '';
  passwordError=''


  constructor(
    private authService: AuthServiceService,
    private toastService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: res => {
        this.user = res;
        console.log(this.user.email);
        console.log(this.user.firstname);
      },
      error: err => {
        this.toastService.error('Something went wrong');
      }
    });
  }

  toggleEdit(field: string) {
    switch (field) {
      case 'phoneNumber':
        this.isEditingPhoneNumber = !this.isEditingPhoneNumber;
        break;
      case 'address':
        this.isEditingAddress = !this.isEditingAddress;
        break;
      case 'firstname':
        this.isEditingFirstname = !this.isEditingFirstname;
        break;
      case 'lastname':
        this.isEditingLastname = !this.isEditingLastname;
        break;
      default:
        break;
    }
  }

  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
    this.passwordError = '';
  }

  validatePassword() {
    if (this.newPassword && this.confirmPassword) {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordError = 'Passwords do not match.';
      } else {
        this.passwordError = '';
      }
    }
  }

  updateUser() {
    this.user.password = this.newPassword
    this.authService.updateUser(this.user).subscribe({
      next: res =>{
        this.toastService.success("user updated succefully")
        this.router.navigate(["/posts"])
      },
      error: err => {
        this.toastService.error("something went wrong")
      }
    })
  }
}
