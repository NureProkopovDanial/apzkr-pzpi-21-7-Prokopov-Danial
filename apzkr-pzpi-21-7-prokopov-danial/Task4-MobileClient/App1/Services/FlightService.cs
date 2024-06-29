using App1.Interfaces;
using App1.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace App1.Services
{
    class FlightService : IFlightService
    {
        private IApiService _apiService = DependencyService.Get<IApiService>();

        public async Task<List<Flight>> GetFlightsAsync()
        {
            var response = await _apiService.Get($"Flights").ExecuteAsync<List<Flight>>();
            return response;
        }
    }
}
