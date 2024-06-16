using App1.Interfaces;
using App1.Models;
using App1.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace App1.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FlightsPage : ContentPage
    {
        public FlightsPage()
        {
            InitializeComponent();
            LoadFlightsAsync();
        }

        private async void LoadFlightsAsync()
        {
            var _flightService = DependencyService.Get<IFlightService>();

            List<Flight> flights = await _flightService.GetFlightsAsync();
            flightsListView.ItemsSource = flights;
            flightsListView.ItemTapped += OnItemTapped;
        }

        private async void OnItemTapped(object sender, ItemTappedEventArgs e)
        {
            if (e.Item == null)
                return;

            var flight = e.Item as Flight;
            if (flight == null)
                return;

            await Navigation.PushAsync(new FlightDetailPage(new FlightViewModel(flight)));

            // Deselect Item
            ((ListView)sender).SelectedItem = null;
        }
    }
}