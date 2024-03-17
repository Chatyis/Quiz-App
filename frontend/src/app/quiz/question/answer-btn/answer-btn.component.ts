import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-answer-btn',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './answer-btn.component.html',
  styleUrl: './answer-btn.component.scss'
})
export class AnswerBtnComponent {
  @Input() answerId: number;
  @Input() answerContent: string;
  @Output() choose: EventEmitter<number> = new EventEmitter<number>()
}
