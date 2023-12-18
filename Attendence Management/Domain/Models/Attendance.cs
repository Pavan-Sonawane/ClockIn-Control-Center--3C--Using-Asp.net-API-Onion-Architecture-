using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Attendance
    {
        [Key]
        public int AttendanceID { get; set; }
        public int UserID { get; set; }
        public DateTime? ClockInDateTime { get; set; }
        public DateTime? ClockOutDateTime { get; set; }
        public DateTime? LunchBreakStart { get; set; }
        public DateTime? LunchBreakEnd { get; set; }

        public TimeSpan? ActualHours { get; set; }
        public TimeSpan? ProductiveHours { get; set; }

        public User User { get; set; }
    }
}

