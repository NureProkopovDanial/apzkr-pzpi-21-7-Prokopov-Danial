using System;
using System.Collections.Generic;
using System.Text;

namespace App1.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int FlightId { get; set; }
        public Flight Flight { get; set; }
        public int Price { get; set; }
    }
}
