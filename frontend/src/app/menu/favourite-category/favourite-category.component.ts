import { Component, Input } from '@angular/core';
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
  selector: 'app-favourite-category',
  standalone: true,
  imports: [
    MatProgressBar
  ],
  templateUrl: './favourite-category.component.html',
  styleUrl: './favourite-category.component.scss'
})
export class FavouriteCategoryComponent {
  @Input() playedTimes: Number = 0;
  @Input() level: Number = 0;
  @Input() categoryName: string;
}
