namespace api_campos_dealer.Domain.DTOs
{
    public class VendasDTO
    {
        public int IdVenda { get; set; }
        public int IdCliente { get; set; }
        public int IdProduto { get; set; }
        public string? nmCliente { get; set; }
        public string? nmProduto { get; set; }
        public int QtdVenda { get; set; }
        public double VlrUnitarioVenda { get; set; }
        public DateTime DthVenda { get; set; }
        public double VlrTotalVenda { get; set; }
    }
}
