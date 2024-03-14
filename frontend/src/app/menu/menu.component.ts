import { Component, OnInit } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { RouterOutlet } from "@angular/router";
import { NgForOf } from "@angular/common";
import { MatProgressBar } from "@angular/material/progress-bar";

import { MenuService } from "../../shared/services/rest-api/menu.service";
import { Category } from "../../shared/models/category.model";
import { FavouriteCategoryComponent } from "./favourite-category/favourite-category.component";
import { CategoryBlockComponent } from "./category-block/category-block.component";

@Component({
  standalone: true,
  imports: [
    MatCard,
    RouterOutlet,
    NgForOf,
    MatProgressBar,
    FavouriteCategoryComponent,
    CategoryBlockComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  protected categories: Category[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  //
  // protected openCategory(categoryName: number): void {
  //   console.log(categoryName);
  // }

  private fetchCategories(): void {
    this.menuService.getCategories().subscribe(categories => this.categories = categories);
  }
}
