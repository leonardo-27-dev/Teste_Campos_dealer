using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api_campos_dealer.Domain.Model
{
    [Table("produtos")]
    public class Produtos
    {
        [Key]
        public int IdProduto { get; set; }
        public string dscProduto { get; set; }
        public double vlrUnitario { get; set; }

        public Produtos(int idProduto, string dscProduto, double vlrUnitario)
        {
            IdProduto = idProduto;
            this.dscProduto = dscProduto;
            this.vlrUnitario = vlrUnitario;
        }
    }
}
