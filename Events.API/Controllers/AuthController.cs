using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Events.Core.DTOs;
using Events.Core.Entities;
using Events.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Events.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _auth;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthRepository auth, IConfiguration configuration)
        {
            _auth = auth;
            _configuration = configuration;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO userRegisterDTO)
        {
            userRegisterDTO.Email = userRegisterDTO.Email.ToLower();

            if (await _auth.UserExists(userRegisterDTO.Email))
            {
                return BadRequest("This Email is already used!");
            }

            var user = new User
            {
                FullName = userRegisterDTO.FullName,
                Email = userRegisterDTO.Email,
                PhoneNumber = userRegisterDTO.PhoneNumber,
                Role = userRegisterDTO.Role
            };

            var created = await _auth.Register(user, userRegisterDTO.Password);
            return StatusCode(201);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        {
            var user = await _auth.Login(userLoginDTO.Email.ToLower(), userLoginDTO.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim("id", user.Id.ToString()),
                new Claim("fullName", user.FullName),
                new Claim("email", user.Email),
                new Claim("phoneNumber", user.PhoneNumber),
                new Claim("role", user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = "http://localhost:5001",
                Audience = "http://localhost:5001",
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(3),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new { Token = tokenString });

            /*var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });*/
        }
    }
}
