import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-quiz-description',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent {
  @Input() currentCategory: Category;
  @Output() continue: EventEmitter<any> = new EventEmitter<any>();
}
