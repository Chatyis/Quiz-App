import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { UserCredentials } from '../../models/user-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
  }

  getUserToken(user: UserCredentials): Observable<String> {
    return of("");
  }

  refreshToken(token: String): Observable<String> {
    return of("");
  }
}
