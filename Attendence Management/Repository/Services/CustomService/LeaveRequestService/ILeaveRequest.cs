using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Services.CustomService.LeaveRequestService
{
    public interface ILeaveRequest
    {
        IEnumerable<LeaveRequestViewModel> GetAllLeaveRequests();
        IEnumerable<LeaveRequestViewModel> GetLeaveRequestsByUserId(int userId);
        void CreateLeaveRequest(LeaveInsertViewModel leaveInsertViewModel);
        void UpdateLeaveRequest(int leaveRequestId, LeaveInsertViewModel leaveInsertViewModel);
        void DeleteLeaveRequest(int leaveRequestId);
    }
}
