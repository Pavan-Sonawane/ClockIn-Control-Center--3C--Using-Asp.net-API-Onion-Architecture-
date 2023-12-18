using Domain.Models;
using Domain.ViewModels;
using Repository.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Services.CustomService.LeaveRequestService
{
    public class LeaveRequestService : ILeaveRequest
    {
        private readonly MainDbcontext _dbContext;

        public LeaveRequestService(MainDbcontext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<LeaveRequestViewModel> GetAllLeaveRequests()
        {
            var allLeaveRequests = _dbContext.LeaveRequests.ToList();
            return allLeaveRequests.Select(MapToViewModel);
        }

        public IEnumerable<LeaveRequestViewModel> GetLeaveRequestsByUserId(int userId)
        {
            var leaveRequests = _dbContext.LeaveRequests
                .Where(l => l.UserID == userId)
                .ToList();

            return leaveRequests.Select(MapToViewModel);
        }



        public void CreateLeaveRequest(LeaveInsertViewModel leaveInsertViewModel)
        {
            var leaveRequest = MapToModel(leaveInsertViewModel);
            _dbContext.LeaveRequests.Add(leaveRequest);
            _dbContext.SaveChanges();
        }

        public void UpdateLeaveRequest(int leaveRequestId, LeaveInsertViewModel leaveInsertViewModel)
        {
            var leaveRequest = _dbContext.LeaveRequests.Find(leaveRequestId);
            if (leaveRequest != null)
            {
                MapToModel(leaveInsertViewModel, leaveRequest);
                _dbContext.SaveChanges();
            }
            else
            {
                // Handle not found scenario
            }
        }

        public void DeleteLeaveRequest(int leaveRequestId)
        {
            var leaveRequest = _dbContext.LeaveRequests.Find(leaveRequestId);
            if (leaveRequest != null)
            {
                _dbContext.LeaveRequests.Remove(leaveRequest);
                _dbContext.SaveChanges();
            }
            else
            {
                // Handle not found scenario
            }
        }

        private static LeaveRequestViewModel MapToViewModel(LeaveRequest leaveRequest)
        {
            return leaveRequest != null ? new LeaveRequestViewModel
            {
                LeaveID = leaveRequest.LeaveID,
                UserID = leaveRequest.UserID,
                LeaveType = leaveRequest.LeaveType,
                Description=leaveRequest.Description,
                StartDate = leaveRequest.StartDate,
                EndDate = leaveRequest.EndDate,
                Status = leaveRequest.Status,
                Users = null // Assuming Users is not relevant here
            } : null;
        }

        private static LeaveRequest MapToModel(LeaveInsertViewModel leaveInsertViewModel)
        {
            return new LeaveRequest
            {
                LeaveID = leaveInsertViewModel.LeaveID,
                UserID = leaveInsertViewModel.UserID,
                LeaveType = leaveInsertViewModel.LeaveType,
                Description=leaveInsertViewModel.Description,
                StartDate = leaveInsertViewModel.StartDate,
                EndDate = leaveInsertViewModel.EndDate,
                Status = leaveInsertViewModel.Status
            };
        }

        private static void MapToModel(LeaveInsertViewModel leaveInsertViewModel, LeaveRequest leaveRequest)
        {
            leaveRequest.LeaveID = leaveInsertViewModel.LeaveID;
            leaveRequest.UserID = leaveInsertViewModel.UserID;
            leaveRequest.LeaveType = leaveInsertViewModel.LeaveType;
            leaveRequest.Description = leaveInsertViewModel.Description;
            leaveRequest.StartDate = leaveInsertViewModel.StartDate;
            leaveRequest.EndDate = leaveInsertViewModel.EndDate;
            leaveRequest.Status = leaveInsertViewModel.Status;
        }
    }
}
