using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Events.Core.Entities;
using Events.Core.Interfaces;
using Events.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Events.Infrastructure.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly DatabaseContext _dbContext;

        public EventRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<IEnumerable<Event>> GetEvents()
        {
            return await _dbContext.Events.ToListAsync();
        }


        public async Task<Event> GetEventById(int id)
        {
            return await _dbContext.Events.FirstOrDefaultAsync(x => x.Id == id);
        }


        public async Task<IEnumerable<Event>> GetEventsByUser(int userId)
        {
            var query = from Event in _dbContext.Events
                         join UserInEvent in _dbContext.UserInEvents on Event.Id equals UserInEvent.EventId
                         join User in _dbContext.Users on UserInEvent.UserId equals User.Id
                         where User.Id == userId
                         select Event;

            var events = await query.ToListAsync();
            return events;
        }




        public async Task<Event> CreateEvent(Event evt)
        {
            await _dbContext.Events.AddAsync(evt);
            await _dbContext.SaveChangesAsync();
            return evt;
        }


        public async Task<bool> DeleteEvent(int eventId)
        {
            var eventToDelete = await _dbContext.Events.FirstOrDefaultAsync(x => x.Id == eventId);
            if (eventToDelete != null)
            {
                _dbContext.Events.Remove(eventToDelete);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
            /*_dbContext.Events.Remove(evt);
            await _dbContext.SaveChangesAsync();*/
        }

    }
}
