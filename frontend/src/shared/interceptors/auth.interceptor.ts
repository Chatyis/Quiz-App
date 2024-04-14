import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';

import { LoginService } from '../services/rest-api/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(public loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.token) {
      const authReq = this.addToken(req, this.loginService.token)

      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return this.handle401Error(req, next);
          }
          return throwError(error)
        })
      )
    }
    return next.handle(req);

  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      this.refreshTokenSubject.next(null);

      return this.loginService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          return next.handle(this.addToken(request, response.token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }
}

