import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Interceptor for add JWT token to each and every http request goin out form the app to API
@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next))
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const token = await this.authenticationService.currentUser?.access_token;

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    })

    return await lastValueFrom(next.handle(authReq));
  }
}