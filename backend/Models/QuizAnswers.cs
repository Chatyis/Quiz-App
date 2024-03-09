namespace Models;

public class QuizAnswers
{
    public Answer[] Answers { get; set; } = [];
    public int CategoryId { get; set; }
}