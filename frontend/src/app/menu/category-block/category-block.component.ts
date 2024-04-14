import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

import { Category } from "../../../shared/models/category.model";

@Component({
  selector: 'app-category-block',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatIcon
  ],
  templateUrl: './category-block.component.html',
  styleUrl: './category-block.component.scss'
})
export class CategoryBlockComponent {
  @Input() category: Category;
}
