using System;
using System.Linq;
using System.Threading.Tasks;
using Events.Core.Entities;
using Events.Core.Interfaces;
using Events.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Events.Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext _dbcontext;

        public AuthRepository(DatabaseContext dbcontext)
        {
            _dbcontext = dbcontext;
        }


        public async Task<User> Register(User user, string password)
        {
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _dbcontext.Users.AddAsync(user);
            await _dbcontext.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }



        public async Task<User> Login(string email, string password)
        {
            var user = await _dbcontext.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null || VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt) == false)
            {
                return null;
            }
            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }



        public async Task<bool> UserExists(string email)
        {
            return await _dbcontext.Users.AnyAsync(x => x.Email == email);
        }
    }
}
