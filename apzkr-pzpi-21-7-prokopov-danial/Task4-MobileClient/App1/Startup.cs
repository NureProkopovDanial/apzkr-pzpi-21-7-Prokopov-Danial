using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace App1
{
    public static class Startup
    {
        public static IServiceProvider ServiceProvider { get; set; }
        public static IServiceProvider Init()
        {
            var serviceProvider = new ServiceCollection()
                .ConfigureServices()
                .BuildServiceProvider();

            ServiceProvider = serviceProvider;
            return serviceProvider;
        }
    }
}
