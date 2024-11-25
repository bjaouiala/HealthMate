import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "./auth-service/token.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const token = tokenService.token;

  if (req.url.includes('login') || req.url.includes('register')) {
    return next(req);
  }

  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(authReq);

};
