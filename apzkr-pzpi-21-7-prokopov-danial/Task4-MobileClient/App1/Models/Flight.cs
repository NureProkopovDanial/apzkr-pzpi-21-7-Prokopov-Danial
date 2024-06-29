using System;
using System.Collections.Generic;
using System.Text;

namespace App1.Models
{
    public class Flight
    {
        public int FlightId { get; set; }
        public string FlightNumber { get; set; }
        public DateTime DepartureDateTime { get; set; }
        public DateTime ArrivalDateTime { get; set; }
        public Airport DepartureAirport { get; set; }
        public int DepartureAirportId { get; set; }
        public Airport ArrivalAirport { get; set; }
        public int ArrivalAirportId { get; set; }
        public Aircraft Aircraft { get; set; }
        public int AircraftId { get; set; }
        public string Notes { get; set; }
        public List<Ticket> Tickets { get; set; }
    }
}
