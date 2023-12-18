/*using Domain.Models;
using Domain.ViewModels;
using Repository.Context;

namespace Repository.Services.CustomService.AttendenceService
{
    public class AttendanceService : IAttendanceService
    {
        private readonly MainDbcontext _dbContext;

        public AttendanceService(MainDbcontext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<AttendanceViewModel> GetAllAttendances()
        {
            var allAttendances = _dbContext.Attendances.ToList();
            return allAttendances.Select(MapToViewModelWithProductiveHours);
        }
        public IEnumerable<AttendanceViewModel> GetAttendanceByUserId(int userId)
        {
            var attendances = _dbContext.Attendances.Where(a => a.UserID == userId).ToList();
            return attendances.Select(MapToViewModelWithProductiveHours);
        }


        public AttendanceViewModel GetAttendanceById(int attendanceId)
        {
            var attendance = _dbContext.Attendances.FirstOrDefault(a => a.AttendanceID == attendanceId);
            return MapToViewModelWithProductiveHours(attendance);
        }

        private AttendanceViewModel MapToViewModelWithProductiveHours(Attendance attendance)
        {
            var viewModel = MapToViewModel(attendance);
            if (attendance != null)
            {
                viewModel.ProductiveHours = CalculateProductiveHours(attendance);
            }
            return viewModel;
        }

        public void ClockIn(int userId)
        {

            var openAttendance = _dbContext.Attendances
                .FirstOrDefault(a => a.UserID == userId && a.ClockOutDateTime == null);

            if (openAttendance == null)
            {

                var attendance = new Attendance
                {
                    UserID = userId,
                    ClockInDateTime = DateTime.Now,
                    ClockOutDateTime = DateTime.MinValue,
                    LunchBreakStart = DateTime.MinValue,
                    LunchBreakEnd = DateTime.MinValue
                };

                _dbContext.Attendances.Add(attendance);
                _dbContext.SaveChanges();
            }
        }



        public void ApplyLunchBreak(int attendanceId) =>
            UpdateAttendanceDateTime(attendanceId, (a, v) => a.LunchBreakStart = v, DateTime.Now);


        public void RemoveLunchBreak(int attendanceId) =>
            UpdateAttendanceDateTime(attendanceId, (a, v) => a.LunchBreakEnd = v, DateTime.Now);

        *//*  public void ClockOut(int attendanceId)
          {
              UpdateAttendanceDateTime(attendanceId, (a, v) => a.ClockOutDateTime = v, DateTime.Now);

              var attendance = _dbContext.Attendances.Find(attendanceId);
              if (attendance?.ClockOutDateTime != null)
              {
                  CalculateProductiveHours(attendance);
                  CalculateAndUpdateActualHours(attendance);
              }
          }*//*
        public void ClockOut(int userId)
        {
            UpdateAttendanceDateTime(userId, (a, v) => a.ClockOutDateTime = v, DateTime.Now);

            var attendance = _dbContext.Attendances.FirstOrDefault(a => a.UserID == userId);
            if (attendance?.ClockOutDateTime != null)
            {
                CalculateProductiveHours(attendance);
                CalculateAndUpdateActualHours(attendance);
            }
        }



        public double GetProductiveHours(int attendanceId)
        {
            var attendance = _dbContext.Attendances.Find(attendanceId);

            if (attendance != null && attendance.ClockOutDateTime != null)
            {
                double productiveHours = CalculateProductiveHours(attendance);
                return productiveHours;
            }

            return 0;
        }

        public string GetActualHours(int attendanceId)
        {
            var attendance = _dbContext.Attendances.Find(attendanceId);

            if (attendance != null && attendance.ClockOutDateTime != null && attendance.ClockInDateTime != null)
            {
                double actualHours = (attendance.ClockOutDateTime - attendance.ClockInDateTime).TotalHours;
                TimeSpan actualTimeSpan = TimeSpan.FromHours(actualHours);
                return actualTimeSpan.ToString(@"hh\:mm\:ss");
            }

            return "00:00:00";
        }

        private double CalculateProductiveHours(Attendance attendance)
        {
            DateTime clockOut = attendance.ClockOutDateTime;
            DateTime lunchBreakStart = attendance.LunchBreakStart;
            DateTime lunchBreakEnd = attendance.LunchBreakEnd;


            if (clockOut != DateTime.MinValue && lunchBreakStart != DateTime.MinValue && lunchBreakEnd != DateTime.MinValue)
            {
                TimeSpan lunchBreakDuration = lunchBreakEnd - lunchBreakStart;
                return (clockOut - attendance.ClockInDateTime - lunchBreakDuration).TotalHours;
            }
            else if (clockOut != DateTime.MinValue)
            {
                return (clockOut - attendance.ClockInDateTime).TotalHours;
            }

            return 0;
        }


        private void CalculateAndUpdateActualHours(Attendance attendance)
        {
            DateTime clockOut = attendance.ClockOutDateTime;
            double actualHours = (clockOut - attendance.ClockInDateTime).TotalHours;


            attendance.ActualHours = actualHours;
            _dbContext.SaveChanges();
        }

        *//* private void UpdateAttendanceDateTime(int attendanceId, Action<Attendance, DateTime> updateAction, DateTime value)
         {
             var attendance = _dbContext.Attendances.Find(attendanceId);

             if (attendance != null)
             {

                 updateAction(attendance, value);
                 _dbContext.SaveChanges();
             }
             else
             {
                 Console.WriteLine($"Attendance with ID {attendanceId} not found.");

             }
         }*//*
        private void UpdateAttendanceDateTime(int userId, Action<Attendance, DateTime> updateAction, DateTime value)
        {
            var attendance = _dbContext.Attendances.FirstOrDefault(a => a.UserID == userId);

            if (attendance != null)
            {
                updateAction(attendance, value);
                _dbContext.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Attendance for User ID {userId} not found.");
            }
        }
        private static AttendanceViewModel MapToViewModel(Attendance attendance) =>
           new AttendanceViewModel
           {
               AttendanceID = attendance.AttendanceID,
               UserID = attendance.UserID,
               ClockInDateTime = attendance.ClockInDateTime,
               ClockOutDateTime = attendance.ClockOutDateTime,
               LunchBreakStart = attendance.LunchBreakStart,
               LunchBreakEnd = attendance.LunchBreakEnd,
               ActualHours = attendance.ActualHours,
               ProductiveHours = attendance.ProductiveHours
           };
    }

}
*/