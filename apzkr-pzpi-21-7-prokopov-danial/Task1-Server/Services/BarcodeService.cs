using AirTrack.Interfaces;
using AirTrack.Models;
using IronBarCode;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Drawing;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace AirTrack.Services
{
    public class BarcodeService : IBarcodeService
    {
        private readonly IHostEnvironment _hostingEnvironment;
        public BarcodeService(IHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public void GenerateCode(Baggage baggage)
        {
            try
            {
                GeneratedBarcode barcode = QRCodeWriter.CreateQrCode(JsonSerializer.Serialize(baggage), 500);
                barcode.SetMargins(10);
                barcode.ChangeBarCodeColor(Color.Black);
                string path = Path.Combine(_hostingEnvironment.ContentRootPath, "GeneratedCode", baggage.BaggageId + ".png");
                barcode.SaveAsPng(path);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<byte[]> GetFileAsync(int id)
        {
            var path = Path.Combine(_hostingEnvironment.ContentRootPath, "GeneratedCode", id + ".png");
            using var streamReader = File.OpenRead(path);
            var data = new byte[streamReader.Length];

            await streamReader.ReadAsync(data, 0, data.Length);

            return data;
        }
    }
}
