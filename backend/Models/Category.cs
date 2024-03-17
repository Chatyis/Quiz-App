namespace Models;

public partial class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = "";
    public string? FinalImage { get; set; }
    public string? Icon { get; set; }
    public string CategoryDescription { get; set; } = "";
    public string Color { get; set; } = "";
}