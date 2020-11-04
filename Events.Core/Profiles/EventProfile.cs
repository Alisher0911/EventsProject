using System;
using AutoMapper;
using Events.Core.DTOs;
using Events.Core.Entities;

namespace Events.Core.Profiles
{
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Event, EventDTO>();
            CreateMap<EventCreateDTO, Event>();
        }
    }
}
