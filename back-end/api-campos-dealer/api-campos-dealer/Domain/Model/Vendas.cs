using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_campos_dealer.Domain.Model
{
    [Table("vendas")]
    public class Vendas
    {
        [Key]
        public int IdVenda { get; set; }
        public int IdCliente { get; set; }
        public int IdProduto { get; set; }
        public int QtdVenda { get; set; }
        public double VlrUnitarioVenda { get; set; }
        public DateTime DthVenda { get; set; }
        public double VlrTotalVenda { get; set; }

        public Vendas(int idVenda, int idCliente, int idProduto, int qtdVenda, double vlrUnitarioVenda, DateTime dthVenda, double vlrTotalVenda)
        {
            IdVenda = idVenda;
            IdCliente = idCliente;
            IdProduto = idProduto;
            QtdVenda = qtdVenda;
            VlrUnitarioVenda = vlrUnitarioVenda;
            DthVenda = dthVenda;
            VlrTotalVenda = vlrTotalVenda;
        }
    }
}
