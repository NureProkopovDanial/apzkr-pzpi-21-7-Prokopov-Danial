using System;
using System.Collections.Generic;
using System.Text;

namespace App1.Interfaces
{
    public interface IApiService
    {
        Query Get(string endpoint);
        Query Post<D>(string endpoint, D model);
        Query Post(string endpoint);
        Query Put<D>(string endpoint, D model);
        Query Delete<D>(string endpoint, D model);
    }
}
