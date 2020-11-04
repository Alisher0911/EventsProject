using System;
using System.Threading.Tasks;
using Events.Core.Entities;
using Events.Core.Interfaces;
using Events.Infrastructure.Context;

namespace Events.Infrastructure.Repositories
{
    public class UserInEventRepository : IUserInEventRepository
    {
        private readonly DatabaseContext _dbContext;

        public UserInEventRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task AddUserToEvent(User user, Event evt)
        {
            if (user == null || evt == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            UserInEvent userInEvent = new UserInEvent
            {
                EventId = evt.Id,
                UserId = user.Id
            };
            _dbContext.UserInEvents.Add(userInEvent);
            await _dbContext.SaveChangesAsync();
        }
    }
}
