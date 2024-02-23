namespace Models;

public partial class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = "";
    public string? FinalImage { get; set; }
    public string? Icon { get; set; }
}