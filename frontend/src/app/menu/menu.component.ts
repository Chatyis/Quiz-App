import { Component, OnInit } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatProgressBar } from "@angular/material/progress-bar";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";

import { Category } from "../../shared/models/category.model";
import { CategoryBlockComponent } from "./category-block/category-block.component";
import { FavouriteCategoryComponent } from "./favourite-category/favourite-category.component";
import { LoginService } from '../../shared/services/rest-api/login.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MenuService } from "../../shared/services/rest-api/menu.service";
import { UserScore } from '../../shared/models/user-score.model';

@Component({
  standalone: true,
  imports: [
    MatCard,
    RouterOutlet,
    NgForOf,
    MatProgressBar,
    FavouriteCategoryComponent,
    CategoryBlockComponent,
    NgIf,
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  protected categories: Category[] = [];
  protected favouriteCategories: UserScore[] = [];

  constructor(private _menuService: MenuService,
              protected loginService: LoginService) {
  }

  ngOnInit(): void {
    this._fetchCategories();
    if (!!this.loginService.token) {
      this._fetchFavouriteCategories();
    }
  }

  protected getCategory(favouriteCategory: UserScore): Category {
    return this.categories.find(category => category.categoryId === favouriteCategory.categoryId)
  }

  protected logout(): void {
    this.loginService.logout().subscribe();
  }

  private _fetchCategories(): void {
    this._menuService.getCategories().subscribe(
      (categories: any) => this.categories = categories
    );
  }

  private _fetchFavouriteCategories(): void {
    this._menuService.getFavouriteCategories().subscribe((favouriteCategories: any) =>
      this.favouriteCategories = favouriteCategories
        .sort((a: UserScore, b: UserScore) => a.timesPlayed > b.timesPlayed ? -1 : 1)
    );
  }
}
