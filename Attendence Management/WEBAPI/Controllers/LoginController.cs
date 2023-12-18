using Domain.Helpers;
using Domain.Models;
using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Repository.common;
using Repository.Context;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Middleware.Auth;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MainDbcontext _context;
        private readonly IJWTAuthManager _authManager;

        public LoginController(MainDbcontext context, IJWTAuthManager authManager)
        {
            _context = context;
            _authManager = authManager;
        }

        [HttpPost("LoginUser")]
        [AllowAnonymous]
        public async Task<IActionResult> UserLogin(LoginModel loginUser)
        {
            Response<string> response = new Response<string>();

            if (ModelState.IsValid)
            {
                // Fetch user from the database based on username
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == loginUser.Username);

                if (user != null && user.Password == loginUser.Password)
                {
                    // Valid credentials, generate JWT token
                    response.Message = _authManager.GenerateJWT(user);
                    response.Status = (int)HttpStatusCode.OK;
                    return Ok(response);
                }

                else
                {
                    // Invalid credentials
                    response.Message = "Invalid Username / Password, Please Enter Valid Credentials...!";
                    response.Status = (int)HttpStatusCode.NotFound;
                    return NotFound(response);
                }
            }
            else
            {
                // Invalid login information
                response.Message = "Invalid Login Information, Please Enter Valid Credentials...!";
                response.Status = (int)HttpStatusCode.NotAcceptable;
                return BadRequest(response);
            }
        }
        [HttpGet("VerifyAndProcessToken")]
        public IActionResult VerifyAndProcessToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Token is missing.");
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes("24a412bc-5b69-4ef4-rda5-2599541067b5"); // Replace with your actual secret key
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "https://localhost:5001", // Update to match the actual issuer value
                    ValidAudience = "https://localhost:5001",
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero // You can adjust the tolerance for the token's expiration
                };


                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

                // Here, you can access the user's claims, roles, etc. from the principal
                var username = principal.FindFirst(ClaimTypes.Name)?.Value;
                var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                var role = principal.FindFirst(ClaimTypes.Role)?.Value;

                // Your logic to grant access based on claims/roles
                // Your logic to grant access based on claims/roles
                if (role == "Employee")
                {
                    // Access granted for employees
                    var response = new Response<string>
                    {
                        Message = "Employee",
                        Status = (int)HttpStatusCode.OK
                    };
                    return Ok(response);
                }
                else if (role == "HR")
                {
                    // Access granted for HR
                    var response = new Response<string>
                    {
                        Message = "HR",
                        Status = (int)HttpStatusCode.OK
                    };
                    return Ok(response);
                }
                else
                {
                    // Access denied for other roles
                    var response = new Response<string>
                    {
                        Message = "Access denied.",
                        Status = (int)HttpStatusCode.Forbidden
                    };
                    return Forbid("Bearer");
                }

            }
            catch (SecurityTokenException ex)
            {
                var response = new Response<string>
                {
                    Message = $"Token validation failed: {ex.Message}",
                    Status = (int)HttpStatusCode.BadRequest
                };
                return BadRequest(response);
            }
        }
    }
}
