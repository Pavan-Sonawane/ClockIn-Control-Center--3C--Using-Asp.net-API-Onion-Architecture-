using Domain.Models;
using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Context;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AttendanceController : ControllerBase
    {
        private readonly MainDbcontext _context;

        public AttendanceController(MainDbcontext attendanceService)
        {
            _context = attendanceService;
        }
        [HttpGet("report/{userId}")]
        public IActionResult GetAttendanceReport(int userId)
        {
            
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            
            var attendanceRecords = _context.Attendances
                .Where(a => a.UserID == userId)
                .ToList();

          
            if (attendanceRecords.Count == 0)
            {
                return NotFound("No attendance records found for the user");
            }

         
            var report = attendanceRecords.Select(a => new
            {
                AttendanceID = a.AttendanceID,
                ClockInDateTime = a.ClockInDateTime,
                ClockOutDateTime = a.ClockOutDateTime,
                LunchBreakStart = a.LunchBreakStart,
                LunchBreakEnd = a.LunchBreakEnd,
                ActualHours = a.ActualHours,
                ProductiveHours = a.ProductiveHours
            });

            return Ok(report);
        }
       
        [HttpPost("clockin/{userId}")]
        public IActionResult ClockIn(int userId)
        {
          
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            
            var attendance = new Attendance
            {
                UserID = userId,
                ClockInDateTime = DateTime.Now
            };

            _context.Attendances.Add(attendance);
            _context.SaveChanges();

            return Ok("Clock In successful");
        }

        
        [HttpPost("clockout/{userId}")]
        public IActionResult ClockOut(int userId)
        {
           
            var attendance = _context.Attendances
                .Where(a => a.UserID == userId && a.ClockOutDateTime == null)
                .OrderByDescending(a => a.ClockInDateTime)
                .FirstOrDefault();

            if (attendance == null)
            {
                return NotFound("Clock In record not found");
            }

           
            attendance.ClockOutDateTime = DateTime.Now;

            
            CalculateProductiveHours(attendance);

            _context.SaveChanges();

            return Ok("Clock Out successful");
        }

        
        [HttpPost("lunchbreak/{userId}")]
        public IActionResult LunchBreak(int userId)
        {
           
            var attendance = _context.Attendances
                .Where(a => a.UserID == userId && a.LunchBreakEnd == null)
                .OrderByDescending(a => a.ClockInDateTime)
                .FirstOrDefault();

            if (attendance == null)
            {
                return NotFound("Clock In record not found");
            }

         
            attendance.LunchBreakStart = DateTime.Now;

            _context.SaveChanges();

            return Ok("Lunch Break started");
        }

     
        [HttpPost("endbreak/{userId}")]
        public IActionResult EndBreak(int userId)
        {
          
            var attendance = _context.Attendances
                .Where(a => a.UserID == userId && a.LunchBreakEnd == null)
                .OrderByDescending(a => a.LunchBreakStart)
                .FirstOrDefault();

            if (attendance == null)
            {
                return NotFound("Lunch Break record not found");
            }

            
            attendance.LunchBreakEnd = DateTime.Now;

          
            CalculateProductiveHours(attendance);

            _context.SaveChanges();

            return Ok("Lunch Break ended");
        }

       
        private void CalculateProductiveHours(Attendance attendance)
        {
            if (attendance.ClockInDateTime != null && attendance.ClockOutDateTime != null)
            {
              
                TimeSpan totalHours = attendance.ClockOutDateTime.Value - attendance.ClockInDateTime.Value;

              
                if (attendance.LunchBreakStart != null && attendance.LunchBreakEnd != null)
                {
                   
                    TimeSpan lunchBreakDuration = attendance.LunchBreakEnd.Value - attendance.LunchBreakStart.Value;

                    attendance.ProductiveHours = totalHours - lunchBreakDuration;

                    attendance.ActualHours = totalHours;
                }
                else
                {
                    
                    attendance.ProductiveHours = totalHours;
                    attendance.ActualHours = totalHours;
                }
            }
        }
    }
}
