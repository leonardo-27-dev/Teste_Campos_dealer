
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
    [Route("api/vendas")]
    public class VendasController : ControllerBase
    {
        private readonly IVendasRepository _vendasRepository;

        public VendasController(IVendasRepository vendasRepository)
        {
            _vendasRepository = vendasRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var vendas = _vendasRepository.GetAll();

            return Ok(vendas);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add(VendasViewModel vendasView)
        {
            var vendas = new Vendas(vendasView.IdVenda, vendasView.IdCliente, vendasView.IdProduto, vendasView.QtdVenda, vendasView.VlrUnitarioVenda, vendasView.DthVenda, vendasView.VlrTotalVenda);

            _vendasRepository.Add(vendas);

            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] VendasDTO vendas, int id)
        {
            return Ok(await _vendasRepository.UpdateVenda(vendas, id));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _vendasRepository.DeleteVenda(id));
        }
    }
}
