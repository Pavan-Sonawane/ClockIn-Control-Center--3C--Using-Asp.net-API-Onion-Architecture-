using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        [JsonIgnore]
        public List<Attendance> Attendances { get; set; }
        public List<LeaveRequest> LeaveRequests { get; set; }
        public List<Event> Events { get; set; }
    }
}
