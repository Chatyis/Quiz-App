using backend.Dtos;
using Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers;

[ApiController]
public class CategoryQuestions : ControllerBase
{
    private DataProviderDapper _dataProvider = new DataProviderDapper();

    [HttpGet("questions")]
    public IEnumerable<QuestionDto> GetQuestions(int categoryId)
    {
        string sql = @"SELECT TOP(10) 
            [CategoryQuestionId],
            [QuestionContent],
            [AnswerOne],
            [AnswerTwo],
            [AnswerThree],
            [AnswerFour],
            [Image] 
            FROM CategoryQuestions
            WHERE CategoryId = @CategoryId
            ORDER BY newid();";
        
        var parameters = new { CategoryId = categoryId };

        return _dataProvider.GetItems<QuestionDto>(sql, parameters);
    }

    [HttpGet("categories")]
    public IEnumerable<Category> GetCategories()
    {
        string sql = "SELECT [CategoryId],[CategoryName],[FinalImage],[Icon],[CategoryDescription], [Color] FROM [Categories]";

        return _dataProvider.GetItems<Category>(sql);
    }

    [HttpPost("result")]
    public int Result(QuizAnswers quizAnswers)
    {
        //TODO Check for the same question
        IEnumerable<int> questionsIds = quizAnswers.Answers.Select(answer => answer.QuestionId);
        
        string sql = @"SELECT
            [CategoryQuestionId]
            ,[CorrectAnswerNumber]
            FROM CategoryQuestions
            WHERE CategoryId = @categoryId AND CategoryQuestionId IN @questionIds";

        var parameters = new { @categoryId = quizAnswers.CategoryId, @questionIds = questionsIds };
        
        IEnumerable<QuestionWithAnswer> correctAnswers = _dataProvider.GetItems<QuestionWithAnswer>(sql, parameters);
        
        var finalResult = 0;

        foreach(var answer in quizAnswers.Answers)
        {
            if (answer.AnswerId == correctAnswers
                    .First(correctAnswer => correctAnswer.CategoryQuestionId == answer.QuestionId).CorrectAnswerNumber)
            {
                finalResult++;
            }
        }
        
        return finalResult;
    }
}