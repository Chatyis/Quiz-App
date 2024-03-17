import { Component, Input } from '@angular/core';
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-favourite-category',
  standalone: true,
  imports: [
    MatProgressBar,
    MatButton
  ],
  templateUrl: './favourite-category.component.html',
  styleUrl: './favourite-category.component.scss'
})
export class FavouriteCategoryComponent {
  @Input() playedTimes: Number = 0;
  @Input() level: Number = 0;
  @Input() categoryName: string;
}
