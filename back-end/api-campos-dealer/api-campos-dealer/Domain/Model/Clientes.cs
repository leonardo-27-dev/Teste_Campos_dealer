using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api_campos_dealer.Domain.Model
{
    [Table("clientes")]
    public class Clientes
    {
        [Key]
        public int IdCliente { get;  set; }
        public string nmCliente { get;  set; }
        public string nmCidade { get;  set; }

        public Clientes(int idCliente, string nmCliente, string nmCidade)
        {
            IdCliente = idCliente;
            this.nmCliente = nmCliente;
            this.nmCidade = nmCidade;
        }
    }
}