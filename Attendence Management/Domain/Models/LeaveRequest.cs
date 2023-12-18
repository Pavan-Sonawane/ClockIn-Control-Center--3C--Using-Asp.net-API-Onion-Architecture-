using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class LeaveRequest
    {
        [Key]
        public int LeaveID { get; set; }
        public int UserID { get; set; }
        public string LeaveType { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
