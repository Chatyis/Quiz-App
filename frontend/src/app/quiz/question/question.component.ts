import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgClass } from '@angular/common';

import { AnswerBtnComponent } from './answer-btn/answer-btn.component';
import { Question } from '../../../shared/models/question.model';
import { QuizService } from '../../../shared/services/rest-api/quiz.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    AnswerBtnComponent,
    MatProgressBar,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {
  @Input() questions: Question[];
  @Input() categoryId: number;
  @Input() currentQuestionIndex: number;
  @Input() quizForm: UntypedFormGroup;
  @Output() questionAnswered: EventEmitter<any> = new EventEmitter<any>();

  protected correctAnswerId: number = -1;
  protected currentAnswerId: number;
  protected isShowingAnswer: boolean;
  protected readonly timeToCheckAnswer = 5;
  protected readonly timeToAnswerQuestion = 30;
  protected timeLeft: number = this.timeToAnswerQuestion;

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  constructor(private ngZone: NgZone,
              private quizService: QuizService) {
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.timeLeft--;
          if (this.timeLeft == 0 && !this.isShowingAnswer) {
            this.handleQuestionAnswer(-1);
          } else if (this.timeLeft == 0) {
            this.hideQuestionAnswer();
            this.questionAnswered.emit();
          }
        })
      }, 1000)
    })
  }

  protected handleQuestionAnswer(answerId: number): void {
    if (!this.isShowingAnswer) {
      this.currentAnswerId = answerId;
      this.addAnswer(answerId);
      this.showCorrectAnswer();
    }
  }

  protected addAnswer(answerId: number): void {
    (this.quizForm.controls['answers'] as FormArray).push(this.buildAnswer(answerId));
  }

  private showCorrectAnswer(): void {
    this.isShowingAnswer = true;
    this.timeLeft = this.timeToCheckAnswer;
    this.quizService.getCorrectAnswerId(this.currentQuestion.categoryQuestionId, this.categoryId).subscribe(correctAnswerId => {
      this.correctAnswerId = correctAnswerId;
    })
  }

  private buildAnswer(answerId: number): FormControl {
    return new FormControl({
      questionId: [this.questions[this.currentQuestionIndex].categoryQuestionId, Validators.required],
      answerId: [answerId, Validators.required]
    });
  }

  private hideQuestionAnswer(): void {
    this.isShowingAnswer = false;
    this.timeLeft = this.timeToAnswerQuestion;
  }
}
