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
import { ResultComponent } from './result/result.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    RouterLink,
    DescriptionComponent,
    QuestionComponent,
    ResultComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  currentCategory: Category;
  questions: Question[];
  currentQuestionIndex = 0; // TODO set to 0
  isQuizStarted: boolean = true; // TODO remove value
  correctAnswers: number = 4; // TODO remove value

  get isQuizFinished(): boolean {
    return this.currentQuestionIndex == this.questions.length;
  }

  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private quizService: QuizService) {
  }

  ngOnInit() {
    this.fetchCategories();
    this.fetchQuestions(); // TODO To be removed
  }

  setNextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.isQuizFinished) {
      this.sendQuizAndGetResults();
    }
  }

  protected startQuiz(): void {
    this.isQuizStarted = true;
    this.fetchQuestions();
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

  private sendQuizAndGetResults(): void {
    this.quizService.getResults().subscribe(correctAnswers =>
      this.correctAnswers = correctAnswers
    )
  }
}
