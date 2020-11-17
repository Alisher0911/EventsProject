using System.Threading.Tasks;
using AutoMapper;
using Events.Core.DTOs;
using Events.Core.Entities;
using Events.Core.Interfaces;
using Events.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Events.Infrastructure.Repositories
{
    public class UserInEventRepository : IUserInEventRepository
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;

        public UserInEventRepository(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        public async Task<UserInEventDTO> AddUserToEvent(UserInEventDTO userInEvent)
        {
            User user = await _dbContext.Users
                .Include(u => u.UserInEvents).ThenInclude(ue => ue.Event)
                .FirstOrDefaultAsync(u => u.Id == userInEvent.UserId);

            Event evt = await _dbContext.Events
                .FirstOrDefaultAsync(e => e.Id == userInEvent.EventId);

            UserInEvent newUserInEvent = new UserInEvent
            {
                Event = evt,
                User = user
            };
            await _dbContext.UserInEvents.AddAsync(newUserInEvent);
            await _dbContext.SaveChangesAsync();
            return userInEvent;
        }
    }
}
