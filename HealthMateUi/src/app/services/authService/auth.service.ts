import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthRequest} from "../model/authenticationModel/authRequest";
import {AuthResponse} from "../model/authenticationModel/authResponse";
import {BaseService} from "../base.service";
import {RegistrationRequest} from "../model/authenticationModel/RegistrationRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl="/auth/authenticate"
  private readonly registerUrl = "/auth/register"
  private readonly activationAccountUrl="/auth/activation-account"
  private readonly resentCodeUrl= "/auth/resent-CodeConfirmation"

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



}

export interface ActivateAccount$Param{
  token:string
}
