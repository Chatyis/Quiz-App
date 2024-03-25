using Microsoft.Data.SqlClient;
using Dapper;

namespace Data;

public class DataProviderDapper
{
    const string connectionString = "Server=localhost;Database=QuizApp;persist security info=True;Integrated Security = SSPI;TrustServerCertificate=True;";

    public T GetItem<T>(string sql, object? param = null)
    {
        var connection = new SqlConnection(connectionString);
        return connection.QuerySingle<T>(sql, param);
    }

    public IEnumerable<T> GetItems<T>(string sql, object? param = null)
    {
        var connection = new SqlConnection(connectionString);
        return connection.Query<T>(sql, param);
    }

    public bool Execute(string sql, object? param = null)
    {
        var connection = new SqlConnection(connectionString);
        return connection.Execute(sql, param) > 0;
    }

    public bool ExecuteScalar(string sql, object? param = null)
    {
        var connection = new SqlConnection(connectionString);
        return connection.ExecuteScalar<bool>(sql, param);
    }
}