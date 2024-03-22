using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api_campos_dealer.Domain.Model
{
    [Table("usuarios")]
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User() { } 

        public User(string Id, string Name, string Email, string Password)
        {
            this.Id = Id;
            this.Name = Name ?? throw new ArgumentNullException(nameof(Name));
            this.Email = Email ?? throw new ArgumentNullException(nameof(Email));
            this.Password = Password;
        }
    }
}