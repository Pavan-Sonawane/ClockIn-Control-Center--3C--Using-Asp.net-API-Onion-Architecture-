using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Services.CustomService.LeaveRequestService;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequest _leaveRequestService;

        public LeaveRequestController(ILeaveRequest leaveRequestService)
        {
            _leaveRequestService = leaveRequestService ?? throw new ArgumentNullException(nameof(leaveRequestService));
        }

        [HttpGet]
        public IActionResult GetAllLeaveRequests()
        {
            var leaveRequests = _leaveRequestService.GetAllLeaveRequests();
            return Ok(leaveRequests);
        }

        [HttpGet("{userId}")]
        public IActionResult GetLeaveRequestsByUserId(int userId)
        {
            var leaveRequests = _leaveRequestService.GetLeaveRequestsByUserId(userId);
            return Ok(leaveRequests);
        }


        [HttpPost]
        public IActionResult CreateLeaveRequest([FromBody] LeaveInsertViewModel leaveInsertViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _leaveRequestService.CreateLeaveRequest(leaveInsertViewModel);
            return Ok("Leave request created successfully");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateLeaveRequest(int id, [FromBody] LeaveInsertViewModel leaveInsertViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _leaveRequestService.UpdateLeaveRequest(id, leaveInsertViewModel);
            return Ok("Leave request updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLeaveRequest(int id)
        {
            _leaveRequestService.DeleteLeaveRequest(id);
            return Ok("Leave request deleted successfully");
        }
    }
}
