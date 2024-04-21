import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import { ApiHelperService } from './api-helper.service';
import { HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  readonly avatars = ['433653723_331612883256894_3011614297175921315_n', '403410637_1676332192776261_6814106955501394680_n', '415841760_1773879329703479_883748343621636449_n', '423454459_1388682712009499_3967460284621878576_n', '423600073_421820403686425_2233402990085360048_n', '436076758_804919691491055_7548929966283135284_n', '436421742_461454329646182_7650166511243929353_n', '436746421_1613572282742312_4364309959741528518_n', '436817909_415083731156362_4921693546732795644_n', 'att._AexEtTaUd-IQxJghwAB2EInFiK1Ee17SYIz9UlVhnk', 'att.2-_bCkAJfW09rPQKhFnDqlw-MSuRxXslxHh3byagroc', 'att.9h4QOJHdjfvrPebvegXDWOqy5ntxK6hUl1ls7_M8e4s'];

  constructor(private _apiHelper: ApiHelperService,
              private _loginService: LoginService) {
  }

  getCategories(): Observable<Object> {
    return this._apiHelper.get('category-questions/categories');
  }

  getFavouriteCategories(): Observable<Object> {
    return this._apiHelper.get('category-questions/highscores');
  }

  getUserAvatar(): Observable<Object> {
    if (!!this._loginService.token) {
      return this._apiHelper.get('auth/avatar');
    }
    return of(this.avatars[0]);
  }

  setUserAvatar(avatarId: number): Observable<Object> {
    const params = new HttpParams().append('avatar', avatarId);
    return this._apiHelper.post('auth/avatar', undefined, params);
  }
}
