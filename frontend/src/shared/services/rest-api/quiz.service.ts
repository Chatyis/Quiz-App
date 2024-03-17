import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Question } from '../../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questions: Question[] = [
    {
      categoryQuestionId: 2,
      questionContent: 'What is the name of the main character in TES V Skyrim?',
      answerOne: 'Dovahkiin',
      answerTwo: 'Bob',
      answerThree: 'He has no name',
      answerFour: 'Ivellios',
      image: null
    },
    {
      categoryQuestionId: 1,
      questionContent: 'Is Minecraft the best game in the world?',
      answerOne: 'Yes',
      answerTwo: 'Maybe',
      answerThree: 'No',
      answerFour: 'Very No',
      image: null
    },
    {
      categoryQuestionId: 4,
      questionContent: 'Which game is the oldest?',
      answerOne: 'Counter Strike 1.6',
      answerTwo: 'Crysis',
      answerThree: 'Grand Theft Auto: San Andreas',
      answerFour: 'The Elder Scrolls III: Morrowind',
      image: null
    },
    {
      categoryQuestionId: 3,
      questionContent: 'What cheat do You need to write to get money in Sims?',
      answerOne: 'Motherlode',
      answerTwo: 'FreeRealEstate',
      answerThree: 'Hesoyam',
      answerFour: 'Kangaroo',
      image: null
    }];

  constructor() {
  }

  getQuestions(): Observable<Question[]> {
    return of(this.questions);
  }

  getResults(): Observable<number> {
    // As from API returned value is just a number
    return of(4);
  }
}
