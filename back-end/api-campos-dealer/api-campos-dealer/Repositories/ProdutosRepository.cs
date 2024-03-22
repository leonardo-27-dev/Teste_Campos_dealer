using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;
using api_campos_dealer.Infrastructure;
using api_campos_dealer.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api_campos_dealer.Repositories
{
    public class ProdutosRepository : IProdutosRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        public void Add(Produtos produtos)
        {
            _context.Produtos.Add(produtos);
            _context.SaveChanges();
        }

        public List<Produtos> GetAll()
        {
            return _context.Produtos.ToList();
        }

        public async Task<Produtos?> GetProductByIdAsync(int id)
        {
            if (id == null)
            {
                throw new ArgumentException("The ID is invalid or non-existent", nameof(id));
            }

            return await _context.Produtos.FirstOrDefaultAsync(x => x.IdProduto == id);
        }

        public async Task<Produtos?> UpdateProduto(ProdutosDTO produtos, int id)
        {
            var existingProduct = await GetProductByIdAsync(id);

            if (existingProduct != null)
            {
                existingProduct.dscProduto = produtos.dscProduto;
                existingProduct.vlrUnitario = produtos.vlrUnitario;

                _context.Produtos.Update(existingProduct);
                await _context.SaveChangesAsync();
            }
            
            return existingProduct;
        }

        public async Task<bool?> DeleteProduto(int id)
        {
            var product = await GetProductByIdAsync(id);

            if (product != null)
            {
                _context.Produtos.Remove(product);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
