using System;
namespace Events.Core.Entities
{
    public class UserInEvent
    {
        public int EventId { get; set; }
        public Event Event { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
