using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using static System.Collections.Specialized.BitVector32;
using System.Diagnostics;
using AirTrack.Models;

namespace AirTrack
{
    public class AppContext : DbContext
    {
        public AppContext()
        {
            // Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<Airport> Airports { get; set; }
        public DbSet<Baggage> Baggages { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Passenger> Passes { get; set; }
        public DbSet<Ticket> Ticketes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=AirTrack;Trusted_Connection=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Flight>().HasOne(c => c.ArrivalAirport).WithMany().HasForeignKey(c => c.ArrivalAirportId).OnDelete(DeleteBehavior.NoAction);            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Flight>().HasOne(c => c.DepartureAirport).WithMany().HasForeignKey(c => c.DepartureAirportId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
