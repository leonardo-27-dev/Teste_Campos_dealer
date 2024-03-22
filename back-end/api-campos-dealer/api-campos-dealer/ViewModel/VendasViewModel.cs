namespace api_campos_dealer.ViewModel
{
    public class VendasViewModel
    {
        public int IdVenda { get; set; }
        public int IdCliente { get; set; }
        public int IdProduto { get; set; }
        public int QtdVenda { get; set; }
        public double VlrUnitarioVenda { get; set; }
        public DateTime DthVenda { get; set; }
        public double VlrTotalVenda { get; set; }
    }
}
