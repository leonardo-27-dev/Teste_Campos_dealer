using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;
using api_campos_dealer.Infrastructure;
using api_campos_dealer.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api_campos_dealer.Repositories
{
    public class VendasRepository : IVendasRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        public void Add(Vendas vendas)
        {
            _context.Vendas.Add(vendas);
            _context.SaveChanges();
        }

        public List<VendasDTO> GetAll()
        {
            var vendas = _context.Vendas.ToList();
            var vendasDTO = new List<VendasDTO>();

            foreach (var venda in vendas)
            {
                var cliente = _context.Clientes.FirstOrDefault(x => x.IdCliente == venda.IdCliente);
                var produto = _context.Produtos.FirstOrDefault(x => x.IdProduto == venda.IdProduto);

                var vendaDTO = new VendasDTO
                {
                    // Defina aqui as propriedades do objeto VendasDTO
                    IdVenda = venda.IdVenda,
                    IdCliente = venda.IdCliente,
                    IdProduto = venda.IdProduto,
                    QtdVenda = venda.QtdVenda,
                    VlrUnitarioVenda = venda.VlrUnitarioVenda,
                    DthVenda = venda.DthVenda,
                    VlrTotalVenda = venda.VlrTotalVenda
                };

                if (cliente != null)
                    vendaDTO.nmCliente = cliente.nmCliente;

                if (produto != null)
                    vendaDTO.nmProduto = produto.dscProduto;

                vendasDTO.Add(vendaDTO);
            }

            return vendasDTO;
        }


        public async Task<Vendas?> GetVendasByIdAsync(int id)
        {
            if (id == null)
            {
                throw new ArgumentException("The ID is invalid or non-existent", nameof(id));
            }

            return await _context.Vendas.FirstOrDefaultAsync(x => x.IdVenda == id);
        }

        public async Task<Vendas?> UpdateVenda(VendasDTO vendas, int id)
        {
            var existingVenda = await GetVendasByIdAsync(id);

            if (existingVenda != null)
            {
                existingVenda.IdCliente = vendas.IdCliente;
                existingVenda.IdProduto = vendas.IdProduto;
                existingVenda.QtdVenda = vendas.QtdVenda;
                existingVenda.VlrUnitarioVenda = vendas.VlrUnitarioVenda;
                existingVenda.DthVenda = vendas.DthVenda;
                existingVenda.VlrTotalVenda = vendas.VlrTotalVenda;

                _context.Vendas.Update(existingVenda);
                await _context.SaveChangesAsync();
            }

            return existingVenda;
        }

        public async Task<bool?> DeleteVenda(int id)
        {
            var venda = await GetVendasByIdAsync(id);

            if (venda != null)
            {
                _context.Vendas.Remove(venda);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
