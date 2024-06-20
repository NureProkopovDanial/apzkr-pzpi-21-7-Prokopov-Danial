using App1.Interfaces;
using App1.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace App1.Services
{
    internal class BaggageService : IBaggageService
    {
        private IApiService _apiService = DependencyService.Get<IApiService>();

        public async Task<List<Baggage>> GetAsync()
        {
            var response = await _apiService.Get($"Baggages").ExecuteAsync<List<Baggage>>();
            return response;
        }
    }
}
