using System;
using System.Threading.Tasks;
using Events.Core.DTOs;
using Events.Core.Entities;

namespace Events.Core.Interfaces
{
    public interface IUserInEventRepository
    {
        Task<UserInEventDTO> AddUserToEvent(UserInEventDTO userInEvent);
    }
}
