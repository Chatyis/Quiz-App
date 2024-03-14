import { Routes } from '@angular/router';

import { MenuComponent } from "./menu/menu.component";
import { LoginComponent } from "./login/login.component";
import { QuizComponent } from "./quiz/quiz.component";

export const routes: Routes = [
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  {
    path: 'main',
    component: MenuComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
