namespace AirTrack.Models
{
    public class Aircraft
    {
        public int AircraftId { get; set; }
        public string Manufacturer { get; set; }
        public string ModelName { get; set; }
        public int MaxCapacity { get; set; }
        public int MaxCargoCapacity { get; set; }
    }
}
