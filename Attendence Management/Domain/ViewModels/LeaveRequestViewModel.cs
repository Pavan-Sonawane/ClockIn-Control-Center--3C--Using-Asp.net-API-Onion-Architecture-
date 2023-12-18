using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class LeaveRequestViewModel
    {
        public int LeaveID { get; set; }
        public int UserID { get; set; }
        public string LeaveType { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }

        
        public List<UserViewModel> Users { get; set; }
    }
    public class LeaveInsertViewModel
    {
        public int LeaveID { get; set; }
        public int UserID { get; set; }
        public string LeaveType { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
    }

}
