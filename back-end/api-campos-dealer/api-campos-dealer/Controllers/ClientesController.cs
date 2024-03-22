using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Domain.Model;
using api_campos_dealer.Repositories.Interfaces;
using api_campos_dealer.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api_campos_dealer.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class ClientesController : ControllerBase
    {
        private readonly IClientesRepository _clientesRepository;

        public ClientesController(IClientesRepository clientesRepository)
        {
            _clientesRepository = clientesRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var clientes = _clientesRepository.GetAll();

            return Ok(clientes);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add(Clientes clienteView)
        {
            _clientesRepository.Add(clienteView);

            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] ClientesDTO clientes, int id)
        {
            return Ok(await _clientesRepository.UpdateCliente(clientes, id));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _clientesRepository.DeleteCliente(id));
        }
    }
}
