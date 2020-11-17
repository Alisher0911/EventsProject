using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Events.Core.Entities;

namespace Events.Core.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEvents();
        Task<Event> GetEventById(int id);
        Task<IEnumerable<Event>> GetEventsByUser(int userId);

        Task<Event> CreateEvent(Event evt);
        Task<bool> DeleteEvent(int eventId);
    }
}
