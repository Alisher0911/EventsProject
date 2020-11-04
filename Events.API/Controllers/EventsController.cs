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
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository _events;
        private readonly IMapper _mapper;

        public EventsController(IEventRepository events, IMapper mapper)
        {
            _events = events;
            _mapper = mapper;
        }


        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetEvents()
        {
            var Events = await _events.GetEvents();
            return Ok(_mapper.Map<IEnumerable<EventDTO>>(Events));
        }


        [Authorize(Roles = "Student,Organizer")]
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
        [HttpGet("users/{userId}/participatedEvents")]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetEventsByUser(int userId)
        {
            var events = await _events.GetEventsByUser(userId);
            if (events != null)
            {
                return Ok(_mapper.Map<IEnumerable<EventDTO>>(events));
            }
            return NotFound();
        }


        //[Authorize(Roles = "Student,Organizer")]
        [HttpPost("add-event")]
        public async Task<ActionResult<EventDTO>> CreateEvent(EventCreateDTO eventCreateDTO)
        {
            var Event = _mapper.Map<Event>(eventCreateDTO);
            await _events.CreateEvent(Event);
            return Ok(Event);
             
        }


        //[Authorize(Roles = Role.Organizer)]
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
    }
}
