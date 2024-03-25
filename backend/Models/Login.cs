namespace Models;

public partial class Login
{
    public int UserCredentialsId { get; set; }
    public string UserLogin { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string PasswordSalt { get; set; } = "";
}