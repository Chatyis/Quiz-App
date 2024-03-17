import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    MatButton,
    MatProgressSpinner,
    RouterLink
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  @Input() correctAnswers: number;
  @Input() questionsAmount: number;
  @Input() categoryName: string;

//TODO result is loading, increasing pts value, spinner is also step by step changed e.g 0->25%->50% ...
  get result(): number {
    return this.correctAnswers / this.questionsAmount * 100
  }

  replay(): void {
    window.document.location.reload();
  }
}
