using System.Text;
using JWT.Algorithms;
using JWT.Builder;

namespace backend.Services;

public class AuthService
{
    private static readonly string _secret = "Superlongsupersecret!";
    // https://bulldogjob.pl/readme/bezpieczna-implementacja-json-web-tokens-jwt-w-c
    public static string GenerateAccessToken(string username)
    {
        return new JwtBuilder()
            .WithAlgorithm(new HMACSHA256Algorithm())
            .WithSecret(Encoding.ASCII.GetBytes(_secret))
            .AddClaim("exp", DateTimeOffset.UtcNow.AddMinutes(10).ToUnixTimeSeconds())
            .AddClaim("username", username)
            .Encode();
    }
    
    public static IDictionary<string, object> VerifyToken(string token)
    {
        return new JwtBuilder()
            .WithSecret(Encoding.ASCII.GetBytes(_secret))
            .MustVerifySignature()
            .Decode<IDictionary<string, object>>(token);
    }
}