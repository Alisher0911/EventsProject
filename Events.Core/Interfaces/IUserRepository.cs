using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Events.Core.Entities;

namespace Events.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(int id);
        Task<IEnumerable<User>> GetUsersByEvent(int eventId);

        Task DeleteUser(User user);
    }
}
