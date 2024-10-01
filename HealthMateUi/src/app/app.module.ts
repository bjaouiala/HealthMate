import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import { LoginComponent } from './pages/login/login.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import { ActivationAccountComponent } from './pages/activation-account/activation-account.component';
import {CodeInputModule} from "angular-code-input";
import {ToastrModule} from "ngx-toastr";

let InterceptorInterceptor;

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ActivationAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CodeInputModule,
    ToastrModule.forRoot({
      progressBar:true,
      closeButton:true,
      newestOnTop:true,
      tapToDismiss: true,
      positionClass:'toast-bottom-right',
      timeOut:5000
    })
  ],
  providers: [HttpClient,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
