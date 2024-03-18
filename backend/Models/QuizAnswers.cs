namespace Models;

public partial class QuizAnswers
{
    public Answer[] Answers { get; set; } = [];
    public int CategoryId { get; set; }
}