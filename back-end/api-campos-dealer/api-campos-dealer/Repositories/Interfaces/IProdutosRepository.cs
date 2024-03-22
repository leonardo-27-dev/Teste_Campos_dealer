using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;

namespace api_campos_dealer.Repositories.Interfaces
{
    public interface IProdutosRepository
    {
        void Add(Produtos produtos);

        List<Produtos> GetAll();

        Task<Produtos?> UpdateProduto(ProdutosDTO produtos, int id);

        Task<bool?> DeleteProduto(int id);
    }
}
