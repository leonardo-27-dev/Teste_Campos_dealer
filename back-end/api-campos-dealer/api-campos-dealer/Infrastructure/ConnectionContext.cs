using api_campos_dealer.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace api_campos_dealer.Infrastructure
{
    public class ConnectionContext : DbContext
    {
        public DbSet<Vendas> Vendas { get; set; }
        public DbSet<Clientes> Clientes { get; set; }
        public DbSet<Produtos> Produtos { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer("Data Source=teste-campos-database.database.windows.net;Initial Catalog=testedatabasecampos;Persist Security Info=True;User ID=sqladmin;Password=Furia@2024_#;Encrypt=False;Trust Server Certificate=True");
    }
}
