using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;

namespace api_campos_dealer.Repositories.Interfaces
{
    public interface IClientesRepository
    {
        void Add(Clientes clientes);

        List<Clientes> GetAll();

        Task<Clientes?> UpdateCliente(ClientesDTO clientes, int id);

        Task<bool?> DeleteCliente(int id);
    }
}
