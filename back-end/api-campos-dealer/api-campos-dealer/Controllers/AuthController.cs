using api_campos_dealer.Domain.DTOs;
using api_campos_dealer.Repositories.Interfaces;
using api_campos_dealer.ViewModel;
using API_Nox.Services;
using Microsoft.AspNetCore.Mvc;

namespace api_campos_dealer.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserRepository userService, ILogger<AuthController> logger)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDTO registrationModel)
        {
            if (string.IsNullOrEmpty(registrationModel.Name) || string.IsNullOrEmpty(registrationModel.Email) || string.IsNullOrEmpty(registrationModel.Password))
            {
                return BadRequest(new { Message = "Username, email, and password are required" });
            }

            var newUser = new UserViewModel();
            newUser.Id = Guid.NewGuid().ToString();
            newUser.Name = registrationModel.Name;
            newUser.Email = registrationModel.Email;
            newUser.Password = registrationModel.Password;

            _userService.AddUserAsync(newUser);
            return Ok(new { Message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserDTO loginModel)
        {
            UserViewModel user = await _userService.AuthenticateUser(loginModel.Email, loginModel.Password);

            if (user == null)
            {
                return BadRequest(new { Message = "Invalid email or password" });
            }

            var token = TokenService.GenerateToken(user);
            return Ok(new { Token = token, Message = "Authorized" });
        }

    }
}
