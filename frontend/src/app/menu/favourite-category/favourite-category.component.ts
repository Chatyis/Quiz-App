import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { Category } from '../../../shared/models/category.model';
import { UserScore } from '../../../shared/models/user-score.model';

@Component({
  selector: 'app-favourite-category',
  standalone: true,
  imports: [
    DecimalPipe,
    MatProgressBar,
    MatButton,
    RouterLink
  ],
  templateUrl: './favourite-category.component.html',
  styleUrl: './favourite-category.component.scss'
})
export class FavouriteCategoryComponent {
  @Input() categoryScore: UserScore;
  @Input() category: Category;

  get level(): number {
    return Math.floor(this.categoryScore.experience / 10);
  }

  get experienceLeft(): number {
    const currentExp = this.categoryScore.experience;
    return currentExp % 10;
  }
}
