using System;
namespace Events.Core.DTOs
{
    public class EventCreateDTO
    {
        public string EventName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
    }
}
