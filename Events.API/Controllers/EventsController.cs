﻿using System;
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
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository _events;
        private readonly IMapper _mapper;
        private readonly IUserInEventRepository _userInEvent;
        private readonly IUserRepository _users;

        public EventsController(IEventRepository events, IMapper mapper, IUserInEventRepository userInEvent, IUserRepository users)
        {
            _events = events;
            _mapper = mapper;
            _userInEvent = userInEvent;
            _users = users;
        }


        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var Events = await _events.GetEvents();
            return Ok(Events);
            //return Ok(_mapper.Map<IEnumerable<EventDTO>>(Events));
        }


        [AllowAnonymous]
        //[Authorize(Roles = "Student,Organizer")]
        [HttpGet("{eventId}")]
        public async Task<ActionResult<EventDTO>> getEventById(int eventId)
        {
            var Event = await _events.GetEventById(eventId);
            if (Event != null)
            {
                return Ok(_mapper.Map<EventDTO>(Event));
            }
            return NotFound();
        }


        //[Authorize(Roles = "Student,Organizer")]
        [AllowAnonymous]
        [HttpPost("addEvent")]
        public async Task<ActionResult<EventDTO>> CreateEvent(EventCreateDTO eventCreateDTO)
        {
            var Event = _mapper.Map<Event>(eventCreateDTO);
            await _events.CreateEvent(Event);
            return Ok(Event);
             
        }


        [Authorize(Roles = Role.Organizer)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int eventId)
        {
            var evt = await _events.GetEventById(eventId);
            if (evt == null)
            {
                return NotFound();
            }
            await _events.DeleteEvent(evt);
            return NoContent();
        }


        [AllowAnonymous]
        [HttpPost("{eventId}/join/{userId}")]
        public async Task<IActionResult> AddUserToEvent(UserInEventDTO newUserInEvent)
        {
            return Ok(await _userInEvent.AddUserToEvent(newUserInEvent));
        }
    }
}
