using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace App1
{
    public abstract class HttpClientBase
    {
        protected readonly HttpClient HttpClient;

        protected HttpClientBase()
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (send, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient = new HttpClient(clientHandler);

        }

        protected async Task<HttpResponseMessage> SendRequest(HttpRequestMessage request)
        {
            var response = await HttpClient.SendAsync(request);
            return response;
        }
    }
}
