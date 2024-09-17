import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { LoginResponse } from '../models/login.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getJwtToken();
    
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
  }

    return next.handle(req);
  }
}
