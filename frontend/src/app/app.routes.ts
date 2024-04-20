import { Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from "./menu/menu.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from "./quiz/quiz.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  {
    path: 'main',
    component: MenuComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
