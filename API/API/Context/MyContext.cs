using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Context
{
    public class MyContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Profiling> Profilings { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<AccountRole> AccountRoles { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //One to one => Account to Employee
            modelBuilder.Entity<Employee>()
                .HasOne(a => a.Account)
                .WithOne(b => b.Employee)
                .HasForeignKey<Account>(b => b.NIK);

            //One to one => Account to Profiling
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Profiling)
                .WithOne(b => b.Account)
                .HasForeignKey<Profiling>(b => b.NIK);

            //One to Many => University to Education
            modelBuilder.Entity<University>()
                .HasMany(c => c.Educations)
                .WithOne(e => e.University);

            //One to Many => Education to Profiling
            modelBuilder.Entity<Education>()
                .HasMany(c => c.Profiling)
                .WithOne(e => e.Education);

            /*modelBuilder.Entity<AccountRole>()
                .HasOne(c => c.Account)
                .WithMany(e => e.AccountRole);

            modelBuilder.Entity<AccountRole>()
                .HasOne(c => c.Role)
                .WithMany(e => e.AccountRoles);*/
            modelBuilder.Entity<AccountRole>()
                .HasKey(ar => new { ar.NIK, ar.RoleId });
            modelBuilder.Entity<AccountRole>()
                .HasOne(ar => ar.Account)
                .WithMany(b => b.AccountRoles)
                .HasForeignKey(ar => ar.NIK);
            modelBuilder.Entity<AccountRole>()
                .HasOne(ar => ar.Role)
                .WithMany(c => c.AccountRoles)
                .HasForeignKey(ar => ar.RoleId);
        }
    }
}
