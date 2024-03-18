using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Data;
using Microsoft.AspNetCore.Mvc;
using Models;
using BC = BCrypt.Net.BCrypt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class Auth : ControllerBase
{
    DataProviderDapper dataProvider = new DataProviderDapper();
    private readonly IConfiguration _config;

    public Auth(IConfiguration config)
    {
        _config = config;
    }
    
    [AllowAnonymous]
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
        return Ok(new Dictionary<string, string>
        {
            {"token",CreateToken(user.UserLogin)}
        });
    }
    
    [AllowAnonymous]
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

    // [HttpPost("/add-score")]
    // public IActionResult AddScore()
    // {
    //     return Ok();
    // }
    [HttpGet("RefreshToken")]
    public string RefreshToken()
    {
        string usernameSql = @"
                SELECT UserLogin FROM UserCredentials WHERE UserLogin = @Username";

        string username = dataProvider.GetItem<string>(usernameSql,new {Username= User.FindFirst("username")?.Value });

        return CreateToken(username);
    }
    
    private string CreateToken(string username)
    {
        var claims = new Claim[] {
            new ("username", username)
        };

        string? tokenKeyString = _config.GetSection("AppSettings:TokenKey").Value;

        SymmetricSecurityKey tokenKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                tokenKeyString != null ? tokenKeyString : ""
            )
        );

        SigningCredentials credentials = new SigningCredentials(
            tokenKey,
            SecurityAlgorithms.HmacSha512Signature
        );

        SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            SigningCredentials = credentials,
            Expires = DateTime.Now.AddDays(1)
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

        SecurityToken token = tokenHandler.CreateToken(descriptor);

        return tokenHandler.WriteToken(token);

    }
}