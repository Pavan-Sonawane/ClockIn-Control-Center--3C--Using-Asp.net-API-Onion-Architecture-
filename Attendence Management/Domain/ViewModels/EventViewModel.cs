using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class EventViewModel
    {
        public int EventId { get; set; }
        public int UserID { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public string EventType { get; set; }
        public string Mentor { get; set; }
        public string EventDatTime { get; set; }
        public string status { get; set; }
       
        public User User { get; set; }
    }
    public class EventInsertModel
    {
        public int EventId { get; set; }
        public int UserID { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public string EventType { get; set; }
        public string Mentor { get; set; }
        public string EventDatTime { get; set; }
        public string status { get; set; }
    }
    

}
