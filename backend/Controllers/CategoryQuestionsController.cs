using Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers;

[ApiController]
public class CategoryQuestions : ControllerBase
{
    DataProviderDapper dataProvider = new DataProviderDapper();

    [HttpGet("questions")]
    public IEnumerable<Question> GetQuestions(int categoryId)
    {
        // TODO hide correct answer in DTO
        string sql = @"SELECT 
            [CategoryQuestionId],
            [CategoryId],
            [QuestionContent],
            [AnswerOne],
            [AnswerTwo],
            [AnswerThree],
            [AnswerFour],
            [CorrectAnswerNumber],
            [CategoryImage]
            FROM CategoryQuestions
            WHERE CategoryId = @CategoryId;";
        var parameters = new { CategoryId = categoryId };

        return dataProvider.GetItems<Question>(sql, parameters);
    }

    [HttpGet("categories")]
    public IEnumerable<Category> GetCategories()
    {
        string sql = "SELECT [CategoryId],[CategoryName],[FinalImage],[Icon] FROM [Categories]";

        return dataProvider.GetItems<Category>(sql);
    }

    [HttpPost("result")]
    public int Result(Answer[] answers)
    {
        //TODO calculate score by set of {categoryId, questionId, answer}[] 
        return 5;
    }
}