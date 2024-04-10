import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-answer-btn',
  standalone: true,
  imports: [
    MatButton,
    NgClass
  ],
  templateUrl: './answer-btn.component.html',
  styleUrl: './answer-btn.component.scss'
})
export class AnswerBtnComponent {
  @Input() answerId: number;
  @Input() answerContent: string;
  @Input() isShowingAnswer: boolean;
  @Input() isWrong: boolean;
  @Input() isCorrect: boolean;
  @Output() choose: EventEmitter<number> = new EventEmitter<number>()
}
