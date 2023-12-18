/*using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Context
{
    public class MainDbcontext : DbContext
    {
        public MainDbcontext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {



            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.User)
                .WithMany(u => u.Attendances)
                .HasForeignKey(a => a.UserID);

            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.User)
                .WithMany(u => u.LeaveRequests)
                .HasForeignKey(lr => lr.UserID);



            base.OnModelCreating(modelBuilder);
        }

    }
}*/
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Context
{
    public class MainDbcontext : DbContext
    {
        public MainDbcontext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.User)
                .WithMany(u => u.Attendances)
                .HasForeignKey(a => a.UserID);

            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.User)
                .WithMany(u => u.LeaveRequests)
                .HasForeignKey(lr => lr.UserID);


            modelBuilder.Entity<User>()
                .HasMany(u => u.Events)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserID);

            base.OnModelCreating(modelBuilder);
        }
    }
}
