export interface Question {
  categoryQuestionId: number;
  questionContent: string;
  answerOne: string;
  answerTwo: string;
  answerThree: string;
  answerFour: string;
  correctAnswerNumber: number;
  image?: string
}
