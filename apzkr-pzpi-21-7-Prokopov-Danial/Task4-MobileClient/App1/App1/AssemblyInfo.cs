using App1.Services;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
[assembly: Dependency(typeof(ApiService))]
[assembly: Dependency(typeof(FlightService))]
[assembly: Dependency(typeof(BaggageService))]