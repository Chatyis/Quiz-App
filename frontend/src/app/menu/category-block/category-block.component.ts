import { Component, Input } from '@angular/core';
import { Category } from "../../../shared/models/category.model";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-block',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './category-block.component.html',
  styleUrl: './category-block.component.scss'
})
export class CategoryBlockComponent {
  @Input() category: Category;
}
