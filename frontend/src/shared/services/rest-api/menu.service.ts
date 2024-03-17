import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import { Category } from "../../models/category.model";

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
      "categoryDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium vel velit quis laoreet. Aenean blandit lectus ut odio posuere, eget commodo turpis facilisis.",
      "color": "58C9D1"
    },
    {
      "categoryId": 2,
      "categoryName": "Movies",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue.",
      "color": "41CD68"
    },
    {
      "categoryId": 3,
      "categoryName": "Books",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Praesent a tincidunt ligula. In sit amet odio in nunc tempus elementum ut non est. Aliquam erat volutpat. Nullam egestas quam in molestie accumsan.",
      "color": "C9984E"
    },
    {
      "categoryId": 4,
      "categoryName": "Music",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Aliquam erat volutpat. Curabitur mattis libero at est pulvinar consequat. Pellentesque magna diam, iaculis aliquet ex in, convallis consequat sapien.",
      "color": "C452CE"
    },
    {
      "categoryId": 5,
      "categoryName": "Physics",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Nullam ipsum purus, venenatis vitae dignissim in, efficitur sed elit. Sed faucibus mi id aliquet finibus.",
      "color": "CED054"
    },
    {
      "categoryId": 6,
      "categoryName": "Math",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "In sed arcu tincidunt, tempor enim non, aliquam quam. Pellentesque tristique elementum efficitur. Quisque pellentesque justo vitae ante tempus, a varius justo volutpat. ",
      "color": "CF7457"
    },
    {
      "categoryId": 7,
      "categoryName": "IT",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Nulla nec tellus augue. Quisque odio erat, porttitor dignissim nisl id, placerat maximus velit. Cras orci mauris, laoreet eget aliquet eget, pulvinar eu sapien.",
      "color": "D05454"
    },
    {
      "categoryId": 8,
      "categoryName": "Minecraft",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Aliquam erat volutpat. Nam erat ipsum, suscipit suscipit sodales in, tempus ac sapien. Proin ut sapien sed leo dapibus euismod quis ut nisl. ",
      "color": "5771CF"
    }, {
      "categoryId": 1,
      "categoryName": "Games",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium vel velit quis laoreet. Aenean blandit lectus ut odio posuere, eget commodo turpis facilisis.",
      "color": "58C9D1"
    },
    {
      "categoryId": 2,
      "categoryName": "Movies",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Donec id urna massa. Maecenas sit amet eros ac tellus sollicitudin maximus at sed libero. Curabitur viverra luctus congue.",
      "color": "41CD68"
    },
    {
      "categoryId": 3,
      "categoryName": "Books",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Praesent a tincidunt ligula. In sit amet odio in nunc tempus elementum ut non est. Aliquam erat volutpat. Nullam egestas quam in molestie accumsan.",
      "color": "C9984E"
    },
    {
      "categoryId": 4,
      "categoryName": "Music",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Aliquam erat volutpat. Curabitur mattis libero at est pulvinar consequat. Pellentesque magna diam, iaculis aliquet ex in, convallis consequat sapien.",
      "color": "C452CE"
    },
    {
      "categoryId": 5,
      "categoryName": "Physics",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Nullam ipsum purus, venenatis vitae dignissim in, efficitur sed elit. Sed faucibus mi id aliquet finibus.",
      "color": "CED054"
    },
    {
      "categoryId": 6,
      "categoryName": "Math",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "In sed arcu tincidunt, tempor enim non, aliquam quam. Pellentesque tristique elementum efficitur. Quisque pellentesque justo vitae ante tempus, a varius justo volutpat. ",
      "color": "CF7457"
    },
    {
      "categoryId": 7,
      "categoryName": "IT",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Nulla nec tellus augue. Quisque odio erat, porttitor dignissim nisl id, placerat maximus velit. Cras orci mauris, laoreet eget aliquet eget, pulvinar eu sapien.",
      "color": "D05454"
    },
    {
      "categoryId": 8,
      "categoryName": "Minecraft",
      "finalImage": null,
      "icon": null,
      "categoryDescription": "Aliquam erat volutpat. Nam erat ipsum, suscipit suscipit sodales in, tempus ac sapien. Proin ut sapien sed leo dapibus euismod quis ut nisl. ",
      "color": "5771CF"
    }
  ]

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }
}
