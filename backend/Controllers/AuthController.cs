using System.Security.Cryptography;
using Data;
using Microsoft.AspNetCore.Mvc;
using Models;
using BC = BCrypt.Net.BCrypt;

namespace Controllers;

[ApiController]
public class Auth : ControllerBase
{
    DataProviderDapper dataProvider = new DataProviderDapper();

    [HttpPost("/login")]
    public IActionResult Login(Register loginCredentials)
    {
        string sql = @"SELECT [UserLogin]
          ,[PasswordHash]
          ,[PasswordSalt]
         FROM UserCredentials
         WHERE UserCredentials.UserLogin = @UserLogin";

        Login user;
        try
        {
            user = dataProvider.GetItem<Login>(sql, new { UserLogin = loginCredentials.UserLogin });
            if (!BC.EnhancedVerify(loginCredentials.UserPassword + user.PasswordSalt, user.PasswordHash))
            {
                throw new Exception();
            }
        }
        catch
        {
            return StatusCode(500,"User doesn't exists or password is incorrect");
        }
        
        Response.Cookies.Append("token", "asdqwe");
        return Ok();
    }

    [HttpPost("/register")]
    public IActionResult Register(Register register)
    {
        var login = new Login();
        login.UserLogin = register.UserLogin;
        
        var salt = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
        login.PasswordSalt = salt;

        var hash = BC.EnhancedHashPassword(register.UserPassword + salt);

        login.PasswordHash = hash;
        
        dataProvider.Execute(@"INSERT INTO UserCredentials (UserLogin, PasswordHash, PasswordSalt)
            VALUES (@UserLogin, @PasswordHash, @PasswordSalt)", login);
        
        return Ok();
    }

    [HttpPost("/add-score")]
    public IActionResult AddScore()
    {
        return Ok();
    }
}