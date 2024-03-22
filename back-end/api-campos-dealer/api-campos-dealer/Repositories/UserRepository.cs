using api_campos_dealer.Domain.Model;
using api_campos_dealer.Infrastructure;
using api_campos_dealer.Repositories.Interfaces;
using api_campos_dealer.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace api_campos_dealer.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        public async Task<UserViewModel> AuthenticateUser(string email, string password)
        {
            User user = await _context.User.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "O usuário não existe");
            }

            return new UserViewModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password
            };
        }

        public async Task<UserViewModel> AddUserAsync(UserViewModel user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "O usuário não pode ser nulo");
            }

            User usuario = new User(user.Id, user.Name, user.Email, user.Password);

            await _context.User.AddAsync(usuario);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
