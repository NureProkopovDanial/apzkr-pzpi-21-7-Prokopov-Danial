using AirTrack.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace AirTrack.Interfaces
{
    public interface IBarcodeService
    {
        public void GenerateCode(Baggage baggage);
        Task<byte[]> GetFileAsync(int id);
    }
}
