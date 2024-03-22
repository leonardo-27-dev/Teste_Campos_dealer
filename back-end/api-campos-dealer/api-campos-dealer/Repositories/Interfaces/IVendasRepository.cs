using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;

namespace api_campos_dealer.Repositories.Interfaces
{
    public interface IVendasRepository
    {
        void Add(Vendas vendas);

        List<VendasDTO> GetAll();

        Task<Vendas?> UpdateVenda(VendasDTO produtos, int id);

        Task<bool?> DeleteVenda(int id);
    }
}
