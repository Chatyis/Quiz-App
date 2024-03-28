using backend.Dtos;
using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers;

[ApiController]
[Route("[controller]")]
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
        //TODO Check for the same question ???

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

        if (HttpContext.Request.Headers.TryGetValue("Authorization", out var headerAuth))
        {
            SaveScore(quizAnswers.CategoryId, finalResult);   
        }
        
        return finalResult;
    }

    [Authorize]
    [HttpGet("highscores")]
    public IEnumerable<UserScore> GetHighscores()
    {
        string highestScoresSql = @"SELECT TOP 5 
            UserCredentialsId, 
            CategoryId, 
            Experience, 
            TimesPlayed
        FROM Scores
        WHERE UserCredentialsId = @UserId
        ORDER BY Experience DESC;";
        
        return _dataProvider.GetItems<UserScore>(highestScoresSql,
            new { UserId = Int32.Parse(User.FindFirst("userId").Value) });
    }
    
    private void SaveScore(int CategoryId, int result)
    {
        string addScoreSql = @"INSERT INTO Scores (UserCredentialsId, CategoryId, Experience, TimesPlayed)
            VALUES (@UserCredentialsId, @CategoryId, @Experience, 1);";

        string updateScoreSql = @"UPDATE Scores
            SET Experience = Experience + @ExperienceGained,
                TimesPlayed = TimesPlayed + 1
            WHERE CategoryId = @CategoryId;";
        
        string userScoreExistCheckSql = @"SELECT 1
             FROM Scores
             WHERE UserCredentialsId = @UserCredentialsId AND CategoryId = @CategoryId";
        
        int UserCredentialsId = Int32.Parse(User.FindFirst("userId").Value);
            
        if (_dataProvider.ExecuteScalar(userScoreExistCheckSql, new {UserCredentialsId, CategoryId}))
        {
            _dataProvider.Execute(updateScoreSql,
                new
                {
                    UserCredentialsId, 
                    CategoryId,
                    ExperienceGained = result
                });
        }
        else
        {
            _dataProvider.Execute(addScoreSql,
                new
                {
                    UserCredentialsId, 
                    CategoryId,
                    Experience = result
                });
        }
    }
}