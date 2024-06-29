using App1.Interfaces;
using App1.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace App1
{
    public static class DIContainer
    {
        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IApiService, ApiService>();
            services.AddScoped<IFlightService, FlightService>();
            services.AddScoped<IBaggageService, BaggageService>();
            return services;
        }
    }
}
