using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Events.Core.DTOs;
using Events.Core.Entities;
using Events.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Events.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserRepository _users;
        private readonly IEventRepository _events;
        private readonly IUserInEventRepository _userInEvent;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository users, IEventRepository events, IUserInEventRepository userInEvent, IMapper mapper)
        {
            _users = users;
            _events = events;
            _userInEvent = userInEvent;
            _mapper = mapper;
        }


        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _users.GetUsers();
            return Ok(_mapper.Map<IEnumerable<UserDTO>>(users));
        }


        [Authorize(Roles = "Student,Organizer")]
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserDTO>> GetUserById(int userId)
        {
            var user = await _users.GetUserById(userId);
            if (user != null)
            {
                return Ok(_mapper.Map<UserDTO>(user));
            }
            return NotFound();
        }


        [Authorize(Roles = "Student,Organizer")]
        [HttpGet("{eventId}/userInEvent")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsersByEvent(int eventId)
        {
            var users = await _users.GetUsersByEvent(eventId);
            if (users != null)
            {
                return Ok(_mapper.Map<IEnumerable<UserDTO>>(users));
            }
            return NotFound();
        }


        [Authorize(Roles = Role.Student)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int userId)
        {
            var user = await _users.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }
            await _users.DeleteUser(user);
            return NoContent();
        }


        [Authorize(Roles = Role.Student)]
        [HttpPost("{userId}/addUserToEvent/{eventId}")]
        public async Task<ActionResult> AddUserToEvent(int userId, int eventId)
        {
            var user = await _users.GetUserById(userId);
            var evt = await _events.GetEventById(eventId);
            if (user == null || evt == null)
            {
                return NotFound();
            }
            await _userInEvent.AddUserToEvent(user, evt);
            return NoContent();
        }
    }
}
