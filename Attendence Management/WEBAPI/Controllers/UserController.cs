using Domain.Models;
using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using Repository.Repository;
using System.Linq.Expressions;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   /* [Authorize(Roles = "HR")]*/
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;
        private readonly MainDbcontext _context;

        public UsersController(IRepository<User> userRepository , MainDbcontext context)
        {
            _userRepository = userRepository;
            _context= context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAll();
            return Ok(users);
        }

        /*[HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }*/
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            // Retrieve attendance details for the user
            var attendanceDetails = _context.Attendances
                .Where(attendance => attendance.UserID == id)
                .ToList();

            // Retrieve all leave requests for the user
            var leaveRequests = _context.LeaveRequests
                .Where(leave => leave.UserID == id)
                .ToList();

            // You can now use 'attendanceDetails' and 'leaveRequests' in your response or combine them as needed
            var result = new
            {
                User = user,
                AttendanceDetails = attendanceDetails,
                LeaveRequests = leaveRequests
            };

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserInsertModel userInsertModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Username = userInsertModel.Username,
                Email = userInsertModel.Email,
                Password = userInsertModel.Password,
                Role = userInsertModel.Role
            };

            await _userRepository.Insert(user);

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserID }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserInsertModel userInsertModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userRepository.Get(id);

            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.Username = userInsertModel.Username;
            existingUser.Email = userInsertModel.Email;
            existingUser.Password = userInsertModel.Password;
            existingUser.Role = userInsertModel.Role;

            await _userRepository.Update(existingUser);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            await _userRepository.Delete(user);

            return NoContent();
        }
    }
}