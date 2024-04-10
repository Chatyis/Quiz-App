import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-answer-btn',
  standalone: true,
  imports: [
    MatButton,
    NgClass,
    NgIf
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
