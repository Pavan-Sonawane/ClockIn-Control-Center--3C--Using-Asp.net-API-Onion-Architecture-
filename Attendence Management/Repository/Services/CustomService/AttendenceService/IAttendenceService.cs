/*using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Services.CustomService.AttendenceService
{
    *//*  public interface IAttendanceService
      {
          IEnumerable<AttendanceViewModel> GetAllAttendances();
          AttendanceViewModel GetAttendanceById(int attendanceId);
          void ApplyLunchBreak(int id);
          void RemoveLunchBreak(int id);
          void ClockIn(int id);
          void ClockOut(int id);
          double GetProductiveHours(int id);
          string GetActualHours(int id);


      }*//*
    public interface IAttendanceService
    {
        IEnumerable<AttendanceViewModel> GetAllAttendances();
        IEnumerable<AttendanceViewModel> GetAttendanceByUserId(int userId);
        AttendanceViewModel GetAttendanceById(int attendanceId);
        *//*  void ApplyLunchBreak(int id);*//*
        void ApplyLunchBreak(int userId);

        void RemoveLunchBreak(int id);
        *//* void ClockIn(int id);
         void ClockOut(int id);*//*
        void ClockIn(int userId);
        void ClockOut(int userId);
        double GetProductiveHours(int id);
        string GetActualHours(int id);
    }

}
*/