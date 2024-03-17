import { Component, Input } from '@angular/core';
import { Category } from "../../../shared/models/category.model";
import { RouterLink } from "@angular/router";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-category-block',
  standalone: true,
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './category-block.component.html',
  styleUrl: './category-block.component.scss'
})
export class CategoryBlockComponent {
  @Input() category: Category;
}
