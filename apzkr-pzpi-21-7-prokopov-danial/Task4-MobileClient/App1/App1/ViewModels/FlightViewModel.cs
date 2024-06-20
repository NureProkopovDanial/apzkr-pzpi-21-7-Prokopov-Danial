using App1.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace App1.ViewModels
{
    public  class FlightViewModel
    {
        public FlightViewModel(Flight flight)
        {
            FlightNumber = flight.FlightNumber;
            DepartureAirport = flight.DepartureAirport;
            ArrivalAirport = flight.ArrivalAirport;
            DepartureDateTime = flight.DepartureDateTime;
            ArrivalDateTime = flight.ArrivalDateTime;
            Aircraft = flight.Aircraft;
            Notes = flight.Notes;
            TicketCount = flight.Tickets.Count;
        }

        public string FlightNumber { get; set; }
        public DateTime DepartureDateTime { get; set; }
        public DateTime ArrivalDateTime { get; set; }
        public Airport DepartureAirport { get; set; }
        public Airport ArrivalAirport { get; set; }
        public Aircraft Aircraft { get; set; }
        public string Notes { get; set; }
        public int TicketCount { get; set; }
    }
}
