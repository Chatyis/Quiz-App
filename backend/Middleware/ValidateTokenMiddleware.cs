using System.IdentityModel.Tokens.Jwt;
using Data;

namespace backend.Middleware;

public class ValidateTokenMiddleware
{
    private readonly RequestDelegate _next;
    DataProviderDapper dataProvider = new DataProviderDapper();

    public ValidateTokenMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        string tokenSql = @"
                SELECT LastTokenId FROM UserCredentials WHERE UserLogin = @Username";

        if (context.Request.Headers.TryGetValue("Authorization", out var headerAuth))
        {
            var jwtTokenValue = headerAuth.First().Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)[1];
            var jwtToken = new JwtSecurityToken(jwtTokenValue);

            string lastTokenId = dataProvider.GetItem<string>(tokenSql,new {Username= jwtToken.Claims.FirstOrDefault(claim => claim.Type == "username").Value });

            if (lastTokenId != jwtTokenValue || jwtToken.ValidTo < DateTime.UtcNow)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Token invalid");
                return;
            }
        }

        await _next(context);
    }
}

public static class ValidateTokenMiddlewareExtensions
{
    public static IApplicationBuilder UseTokenValidate(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ValidateTokenMiddleware>();
    }
}