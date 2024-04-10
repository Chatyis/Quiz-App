import { Component, OnInit } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { RouterOutlet } from "@angular/router";
import { NgForOf } from "@angular/common";
import { MatProgressBar } from "@angular/material/progress-bar";

import { MenuService } from "../../shared/services/rest-api/menu.service";
import { Category } from "../../shared/models/category.model";
import { FavouriteCategoryComponent } from "./favourite-category/favourite-category.component";
import { CategoryBlockComponent } from "./category-block/category-block.component";
import { UserScore } from '../../shared/models/user-score.model';

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
  protected favouriteCategories: UserScore[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchFavouriteCategories();
  }

  // TODO check if neccessary

  // protected openCategory(categoryName: number): void {
  //   console.log(categoryName);
  // }
  protected getCategory(favouriteCategory: UserScore): Category {
    return this.categories.find(category => category.categoryId === favouriteCategory.categoryId)
  }

  private fetchCategories(): void {
    this.menuService.getCategories().subscribe(categories => this.categories = categories);
  }

  private fetchFavouriteCategories(): void {
    this.menuService.getFavouriteCategories().subscribe(favouriteCategories =>
      this.favouriteCategories = favouriteCategories
        .sort((a, b) => a.timesPlayed > b.timesPlayed ? -1 : 1)
    );
  }
}
