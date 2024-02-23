namespace Models;

public partial class Register
{
    public string UserLogin { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string PasswordSalt { get; set; } = "";
}