import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { AccessToken } from '../../models/access-token.model';
import { ApiHelperService } from './api-helper.service';
import { UserCredentials } from '../../models/user-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apiHelper: ApiHelperService,
              private cookieService: CookieService) {
  }

  login(userCredentials: UserCredentials): Observable<AccessToken> {
    return this._authHelper(userCredentials, 'login');
  }

  refreshToken(): Observable<Object> {
    return this.apiHelper.get('auth/refresh-token').pipe(map((response: any) => {
      this.cookieService.set('token', response.token, {path: '/'});
      return response;
    }));
  }

  register(userCredentials: UserCredentials): Observable<AccessToken> {
    return this._authHelper(userCredentials, 'register');
  }

  logout(): Observable<any> {
    return this.apiHelper.post('auth/logout').pipe(map((response: any) => {
      this.cookieService.delete('token');
      return response;
    }))
  }

  private _authHelper(userCredentials: UserCredentials, path: string): Observable<AccessToken> {
    return this.apiHelper.post<AccessToken>('auth/' + path, userCredentials)
      .pipe(map((response) => {
          this.cookieService.set('token', response.token, {path: '/'});
          return response;
        })
      );
  }

  get token(): string {
    return this.cookieService.get('token');
  }

  get username(): string {
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token);
      return decodedToken?.username;
    } else {
      return "Guest";
    }
  }
}
