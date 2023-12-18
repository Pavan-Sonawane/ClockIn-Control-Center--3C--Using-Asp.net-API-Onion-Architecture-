using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class AttendanceViewModel
    {
        public int AttendanceID { get; set; }
        public int UserID { get; set; }
        public DateTime ClockInDateTime { get; set; }
        public DateTime ClockOutDateTime { get; set; }
        public DateTime LunchBreakStart { get; set; }
        public DateTime LunchBreakEnd { get; set; }
        public double ActualHours { get; set; }
        public double ProductiveHours { get; set; }

       
        public List<UserViewModel> Users { get; set; }
    }
    public class AttendanceInsertViewModel
    {
        public int AttendanceID { get; set; }
        public int UserID { get; set; }
        public double ActualHours { get; set; }
        public double ProductiveHours { get; set; }
    }

    public class ProductiveAttendanceViewModel
    {
        public int AttendanceID { get; set; }
        public int UserID { get; set; }
        public DateTime ClockInDateTime { get; set; }
        public DateTime ClockOutDateTime { get; set; }
        public DateTime LunchBreakStart { get; set; }
        public DateTime LunchBreakEnd { get; set; }
        public double ActualHours { get; set; }
        public string ProductiveHours { get; set; }
    }


    }
