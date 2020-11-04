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
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _dbContext;

        public UserRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }


        public async Task<User> GetUserById(int id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }


        public async Task<IEnumerable<User>> GetUsersByEvent(int eventId)
        {
            var query = from User in _dbContext.Users
                        join UserInEvent in _dbContext.UserInEvents on User.Id equals UserInEvent.UserId
                        join Event in _dbContext.Events on UserInEvent.EventId equals Event.Id
                        where Event.Id == eventId
                        select User;

            var users = await query.ToListAsync();
            return users;
        }


        public async Task DeleteUser(User user)
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}
