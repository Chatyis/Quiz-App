import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

import { ApiHelperService } from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private _apiHelper: ApiHelperService) {
  }

  getCategories(): Observable<Object> {
    return this._apiHelper.get('category-questions/categories');
  }

  getFavouriteCategories(): Observable<Object> {
    return this._apiHelper.get('category-questions/highscores');
  }
}
