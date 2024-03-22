using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;
using api_campos_dealer.Infrastructure;
using api_campos_dealer.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api_campos_dealer.Repositories
{
    public class ClientesRepository : IClientesRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        public void Add(Clientes clientes)
        {
            _context.Clientes.Add(clientes);
            _context.SaveChanges();
        }

        public List<Clientes> GetAll() 
        {
            return _context.Clientes.ToList();
        }

        public async Task<Clientes?> GetUserByIdAsync(int id)
        {
            if (id == null)
            {
                throw new ArgumentException("The ID is invalid or non-existent", nameof(id));
            }

            return await _context.Clientes.FirstOrDefaultAsync(x => x.IdCliente == id);
        }

        public async Task<Clientes?> UpdateCliente(ClientesDTO user, int id)
        {
            var existingUser = await GetUserByIdAsync(id);

            if (existingUser != null)
            {
                existingUser.nmCliente = user.nmCliente;
                existingUser.nmCidade = user.nmCidade;

                _context.Clientes.Update(existingUser);
                await _context.SaveChangesAsync();
            }

            return existingUser;
        }

        public async Task<bool?> DeleteCliente(int id)
        {
            var user = await GetUserByIdAsync(id);

            if (user != null)
            {
                _context.Clientes.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
