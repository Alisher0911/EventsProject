using System;
using AutoMapper;
using Events.Core.DTOs;
using Events.Core.Entities;

namespace Events.Core.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>();
        }
    }
}
