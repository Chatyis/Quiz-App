import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButton } from "@angular/material/button";

import { Category } from "../../shared/models/category.model";
import { DescriptionComponent } from './description/description.component';
import { MenuService } from "../../shared/services/rest-api/menu.service";
import { ResultComponent } from './result/result.component';
import { QuizService } from '../../shared/services/rest-api/quiz.service';
import { Question } from '../../shared/models/question.model';
import { QuestionComponent } from './question/question.component';

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
  protected currentCategory: Category;
  protected questions: Question[] = [];
  protected currentQuestionIndex = -1;
  protected correctAnswers: number = 0;

  protected quizForm: UntypedFormGroup = this.fb.group({
    answers: this.fb.array([]),
    categoryId: [null]
  })

  protected get isQuizFinished(): boolean {
    return this.currentQuestionIndex === this.questions.length;
  }

  protected get isQuizStarted(): boolean {
    return this.currentQuestionIndex > -1;
  }

  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private quizService: QuizService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchCategories();
  }

  setNextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.isQuizFinished) {
      this.sendQuizAndGetResults();
    }
  }

  protected startQuiz(): void {
    this.currentQuestionIndex = 0;
    this.fetchQuestions();
  }

  protected fetchQuestions(): void {
    this.quizService.getQuestions(this.currentCategory.categoryId).subscribe((questions: any) =>
      this.questions = questions
    )
  }

  private fetchCategories(): void {
    this.menuService.getCategories().subscribe((categories: any) => {
      const categoryId = +this.route.snapshot.paramMap.get('id');
      this.quizForm.controls['categoryId'].setValue(categoryId);
      this.currentCategory = categories.find((category: Category) => category.categoryId === categoryId);
    })
  }

  private sendQuizAndGetResults(): void {
    this.quizService.getResults(this.quizForm.getRawValue()).subscribe(correctAnswers =>
      this.correctAnswers = correctAnswers
    )
  }
}
