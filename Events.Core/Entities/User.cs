using System;
using System.Collections.Generic;

namespace Events.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }

        public IList<UserInEvent> UserInEvents { get; set; }

        
    }
}
