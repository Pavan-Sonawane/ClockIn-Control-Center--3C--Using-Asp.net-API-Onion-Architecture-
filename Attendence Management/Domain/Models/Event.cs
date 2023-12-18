using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public  class Event
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public string EventType { get; set; }
        public string Mentor { get; set; }
       
        public string EventDatTime { get; set; }
        public string status { get; set; }

        public User User { get; set; }
        public int UserID { get; set; }
    }
}
