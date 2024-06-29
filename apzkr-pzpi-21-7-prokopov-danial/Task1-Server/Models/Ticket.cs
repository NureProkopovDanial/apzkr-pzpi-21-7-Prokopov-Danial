namespace AirTrack.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int PassengerId { get; set; }
        public Passenger Passenger { get; set; }
        public int FlightId { get; set; }
        public Flight Flight { get; set; }
        public int Price { get; set; }
    }
}
