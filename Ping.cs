using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using DUCSA.Integrador.EESS.Core.Business.Configuration.Logic;
using DUCSA.Integrador.EESS.Core.SharedModels;
using IdentityModel.Client;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace DUCSA.Integrador.EESS.Core.Utilities
{
    /// <summary>
    /// Cliente http
    /// </summary>
    public class HttpHelper : IHttpHelper
    {
        private readonly ILogger _logger;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IIntegradorConfigurationService _integradorConfigurationService;
        private static HttpClient _client;
        private string _token;
        private TokenResponse _tokenResponse;
        private DateTime _tokenExpirationDate;

        /// <summary>
        /// Constructor
        /// </summary>
        public HttpHelper(
            ILogger<HttpHelper> logger,
            IHttpClientFactory httpClientFactory,
            IIntegradorConfigurationService integradorConfigurationService)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
            _integradorConfigurationService = integradorConfigurationService;
        }

        /// <summary>
        /// Realiza una llamada GET a un servicio
        /// </summary>      
        public async Task<ServiceResponse<TSuccessBody, TErrorBody>> GetAsync<TSuccessBody, TErrorBody>(string uri, JsonSerializerSettings settings = null, bool authenticate = true, int? timeout = null, string basicAuthBase64 = null, bool ignoreSsl = false)
        {
            // Obtiene el cliente http para realizar el request
            var client = await GetClientAsync(authenticate, timeout);

            // Llama al servicio GET especificado
            _logger.LogInformation("Llamando servicio {uri}", uri);

            if (ignoreSsl)
            {
                var httpClientHandler = new HttpClientHandler();
                httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) =>

                {
                    return true;
                };
                client = new HttpClient(httpClientHandler) { BaseAddress = new Uri(uri) };
            }
            if (!string.IsNullOrEmpty(basicAuthBase64))
            {
                if (client != null)
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", basicAuthBase64);

                }
            }


            var result = await client.GetAsync(uri);

            // En caso de obener una respuesta de Unauthorized, se obtiene un nuevo token y se llama al servicio una vez mas
            if (result.StatusCode == HttpStatusCode.Unauthorized)
            {
                _logger.LogWarning("Error de autenticacion en servicio {uri}", uri);
                await AssignNewAccessTokenAsync();

                // En este punto si se devuelve nuevamente error, puede ser devido a una la configuracion del cliente para obtener el token
                // Por lo que no tendria sentido seguir intentando obener un nuevo token
                _logger.LogInformation("Llamando nuevamente a servicio {uri}", uri);
                result = await client.GetAsync(uri);
            }

            // Se procesa la respuesta y se devuelve
            return await ProcessResponse<TSuccessBody, TErrorBody>(result);
        }

        /// <summary>
        /// Realiza una llamada POST a un servicio
        /// </summary>
        public async Task<ServiceResponse<TSuccessBody, TErrorBody>> PostAsync<TSuccessBody, TErrorBody>(object postData, string uri, bool serialize = true, bool authenticate = true, int? timeout = null, string basicAuthBase64 = null, bool ignoreSsl = false)
        {
            // Se ejecuta la logica compartida por los metodos de POST
            var result = await BasePostAsync(postData, uri, serialize, authenticate, timeout, basicAuthBase64,ignoreSsl);

            // Se procesa dicha respuesta y se devuelve el resultado
            return await ProcessResponse<TSuccessBody, TErrorBody>(result);
        }

        /// <summary>
        /// Realiza una llamada POST a un servicio
        /// </summary>
        public async Task PostAsync(object postData, string uri, bool serialize = true, bool authenticate = true, int? timeout = null)
        {
            // Se ejecuta la logica compartida por los metodos de POST
            var result = await BasePostAsync(postData, uri, serialize, authenticate, timeout);

            // Ya que este tipo de POST no esta esperando una respuesta, si se encontrara un error, una excepcion seria levantada
            await ProcessResponse(result);
        }

        /// <summary>
        /// Creates and configures the HTTP client
        /// </summary>
        internal virtual async Task<HttpClient> GetClientAsync(bool authenticate, int? timeout = null)
        {
            // Cada vez que se crea un cliente http con el client factory se retorna una nueva isntancia
            // Pero cada Http Client utiliza un Http Message Handler que implementa un pool y es reutilizado por el Client Factory
            // para reducir consumo de recursos
            _logger.LogInformation("Creando nuevo cliente http 'Ducsa'");
            _client = _httpClientFactory.CreateClient("Ducsa");
            if (timeout != null)
            {
                _client.Timeout = TimeSpan.FromSeconds((int)timeout);
            }

            if (authenticate)
            {
                if (string.IsNullOrEmpty(_token) || _tokenExpirationDate < DateTime.Now)
                {
                    _logger.LogInformation("Solicitando nuevo token.");
                    await AssignNewAccessTokenAsync();
                }
                else
                {
                    _logger.LogDebug("Utilizando token {0}.", _token);
                    _client.SetBearerToken(_token);
                }
            }

            return _client;
        }

        /// <summary>
        /// Base para la llamada de un servicio POST
        /// </summary>
        private async Task<HttpResponseMessage> BasePostAsync(object postData, string uri, bool serialize, bool authenticate, int? timeout = null, string basicAuthBase64 = null, bool ignoreSsl = false)
        {
            // Obtiene el cliente http para realizar el request
            var client = await GetClientAsync(authenticate, timeout);

            // En caso de que el servicio este esperando un objeto, se serealiza, en caso contrario se envia un string
            string sentData = serialize ? JsonConvert.SerializeObject(postData) : postData.ToString();
            var contentPost = new StringContent(sentData, Encoding.UTF8, "application/json");

            // Llama al servicio POST especificado
            _logger.LogInformation("Llamando servicio POST - Url: {uri}", uri);
            _logger.LogDebug("Llamando servicio POST - Url: {uri} - Datos: {@postData}", uri, postData);
            if (ignoreSsl)
            {
                var httpClientHandler = new HttpClientHandler();
                httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) =>

                {
                    return true;
                };
                client = new HttpClient(httpClientHandler) { BaseAddress = new Uri(uri) };
            }
            if (!string.IsNullOrEmpty(basicAuthBase64))
            {
                if (client != null)
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", basicAuthBase64);
                    
                }
            }

            //To-Do 
            //Aqui es cuando se hace el post a api/AutorizacionesConvenio/venta demora mucho.

            if(await PingToUrl(uri)) 
            {
                var result = await client.PostAsync(uri, contentPost);

                // En caso de obener una respuesta de Unauthorized, se obtiene un nuevo token y se llama al servicio una vez mas
                var contents = await result.Content.ReadAsStringAsync();
                if (result.StatusCode == HttpStatusCode.Unauthorized && authenticate)
                {
                    _logger.LogWarning("Error de autenticacion en servicio {uri}", uri);
                    await AssignNewAccessTokenAsync();

                    // En este punto si se devuelve nuevamente error, puede ser devido a una la configuracion del cliente para obtener el token
                    // Por lo que no tendria sentido seguir intentando obener un nuevo token
                    _logger.LogInformation("Llamando nuevamente servicio POST - Url: {uri}", uri);
                    _logger.LogDebug("Llamando nuevamente servicio POST - Url: {uri} - Datos: {@postData}", uri, postData);
                    result = await client.PostAsync(uri, contentPost);
                }

                return result;
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound) { Content = new StringContent($"Ping a url: {uri} Failed") };
            }
        }

        /// <summary>
        /// Solicita un nuevo token y se lo asigna al client http
        /// </summary>
        private async Task AssignNewAccessTokenAsync()
        {
            // Se solicita un nuevo token y se asigna la propiedad 
            // Esta es utilizada para identificar que no hay token en el primer request que realice el cliente
            try
            {
                var tokenResponse = await GetAccessTokenAsync();
                if (tokenResponse.IsError) 
                {
                    _logger.LogError("Error al solicitar token - {@Error}", tokenResponse.Error);
                }
                else
                {
                    _token = tokenResponse.AccessToken;
                    // Se le asigna el token al cliente
                    _client.SetBearerToken(_token);
                }
            }
            catch(Exception ex)
            {
                _logger.LogError("Error al solicitar token - {@Error}", ex.Message);
            }
        }

        /// <summary>
        /// Obtiene un access token
        /// </summary>
        public async Task<TokenResponse> GetAccessTokenAsync(string state = null, int? timeout = null)
        {
            try
            {
                var integradorConfiguration = await _integradorConfigurationService.GetIntegradorConfigurationAsync();
                using (var pinger = new Ping())
                {
                    var reply = await pinger.SendPingAsync(integradorConfiguration.BackOffice.IdsUrl, 3 * 1000);
                }

                if (_tokenResponse != null
                        && !_tokenResponse.IsError
                        && _tokenExpirationDate > DateTime.Now
                        && _tokenResponse.HttpStatusCode == HttpStatusCode.OK
                        && (string.IsNullOrEmpty(state) || state == HubConnectionState.Connected.ToString()))
                {
                    return _tokenResponse;
                }

                if (_client == null)
                {
                    await GetClientAsync(true, timeout);
                }
                // Se obtiene la configuracion necesaria para solicitar el token
                // Cada estacion tendra sus parametros especificos
                var tokenRequest = new ClientCredentialsTokenRequest
                {
                    RequestUri = new Uri(integradorConfiguration.BackOffice.IdsUrl),
                    ClientId = integradorConfiguration.Estacion.ClientId,
                    ClientSecret = integradorConfiguration.Estacion.ClientSecret,
                    Scope = integradorConfiguration.Estacion.Scope,
                };

                _logger.LogInformation("Solicitando nuevo token - Request: {@tokenRequest}", tokenRequest);

                // Se llama al servicio que genera tokens
                _tokenResponse = await _client.RequestClientCredentialsTokenAsync(tokenRequest);

                _tokenExpirationDate = DateTime.Now.AddSeconds(_tokenResponse.ExpiresIn);

                return _tokenResponse;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error obteniendo token.");
                _logger.LogError("Error obteniendo token. Parametros -> State: {state}. TimeOut: {timeout}. Valores de interes: TokenExpirationDate: {_tokenExpirationDate:yyyy-MM-dd HH:mm:ss}. HttpStatusCode: {httpStatusCode}", state, timeout, _tokenExpirationDate, _tokenResponse.HttpStatusCode);
                throw;
            }
        }

        /// <summary>
        /// Deserealiza el contenido de una respuesta http a un objeto de tipo T
        /// </summary>
        private async Task<T> DeserializeContent<T>(HttpContent content)
        {
            _logger.LogInformation("Deserealizando respuesta servicio");

            using (var stream = await content.ReadAsStreamAsync())
            using (var reader = new StreamReader(stream))
            using (var json = new JsonTextReader(reader))
            {
                var serializer = new JsonSerializer();                
                return serializer.Deserialize<T>(json);
            }
        }

        /// <summary>
        /// Procesa una respuesta http
        /// </summary>
        private async Task<ServiceResponse<TSuccessBody, TErrorBody>> ProcessResponse<TSuccessBody, TErrorBody>(HttpResponseMessage httpResponse)
        {
            _logger.LogInformation("Procesando respuesta servicio {@StatusCode} {ReasonPhrase}", httpResponse.StatusCode, httpResponse.ReasonPhrase);

            // Si es un error controlado, se deserealiza en el objeto de error
            if (httpResponse.StatusCode == HttpStatusCode.BadRequest)
            {
                var errorBody = await DeserializeContent<TErrorBody>(httpResponse.Content);
                return ServiceResponse<TSuccessBody, TErrorBody>.Error(httpResponse.StatusCode, httpResponse.ReasonPhrase, errorBody);
            }

            // Si es una respuesta exitosa, se deserealiza en el objeto de exito
            if (httpResponse.IsSuccessStatusCode)
            {
                var successBody = await DeserializeContent<TSuccessBody>(httpResponse.Content);                
                return ServiceResponse<TSuccessBody, TErrorBody>.Ok(httpResponse.StatusCode, httpResponse.ReasonPhrase, successBody);
            }

            // En caso de ser internal server error, ya que no fue algo controado, se deserealiza como string y se agrega al message
            string errorContent = await httpResponse.Content.ReadAsStringAsync();
            return ServiceResponse<TSuccessBody, TErrorBody>.Error(httpResponse.StatusCode, errorContent, default(TErrorBody));
        }

        /// <summary>
        /// Procesa una respuesta http para servicios sin una respuesta definida
        /// </summary>
        private async Task ProcessResponse(HttpResponseMessage httpResponse)
        {
            _logger.LogInformation("Procesando respuesta servicio {@StatusCode} {ReasonPhrase}", httpResponse.StatusCode, httpResponse.ReasonPhrase);

            // Utilizado por servicios que no esperan una respuesta
            // En caso de que la llamada sea exitosa no se devuelve nada
            // En caso de haber ocurrido un error, se levanta una excepcion
            if (!httpResponse.IsSuccessStatusCode)
            {
                string errorMessage = $"Status Code: {httpResponse.StatusCode} - {httpResponse.ReasonPhrase}";
                string errorContent = await httpResponse.Content.ReadAsStringAsync();
                if (!string.IsNullOrEmpty(errorContent))
                {
                    errorMessage += $" - Content: {errorContent}";
                }

                throw new InvalidOperationException(errorMessage);
            }
        }

        // Precondicion: url no es vacio, y es una url valida por el navegador. PABLO ME ROMPIO TODA LA TEORIA ¿como saberlo? PROBANDO
        private async Task<bool> PingToUrl(string url) 
        {
            var url_clean = "";
            var timeout_default_in_seconds = 3;

            var spliter = url.Split('/');
            if (spliter.Length > 3)
            {
                var url_with_port = spliter[2];
                url_clean = url_with_port.Contains(':') ? url_with_port.Split(':')[0] : url_with_port;
            }

            try
            {
                using (var pinger = new Ping())
                {
                    var reply = await pinger.SendPingAsync(url_clean, timeout_default_in_seconds * 1000);
                    if (reply.Status == IPStatus.Success)
                    {
                        _logger.LogInformation($"Ping url: {url_clean}, status: { "Success" }");
                        return true;
                    }
                    else
                    {
                        _logger.LogInformation($"Ping url: {url_clean}, status: { "Failed" }");
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ocurrio un error al verificar ping para: url: {url_clean}, exception: {ex.Message}");
                return false;
            }
        }

    }
}
