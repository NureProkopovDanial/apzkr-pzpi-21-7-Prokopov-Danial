using System;
using System.Collections.Generic;
using System.Text;

namespace App1.Models
{
    public class Passenger
    {
        public int PassengerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PassportNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Nationality { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
    }
}
