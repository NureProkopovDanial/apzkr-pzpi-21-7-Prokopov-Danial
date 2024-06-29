using App1.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace App1.Services
{
    public class ApiService : IApiService
    {
        public Query Get(string endpoint)
        {
            return new Query(endpoint, HttpMethod.Get);
        }

        public Query Put<D>(string endpoint, D model)
        {
            HttpContent content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            return new Query(endpoint, HttpMethod.Put, content);
        }

        public Query Delete<D>(string endpoint, D model)
        {
            HttpContent content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            return new Query(endpoint, HttpMethod.Delete, content);
        }

        public Query Post<D>(string endpoint, D model)
        {
            HttpContent content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            return new Query(endpoint, HttpMethod.Post, content);
        }

        public Query Post(string endpoint)
        {
            return new Query(endpoint, HttpMethod.Post);
        }
    }
}
