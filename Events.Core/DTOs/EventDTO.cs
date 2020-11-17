using System;
namespace Events.Core.DTOs
{
    public class EventDTO
    {
        public string EventName { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public DateTime StartDate { get; set; }
        public string Image { get; set; }
    }
}
