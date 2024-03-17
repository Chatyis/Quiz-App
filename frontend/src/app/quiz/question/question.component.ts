import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { AnswerBtnComponent } from './answer-btn/answer-btn.component';
import { Question } from '../../../shared/models/question.model';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    AnswerBtnComponent,
    ReactiveFormsModule,
    MatProgressBar
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {
  @Input() questions: Question[];
  @Input() categoryId: number;
  @Input() currentQuestionIndex: number;
  @Output() questionAnswered: EventEmitter<any> = new EventEmitter<any>();
  protected timeLeft: number = 1000; //TODO change to 30
  private id: NodeJS.Timeout;

  quizForm = this.fb.group({
    answers: this.fb.array([]),
    categoryId: [null]
  })

  constructor(private fb: FormBuilder,
              private ngZone: NgZone) {

  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.timeLeft--;
          if (this.timeLeft == 0) {
            this.timeEnded();
          }
        })
      }, 1000)
    })

  }

  protected addAnswer(answerId: number): void {
    this.quizForm.controls.answers.push(this.buildAnswer(answerId));
    this.questionAnswered.emit();
  }

  private buildAnswer(answerId: number): FormControl {
    return new FormControl({
      questionId: [this.questions[this.currentQuestionIndex].categoryQuestionId, Validators.required],
      answerId: [answerId, Validators.required]
    });
  }

  private timeEnded(): void {
    this.timeLeft = 30;
    this.addAnswer(-1);
  }
}
