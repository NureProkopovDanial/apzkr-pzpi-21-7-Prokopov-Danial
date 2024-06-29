using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace App1
{
    public class Query : HttpClientBase
    {
        public Query(string endpoint, HttpMethod method)
        {
            Endpoint = endpoint;
            Method = method;
        }

        public Query(string endpoint, HttpMethod method, HttpContent httpContent)
        {
            Endpoint = endpoint;
            Method = method;
            HttpContent = httpContent;
        }

        string Endpoint { get; set; }
        HttpMethod Method { get; set; }
        HttpContent HttpContent { get; set; }

        const string Url = "https://192.168.0.104:45456/api/";

        public async Task<bool> IsSuccessed()
        {
            var request = new HttpRequestMessage(this.Method, Path.Combine(Url, this.Endpoint));
            request.Content = HttpContent;
            var response = await SendRequest(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<T> ExecuteAsync<T>()
        {
            var request = new HttpRequestMessage(this.Method, Path.Combine(Url, this.Endpoint));
            request.Content = HttpContent;
            var response = await SendRequest(request);
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(responseBody);
            }
            else
            {
                throw new InvalidOperationException();
            }
        }

        public async Task ExecuteAsync()
        {
            var request = new HttpRequestMessage(this.Method, Path.Combine(Url, this.Endpoint));
            request.Content = HttpContent;
            await SendRequest(request);
        }
    }
}
