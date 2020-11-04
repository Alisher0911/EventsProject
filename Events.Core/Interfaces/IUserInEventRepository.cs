using System;
using System.Threading.Tasks;
using Events.Core.Entities;

namespace Events.Core.Interfaces
{
    public interface IUserInEventRepository
    {
        Task AddUserToEvent(User user, Event evt);
    }
}
