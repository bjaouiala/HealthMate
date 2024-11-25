import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {AuthRequest} from "./model/authenticationModel/authRequest";
import {AuthResponse} from "./model/authenticationModel/authResponse";
import {RegistrationRequest} from "./model/authenticationModel/RegistrationRequest";
import {UserResponse} from "./model/UserResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly authUrl="/auth/authenticate"
  private readonly registerUrl = "/auth/register"
  private readonly activationAccountUrl="/auth/activation-account"
  private readonly resentCodeUrl= "/auth/resent-CodeConfirmation"
  private readonly userUrl:string="/users"

  constructor(private httpClient:HttpClient,private baseService:BaseService) {}

  authenticate(authRequest:AuthRequest){
    return this.httpClient.post<AuthResponse>(`${this.baseService.rootUrl}${this.authUrl}`,authRequest)
  }

  register(registerRequest:RegistrationRequest){
    return this.httpClient.post<number>(`${this.baseService.rootUrl}${this.registerUrl}`,registerRequest)
  }

  activationAccount(param:ActivateAccount$Param){
    return this.httpClient.get(`${this.baseService.rootUrl}${this.activationAccountUrl}`,{params:{...param}})
  }

  getCurrentUser(){
    return this.httpClient.get<UserResponse>(`${this.baseService.rootUrl}${this.userUrl}`)
  }
  updateUser(userResponse:UserResponse){
    return this.httpClient.patch<UserResponse>(`${this.baseService.rootUrl}${this.userUrl}`,userResponse)
  }



}

export interface ActivateAccount$Param{
  token:string
}
