using System;
using System.Collections.Generic;

namespace Events.Core.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }

        public IList<UserInEvent> UserInEvents { get; set; } = new List<UserInEvent>();
    }
}
