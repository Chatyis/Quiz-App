using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
public class Auth : ControllerBase
{
    [HttpGet("/login")]
    public string Login()
    {
        return "";
    }

    [HttpPost("/register")]
    public IActionResult Register()
    {
        return Ok();
    }

    [HttpPost("/add-score")]
    public IActionResult AddScore()
    {
        return Ok();
    }
}