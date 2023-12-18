// System Imports
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

// Project Imorts
using Domain.Models;
using System.Security.Claims;

namespace WebApi.Middleware.Auth
{
    public class JWTAuthManager : IJWTAuthManager
    {
        /* private readonly IConfiguration _configuration;

         public JWTAuthManager(IConfiguration configuration)
         {
             _configuration = configuration;
         }

         public string GenerateJWT(User user)
         {
             var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
             var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
             var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
               _configuration["Jwt:Issuer"],
               expires: DateTime.Now.AddMinutes(120),
               signingCredentials: credentials);

             return new JwtSecurityTokenHandler().WriteToken(token);     
         }*/
        private readonly IConfiguration _configuration;

        public JWTAuthManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /*   public string GenerateJWT(User user)
           {
               var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
               var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

               var claims = new List<Claim>
       {
           new Claim(ClaimTypes.Name, user.Username),
           new Claim(ClaimTypes.Email, user.Email),
           new Claim(ClaimTypes.Role, user.Role),

       };

               var token = new JwtSecurityToken(
                   _configuration["Jwt:Issuer"],
                   _configuration["Jwt:Issuer"],
                   claims,
                   expires: DateTime.Now.AddMinutes(120),
                   signingCredentials: credentials
               );

               return new JwtSecurityTokenHandler().WriteToken(token);
           }*/
        public string GenerateJWT(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role), // Add the user's role as a claim
        new Claim("userID", user.UserID.ToString()) // Add the user's ID as a claim
    };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
