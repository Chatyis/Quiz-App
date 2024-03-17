export interface QuizAnswers {
  answers: Answer[];
  categoryId: number;
}

export interface Answer {
  questionId: number;
  answerId: number;
}
