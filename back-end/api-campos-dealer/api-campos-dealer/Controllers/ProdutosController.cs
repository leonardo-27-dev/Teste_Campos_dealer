using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;
using api_campos_dealer.Repositories;
using api_campos_dealer.Repositories.Interfaces;
using api_campos_dealer.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api_campos_dealer.Controllers
{
    [ApiController]
    [Route("api/produtos")]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutosRepository _produtosRepository;

        public ProdutosController(IProdutosRepository produtosRepository)
        {
            _produtosRepository = produtosRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var clientes = _produtosRepository.GetAll();

            return Ok(clientes);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add(ProdutosViewModel produtoView)
        {
            var produtos = new Produtos(produtoView.IdProduto, produtoView.dscProduto, produtoView.vlrUnitario);

            _produtosRepository.Add(produtos);

            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] ProdutosDTO produtos, int id)
        {
            return Ok(await _produtosRepository.UpdateProduto(produtos, id));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _produtosRepository.DeleteProduto(id));
        }
    }
}
