import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";

import { Category } from "../../shared/models/category.model";
import { MenuService } from "../../shared/services/rest-api/menu.service";
import { QuizService } from '../../shared/services/rest-api/quiz.service';
import { Question } from '../../shared/models/question.model';
import { DescriptionComponent } from './description/description.component';
import { QuestionComponent } from './question/question.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    RouterLink,
    DescriptionComponent,
    QuestionComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  currentCategory: Category;
  questions: Question[];
  currentQuestionIndex = 0;
  isQuizStarted: boolean;

  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private quizService: QuizService) {
  }

  ngOnInit() {
    this.fetchCategories();
  }

  protected startQuiz(): void {
    this.fetchQuestions();
    this.isQuizStarted = true;
  }

  protected fetchQuestions(): void {
    this.quizService.getQuestions().subscribe(questions =>
      this.questions = questions
    )
  }

  private fetchCategories(): void {
    this.menuService.getCategories().subscribe(categories => {
      const categoryId = +this.route.snapshot.paramMap.get('id');
      this.currentCategory = categories.find(category => category.categoryId === categoryId);
    })
  }
}
