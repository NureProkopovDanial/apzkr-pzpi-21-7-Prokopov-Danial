using App1.Models;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace App1.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class CodeDetailsPage : ContentPage
    {
        public CodeDetailsPage(Baggage model)
        {
            InitializeComponent();
            BindingContext = model;

            // Check and set the image source
            string url = $"https://192.168.0.104:45456/api/Baggages/code/" + model.BaggageId;

            try
            {
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (send, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient httpClient = new HttpClient(clientHandler);
                HttpResponseMessage response = httpClient.GetAsync(url).Result;

                if (response.IsSuccessStatusCode)
                {
                    byte[] imageData = response.Content.ReadAsByteArrayAsync().Result;
                    BaggageImage.Source = ImageSource.FromStream(() => new MemoryStream(imageData));
                }
                else
                {
                    // Handle the error, e.g., set a default image or display an error message
                    Console.WriteLine($"HTTP request failed with status code: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                // Handle the exception
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
