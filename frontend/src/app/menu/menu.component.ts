import { Component, OnInit } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";

import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { Category } from "../../shared/models/category.model";
import { CategoryBlockComponent } from "./category-block/category-block.component";
import { FavouriteCategoryComponent } from "./favourite-category/favourite-category.component";
import { LoginService } from '../../shared/services/rest-api/login.service';
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
    RouterLink,
    AvatarDialogComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  protected categories: Category[] = [];
  protected favouriteCategories: UserScore[] = [];
  protected currentAvatar: string;

  constructor(private _menuService: MenuService,
              private _dialog: MatDialog,
              protected loginService: LoginService) {
  }

  ngOnInit(): void {
    this._fetchCategories();
    if (!!this.loginService.token) {
      this._fetchFavouriteCategories();
      this._fetchAvatar();
    } else {
      this.currentAvatar = this._menuService.avatars[Math.floor(Math.random() * this._menuService.avatars.length)] + '.jpg';
    }
  }

  protected openChooseAvatarDialog(event: Event): void {
    event.stopPropagation();
    this._dialog.open(AvatarDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe(avatarId => {
      if (avatarId) {
        this.currentAvatar = this._menuService.avatars[avatarId] + '.jpg';
      }
    })
  }

  protected getCategory(favouriteCategory: UserScore): Category {
    return this.categories.find(category => category.categoryId === favouriteCategory.categoryId)
  }

  protected logout(): void {
    this.loginService.logout().subscribe();
  }

  private _fetchAvatar(): void {
    this._menuService.getUserAvatar().subscribe(avatar => {
      try {
        this.currentAvatar = this._menuService.avatars[(avatar as number)];
      } catch (e) {
        this.currentAvatar = this._menuService.avatars[0];
      } finally {
        this.currentAvatar += '.jpg';
      }
    })
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
