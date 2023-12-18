using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class UserViewModel
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
       
        public string Role { get; set; }

       
    }
    public class UserInsertModel
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
      
        public string Role { get; set; }

    }
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}
