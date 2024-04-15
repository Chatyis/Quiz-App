import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiHelperService } from './api-helper.service';
import { QuizAnswers } from '../../models/quiz-answers.model';

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

  getResults(quizAnswers: QuizAnswers): Observable<number> {
    return this._apiHelper.post<number>('category-questions/result', quizAnswers);
  }
}
