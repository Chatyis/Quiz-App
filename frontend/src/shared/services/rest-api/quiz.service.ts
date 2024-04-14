import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ApiHelperService } from './api-helper.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private _apiHelper: ApiHelperService) {
  }

  getQuestions(categoryId: number): Observable<Object> {
    const params = new HttpParams().append('categoryId', categoryId);
    return this._apiHelper.get('category-questions/questions', params);
  }

  getResults(quizAnswers: FormGroup): Observable<number> {
    // quizAnswers.getRawValue()
    // As from API returned value is just a number
    return of(4);
  }

  getCorrectAnswerId(questionId: number, categoryId: number): Observable<number> {
    // As from API returned value is just a number
    return of(2);
  }
}
