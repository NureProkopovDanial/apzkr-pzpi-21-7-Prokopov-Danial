using App1.Interfaces;
using App1.Models;
using App1.Services;
using App1.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace App1.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class CodesPage : ContentPage
    {
        private List<Baggage> _allBaggages;

        public CodesPage()
        {
            InitializeComponent();
            LoadBaggagesAsync();
        }

        private async void LoadBaggagesAsync()
        {
            var _baggageService = DependencyService.Get<IBaggageService>();

            _allBaggages = await _baggageService.GetAsync();
            baggagesListView.ItemsSource = _allBaggages;
            baggagesListView.ItemTapped += OnItemTapped;
        }

        private async void OnItemTapped(object sender, ItemTappedEventArgs e)
        {
            if (e.Item == null)
                return;

            var baggage = e.Item as Baggage;
            if (baggage == null)
                return;

            await Navigation.PushAsync(new CodeDetailsPage(baggage));
            ((ListView)sender).SelectedItem = null;
        }

        private void OnSearchBarTextChanged(object sender, TextChangedEventArgs e)
        {
            var keyword = e.NewTextValue.ToLower();
            baggagesListView.ItemsSource = _allBaggages.Where(b =>
                b.BaggageId.ToString().Contains(keyword) ||
                b.Passenger.FirstName.ToLower().Contains(keyword) ||
                b.Passenger.LastName.ToLower().Contains(keyword)).ToList();
        }
    }
}
