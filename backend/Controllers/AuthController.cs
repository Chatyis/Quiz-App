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

    [HttpPost("/logout")]
    public IActionResult RevokeToken()
    {
        if (!IsTokenValid())
        {
            return StatusCode(403, "Token invalid");
        }

        const string sql = @"update UserCredentials
        set LastTokenId = null
        where UserLogin = @UserLogin;";

        dataProvider.Execute(sql, new {UserLogin = User.FindFirst("username")?.Value});
        return Ok();
    }
    
    [HttpGet("RefreshToken")]
    public IActionResult RefreshToken()
    {
        if (!IsTokenValid())
        {
            return StatusCode(403,"Token invalid");
        }
        
        string usernameSql = @"
                SELECT UserLogin FROM UserCredentials WHERE UserLogin = @Username";

        string username = dataProvider.GetItem<string>(usernameSql,new {Username= User.FindFirst("username")?.Value });
        
        return Ok(new Dictionary<string, string>
        {
            {"token",CreateToken(username)}
        });
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
            Expires = DateTime.Now.AddSeconds(20)
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

        SecurityToken token = tokenHandler.CreateToken(descriptor);
        
        var tokenAsString = tokenHandler.WriteToken(token);

        SaveToken(username, tokenAsString);

        return tokenAsString;
    }

    private void SaveToken(string userLogin, string lastTokenId)
    {
        const string sql = @"update UserCredentials
        set LastTokenId = @LastTokenId
        where UserLogin = @UserLogin;";

        dataProvider.Execute(sql, new {UserLogin = userLogin, LastTokenId = lastTokenId});
    }

    private bool IsTokenValid()
    {        
        string tokenSql = @"
                SELECT LastTokenId FROM UserCredentials WHERE UserLogin = @Username";
        
        string lastTokenId = dataProvider.GetItem<string>(tokenSql,new {Username= User.FindFirst("username")?.Value });

        if (HttpContext.Request.Headers.TryGetValue("Authorization", out var headerAuth))
        {
            var jwtToken = headerAuth.First().Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)[1];
            if (lastTokenId != jwtToken)
            {
                return false;
            }

            if (new JwtSecurityToken(jwtToken).ValidTo < DateTime.UtcNow)
            {
                return false;
            }
        }

        return true;
    }
}