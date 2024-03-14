import { Injectable } from '@angular/core';
import { Category } from "../../models/category.model";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  readonly categories: Category[] = [
    {
      "categoryId": 1,
      "categoryName": "Games",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    },
    {
      "categoryId": 2,
      "categoryName": "Movies",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    },
    {
      "categoryId": 3,
      "categoryName": "Books",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    },
    {
      "categoryId": 4,
      "categoryName": "Music",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    },
    {
      "categoryId": 5,
      "categoryName": "Physics",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    },
    {
      "categoryId": 6,
      "categoryName": "Math",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    },
    {
      "categoryId": 7,
      "categoryName": "IT",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    },
    {
      "categoryId": 8,
      "categoryName": "Minecraft",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue."
    }
  ]

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }
}
