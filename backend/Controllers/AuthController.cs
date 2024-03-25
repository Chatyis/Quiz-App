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
        string sql = @"SELECT [UserCredentialsId]
          ,[UserLogin]
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
        
        return Ok(new Dictionary<string, string>
        {
            {"token",CreateToken(user.UserLogin, user.UserCredentialsId.ToString())}
        });
    }
    
    [AllowAnonymous]
    [HttpPost("/register")]
    public IActionResult Register(Register register)
    {
        string userSql = @"SELECT 1
         FROM UserCredentials
         WHERE UserCredentials.UserLogin = @UserLogin";
        
        try
        {
            dataProvider.GetItem<Login>(userSql, new { UserLogin = register.UserLogin });
            
            return StatusCode(500, "User already exists!");
        }
        catch
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
    }

    [HttpPost("/logout")]
    public IActionResult RevokeToken()
    {
        const string sql = @"update UserCredentials
        set LastTokenId = null
        where UserCredentialsId = @UserId;";

        dataProvider.Execute(sql, new {UserLogin = User.FindFirst("userId")?.Value});
        return Ok();
    }
    
    [HttpGet("RefreshToken")]
    public IActionResult RefreshToken()
    {
        HttpContext.Request.Headers.TryGetValue("Authorization", out var headerAuth);
        var jwtTokenValue = headerAuth.First().Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)[1];
        var jwtToken = new JwtSecurityToken(jwtTokenValue);
        
        if (jwtToken.ValidTo.AddHours(23) < DateTime.UtcNow)
        {
            return StatusCode(403, "Token invalid");
        }

        // TODO I don't delete it right now idk what I meant with this part xD
        // string usernameSql = @"
        //         SELECT UserLogin FROM UserCredentials WHERE UserLogin = @Username";
        //
        // string username = dataProvider.GetItem<string>(usernameSql,new {Username= User.FindFirst("username")?.Value });
        
        return Ok(new Dictionary<string, string>
        {
            {"token",CreateToken(User.FindFirst("username")?.Value, User.FindFirst("userId")?.Value)}
        });
    }
    
    private string CreateToken(string username, string userId)
    {
        var claims = new Claim[] {
            new ("username", username),
            new ("userId", userId)
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
            Expires = DateTime.Now.AddMinutes(30)
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

        SecurityToken token = tokenHandler.CreateToken(descriptor);
        
        var tokenAsString = tokenHandler.WriteToken(token);

        SaveToken(userId, tokenAsString);

        return tokenAsString;
    }

    private void SaveToken(string userId, string lastTokenId)
    {
        const string sql = @"update UserCredentials
        set LastTokenId = @LastTokenId
        where UserCredentialsId = @UserId;";

        dataProvider.Execute(sql, new {UserId = userId, LastTokenId = lastTokenId});
    }
}