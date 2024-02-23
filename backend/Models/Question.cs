namespace Models;

public partial class Question
{
    public int CategoryQuestionId { get; set; }
    public int CategoryId { get; set; }
    public string QuestionContent { get; set; } = "";
    public string AnswerOne { get; set; } = "";
    public string AnswerTwo { get; set; } = "";
    public string AnswerThree { get; set; } = "";
    public string AnswerFour { get; set; } = "";
    public int CorrectAnswerNumber { get; set; }
    public string? CategoryImage { get; set; }
}