using System;
using Events.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Events.Infrastructure.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<UserInEvent> UserInEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInEvent>()
                .HasKey(ue => new { ue.UserId, ue.EventId });
            modelBuilder.Entity<UserInEvent>()
                .HasOne(ue => ue.User)
                .WithMany(u => u.UserInEvents)
                .HasForeignKey(ue => ue.UserId);
            modelBuilder.Entity<UserInEvent>()
                .HasOne(ue => ue.Event)
                .WithMany(u => u.UserInEvents)
                .HasForeignKey(ue => ue.EventId);
        }
    }
}
