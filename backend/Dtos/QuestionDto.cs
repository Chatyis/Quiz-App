namespace backend.Dtos;

public class QuestionDto
{
    public int CategoryQuestionId { get; set; }
    public string QuestionContent { get; set; } = "";
    public string AnswerOne { get; set; } = "";
    public string AnswerTwo { get; set; } = "";
    public string AnswerThree { get; set; } = "";
    public string AnswerFour { get; set; } = "";
    public string? Image { get; set; }
}