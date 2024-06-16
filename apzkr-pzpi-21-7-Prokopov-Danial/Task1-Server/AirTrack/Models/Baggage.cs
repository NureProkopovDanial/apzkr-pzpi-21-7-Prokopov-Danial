namespace AirTrack.Models
{
    public class Baggage
    {
        public int BaggageId { get; set; }
        public int PassengerId { get; set; }
        public Passenger Passenger { get; set; }
        public int FlightId { get; set; }
        public Flight Flight { get; set; }
        public int Weight { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Depth { get; set; }
        public string Description { get; set; }
    }
}
