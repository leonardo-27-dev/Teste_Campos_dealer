using System.Threading.Tasks;
using api_campos_dealer.Domain.Model;
using api_campos_dealer.ViewModel;

namespace api_campos_dealer.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<UserViewModel> AddUserAsync(UserViewModel newUser);

        Task<UserViewModel> AuthenticateUser(string email, string password);
    }
}
