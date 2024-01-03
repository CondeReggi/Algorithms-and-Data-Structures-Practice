using DUCSA.App.BackOffice.Core.Models.Payment;
using DUCSA.App.BackOffice.Core.Models.Payment.Sistarbanc;
using DUCSA.App.Payments.Sistarbanc.Models;
using DUCSA.App.Payments.Sistarbanc.Sistarbanc.MediosPago;
using DUCSA.App.Payments.Sistarbanc.Sistarbanc.Servicios;
using HtmlAgilityPack;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.Collections.Generic;
using System.IdentityModel.Policy;
using System.IdentityModel.Selectors;
using System.IdentityModel.Tokens;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Description;
using System.ServiceModel.Dispatcher;
using System.ServiceModel.Security;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using static DUCSA.App.Payments.Sistarbanc.Models.RequestSistarbancClasses;
using static DUCSA.App.Payments.Sistarbanc.Models.ResponseSistarbancClasses;

namespace DUCSA.App.Payments.Sistarbanc
{
    /// <summary>
    /// clase para servicios
    /// </summary>
    public class SistarbancExportedServices
    {
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Contructor de la clase
        /// </summary>
        public SistarbancExportedServices(IConfiguration configuration)
        {
            ServicePointManager.ServerCertificateValidationCallback += (a, b, c, d) => true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            _configuration = configuration;
        }

        /// <summary>
        /// Comienza una transacción de compra en el sistema de sistarbanc 
        /// </summary>
        /// <param name="datos">Datos del pedido</param>
        /// <returns>Resultado de inicio de compra</returns>
        //public async Task<ResultadoSistarbanc> RunIniciarCompraAsync(DatosOrdenPago datos, string numeroTransaccion, string consumidorFinal)
        //{
        //    using (var cliente = ObtenerClienteServicios())
        //    {
        //        var respuesta = await cliente.iniciarCompraAsync(datos.CodigoEntidad, datos.CodigoMedioPago, datos.CodigoComercio, datos.PlanComercio, datos.InvoiceTotalAmount.ToString(), datos.Amount.ToString(), consumidorFinal, datos.InvoiceNumber, datos.TipAmount.ToString(), datos.Currency, datos.NumeroDocumento, numeroTransaccion);

        //        return new ResultadoSistarbanc
        //        {
        //            NumeroTransaccion = numeroTransaccion,
        //            IdTransaccion = respuesta.idTransaccion,
        //            ImporteNeto = respuesta.importeNeto,
        //            ImporteDevolucion = respuesta.importeDevolucion,
        //            CodigoError = respuesta.codigoError,
        //            DescripcionError = respuesta.descripcionError
        //        };
        //    }
        //}

        ///// <summary>
        ///// Comienza una transacción de solicitud de pago en el sistema de sistarbanc 
        ///// </summary>
        ///// <param name="datos">Datos del pedido</param>
        ///// <returns>Resultado de inicio de compra</returns>
        //public async Task<ResultadoSistarbanc> RunSolicitarPagoAsync(DatosOrdenPago datos)
        //{
        //    using (var cliente = ObtenerClienteMediosPago())
        //    {
        //        string otrosDatos = string.Empty;

        //        var respuesta = await cliente.solicitarPagoAsync(datos.CodigoEntidad, datos.CodigoMedioPago, datos.PlanComercio, datos.CodigoEntidad, datos.CodigoProveedor, datos.ImporteNeto, datos.ImporteDevolucion, datos.Currency, datos.NumeroDocumento, datos.NumeroDocumento, datos.NumeroTransaccion, otrosDatos);

        //        return new ResultadoSistarbanc
        //        {
        //            CodigoAutorizacion = respuesta.Body.solicitarPagoReturn.idTransaccion,
        //            Fecha = respuesta.Body.solicitarPagoReturn.fechaValor,
        //            CodigoError = respuesta.Body.solicitarPagoReturn.codigoError,
        //            DescripcionError = respuesta.Body.solicitarPagoReturn.descripcionError
        //        };
        //    }
        //}

        ///// <summary>
        ///// Comienza una transacción de confirmar transacción en el sistema de sistarbanc 
        ///// </summary>
        ///// <param name="datos">Datos del pedido</param>
        ///// <returns>Resultado de inicio de compra</returns>
        //public async Task<ResultadoSistarbanc> RunConfirmarTransaccionAsync(DatosOrdenPago datos)
        //{
        //    using (var cliente = ObtenerClienteServicios())
        //    {
        //        var respuesta = await cliente.confirmarTransaccionAsync(datos.CodigoEntidad, datos.CodigoMedioPago, datos.ImporteNeto, datos.Currency, datos.NumeroDocumento, datos.NumeroTransaccion, datos.CodigoAutorizacion);

        //        return new ResultadoSistarbanc
        //        {
        //            CodigoError = respuesta.codigoError,
        //            DescripcionError = respuesta.descripcionError
        //        };
        //    }
        //}

        ///// <summary>
        ///// Da de baja un medio de pago en sistarbanc
        ///// </summary>
        ///// <param name="datos">Datos de usuario y medio de pago</param>
        ///// <returns>Resultado de la transacción</returns>
        //public async Task<ResultadoCliente> BajaClienteAsync(ParametrosCliente datos)
        //{
        //    using (var cliente = ObtenerClienteMediosPago())
        //    {
        //        string numeroTransaccion = DateTime.Now.Ticks.ToString();

        //        Log.Verbose($"Iniciando llamada bajaClienteAsync - codigoEntidad {datos.CodigoEntidad} - idMedioPago {datos.CodigoMedioPago} - tipoDocumentoCliente {datos.TipoDocumento} - documentoCliente {datos.NumeroDocumento} - numeroServicio {datos.NumeroCelular} - numeroTransaccion {numeroTransaccion} - expiracion {ConstantesSistarbanc.CodigoClienteBajaGeneral}");
        //        var respuesta = await cliente.bajaClienteAsync(datos.CodigoEntidad, datos.CodigoMedioPago, datos.TipoDocumento, datos.NumeroDocumento, datos.NumeroDocumento, numeroTransaccion, ConstantesSistarbanc.CodigoClienteBajaGeneral);
        //        Log.Verbose($"Iniciando llamada bajaClienteAsync - {JsonConvert.SerializeObject(respuesta)}");

        //        return new ResultadoCliente
        //        {
        //            CodigoError = respuesta.Body.bajaClienteReturn.codigoError,
        //            DescripcionError = respuesta.Body.bajaClienteReturn.descripcionError,
        //            TransaccionId = respuesta.Body.bajaClienteReturn.idTransaccion
        //        };
        //    }
        //}

        ///// <summary>
        ///// Da de alta un medio de pago en sistarbanc
        ///// </summary>
        ///// <param name="datos">Datos de usuario y medio de pago</param>
        ///// <returns>Resultado de la transacción</returns>
        //public async Task<ResultadoCliente> AltaClienteAsync(ParametrosCliente datos)
        //{
        //    using (var cliente = ObtenerClienteMediosPago())
        //    {
        //        Log.Verbose($"Iniciando llamada altaClienteAsync - codigoEntidad {datos.CodigoEntidad} - idMedioPago {datos.CodigoMedioPago} - tipoDocumentoCliente {datos.TipoDocumento} - documentoCliente { datos.NumeroDocumento} - numeroServicio {datos.NumeroCelular} - numeroTransaccion {datos.NumeroTransaccion}");
        //        var respuesta = await cliente.altaClienteAsync(datos.CodigoEntidad, datos.CodigoMedioPago, datos.TipoDocumento, datos.NumeroDocumento, datos.NumeroDocumento, datos.NumeroTransaccion);
        //        Log.Verbose($"Iniciando llamada altaClienteAsync - {JsonConvert.SerializeObject(respuesta)}");

        //        return new ResultadoCliente
        //        {
        //            CodigoError = respuesta.Body.altaClienteReturn.codigoError,
        //            DescripcionError = respuesta.Body.altaClienteReturn.descripcionError,
        //            TransaccionId = respuesta.Body.altaClienteReturn.idTransaccion
        //        };
        //    }
        //}

        ///// <summary>
        ///// Instancia cliente de servicios
        ///// </summary>
        ///// <returns>Un cliente</returns>
        //private static WsServiciosClient ObtenerClienteServicios()
        //{
        //    var client = new WsServiciosClient();
        //    //client.Endpoint.Behaviors.Add(new DigitalSignBehavior());

        //    return client;
        //}

        /// <summary>
        /// Instancia cliente de medios de pago
        /// </summary>
        /// <returns>Un cliente</returns>
        //private static WsMediosPagoClient ObtenerClienteMediosPago()
        //{
        //    var client = new WsMediosPagoClient();
        //    //client.Endpoint.Behaviors.Add(new DigitalSignBehavior());

        //    return client;
        //}

        public async Task<Request<AltaClienteResponse>> ObtenerClienteMediosPagoAuxPrueba(ParametrosCliente datos)
        {
            string path = _configuration.GetSection("SistarBanc:RutaPath").Value;
            string password = _configuration.GetSection("SistarBanc:Password").Value;
            string fileName = _configuration.GetSection("SistarBanc:FileName").Value;

            string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
            var certificate = new X509Certificate2(certPath, password);

            var certificateToken = Convert.ToBase64String(certificate.RawData);

            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago?WSDL");

            request.Headers.Add("SOAPAction", "");
            request.Headers.Add("Security", "");

            using (var stringWriter = new StringWriter())
            {
                StringBuilder xmlStringBuilder = new StringBuilder();

                xmlStringBuilder.Append("<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:wsm=\"https://spf.sistarbanc.com.uy/spfws/services/WsMediosPago\">\r\n    ");
                xmlStringBuilder.Append("<soapenv:Header>");
                xmlStringBuilder.Append("<wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">");
                xmlStringBuilder.Append("<wsse:BinarySecurityToken EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\" ValueType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3\" wsu:Id=\"X509-90D390FDDCA07501FE168752286022011\">" + certificateToken + "</wsse:BinarySecurityToken>");
                xmlStringBuilder.Append("<ds:Signature Id=\"SIG-90D390FDDCA07501FE168752286022314\" xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\">");
                xmlStringBuilder.Append("<ds:SignedInfo>");
                xmlStringBuilder.Append("<ds:CanonicalizationMethod Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\">");
                xmlStringBuilder.Append("<ec:InclusiveNamespaces PrefixList=\"soapenv wsm\" xmlns:ec=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/>");
                xmlStringBuilder.Append("</ds:CanonicalizationMethod>");
                xmlStringBuilder.Append("<ds:SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/>");
                xmlStringBuilder.Append("<ds:Reference URI=\"#id-99C8D72B989D0CEC371686921784277236\">");
                xmlStringBuilder.Append("<ds:Transforms>");
                xmlStringBuilder.Append("<ds:Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\">");
                xmlStringBuilder.Append("<ec:InclusiveNamespaces PrefixList=\"wsm\" xmlns:ec=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/>");
                xmlStringBuilder.Append("</ds:Transform>");
                xmlStringBuilder.Append("</ds:Transforms>");
                xmlStringBuilder.Append("<ds:DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/>");
                xmlStringBuilder.Append("<ds:DigestValue>C35BkGakzsGv2LW8j+wyL/uFSY7UDtEVtrX9/sZ12zM=</ds:DigestValue>");
                xmlStringBuilder.Append("</ds:Reference>");
                xmlStringBuilder.Append("</ds:SignedInfo>");
                xmlStringBuilder.Append("<ds:SignatureValue>f0Dm1nmte/QjGGkAYuO98cfyNdFuFLukMQdDkwj41CGl4qeYhswzZgYhMHVDGRz/ZQrLjsNVvX/EZfpiYhwvm6BGQJCAZZ8BiXH6m47sTls1nu9patb4XcbBiBldt68HDQiPgK6YTw0IeY6j3uPn9yHpqcYpooFxl8cNTfM6EDErvigEpCmkubpM0t0xwIVPN5tCr5E9J6Phmcdv+4WUOJQ/+9WkPi/OoFml08bMtu6cMRJIWr/UJTTRtq+momh0O5n/vwKn1P5AN+LNZvz1OT8+yR+yl8cikGBwycAuMf6z+tzsPDlMUZ0O8iHhkH6PzCLDHGOla87UUVNHxUyMGy7ZMgYC+vun0sE/RbK3tW6Q3IWvxlpP5fhOvxuey6mbL9YJdtOGKqIopbpNH9RiOmqLCn8Wi1zwMXZAH6R4jHjZqX7MClPTjg6eZlqerKVAET2PzCeYbiwpAmtjgnsHgM3+hlv4IGMMV+B3BD4Lcfv7m/FsaKr/KgIthLIR9VolFCHG2+xP8tLA7pEA05WEEzu9+vTEJ5n2uJtiLRUCdOY0W5dKfTw5dJpOXu3bgAbD/kALcNNOr0fkX7a1nDGGf2tg1ddEOKQzdgGSa5XHVq0tWGg6pG6kaWb470zt0npbZtZpekmi3RroQ1nn7sfkJXTFFBMdTt9v4cjwEEh56l0=");
                xmlStringBuilder.Append("</ds:SignatureValue>");
                xmlStringBuilder.Append("<ds:KeyInfo Id=\"KI-90D390FDDCA07501FE168752286022012\">");
                xmlStringBuilder.Append("<wsse:SecurityTokenReference wsu:Id=\"STR-90D390FDDCA07501FE168752286022013\">");
                xmlStringBuilder.Append("<wsse:Reference URI=\"#X509-90D390FDDCA07501FE168752286022011\" ValueType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3\"/>");
                xmlStringBuilder.Append("</wsse:SecurityTokenReference>");
                xmlStringBuilder.Append("</ds:KeyInfo>");
                xmlStringBuilder.Append("</ds:Signature>");
                xmlStringBuilder.Append("</wsse:Security>\r\n    ");
                xmlStringBuilder.Append("</soapenv:Header>\r\n    ");
                xmlStringBuilder.Append("<soapenv:Body wsu:Id=\"id-99C8D72B989D0CEC371686921784277236\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">");
                xmlStringBuilder.Append("<wsm:altaCliente>\r\n        ");
                xmlStringBuilder.Append("<wsm:codigoEntidad>" + datos.CodigoEntidad + "</wsm:codigoEntidad>\r\n        ");
                xmlStringBuilder.Append("<wsm:idMedioPago>" + datos.CodigoMedioPago + "</wsm:idMedioPago>\r\n        ");
                xmlStringBuilder.Append("<wsm:tipoDocumentoCliente>" + datos.TipoDocumento + "</wsm:tipoDocumentoCliente>\r\n        ");
                xmlStringBuilder.Append("<wsm:documentoCliente>" + datos.NumeroDocumento + "</wsm:documentoCliente>\r\n        ");
                xmlStringBuilder.Append("<wsm:numeroServicio>" + datos.NumeroCelular + "</wsm:numeroServicio>\r\n        ");
                xmlStringBuilder.Append("<wsm:numeroTransaccion>" + datos.NumeroTransaccion + "</wsm:numeroTransaccion>\r\n    ");
                xmlStringBuilder.Append("</wsm:altaCliente>");
                xmlStringBuilder.Append("</soapenv:Body>\n");
                xmlStringBuilder.Append("</soapenv:Envelope>");

                string xmlString = xmlStringBuilder.ToString();

                var content = new StringContent(xmlString, null, "application/xml");
                request.Content = content;

                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();

                if (response.IsSuccessStatusCode)
                {
                    var contenido = await response.Content.ReadAsStringAsync();

                    var soapResponse = await DeserializeXmlFromResponse<Request<AltaClienteResponse>>(response);
                    return soapResponse;
                }
                else
                {
                    throw new Exception("No se pudo mapear, dio error al llamar el servicio.");
                }
            }
        }

        private async Task<T> DeserializeXmlFromResponse<T>(HttpResponseMessage response) where T : class
        {
            try
            {
                var content = await response.Content.ReadAsStringAsync();
                var xmlSerializer = new XmlSerializer(typeof(T));

                using (var stringReader = new StringReader(content))
                {
                    var obj = xmlSerializer.Deserialize(stringReader);
                    return obj as T;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

    public class CustomEndpointBehavior : IEndpointBehavior
    {
        private readonly AddHeaderMessageInspector _inspector;

        public CustomEndpointBehavior(string headerName, string headerValue)
        {
            _inspector = new AddHeaderMessageInspector(headerName, headerValue);
        }

        public void ApplyClientBehavior(ServiceEndpoint endpoint, ClientRuntime clientRuntime)
        {
            clientRuntime.MessageInspectors.Add(_inspector);
        }

        public void AddBindingParameters(ServiceEndpoint endpoint, BindingParameterCollection bindingParameters)
        {
        }

        public void ApplyDispatchBehavior(ServiceEndpoint endpoint, EndpointDispatcher endpointDispatcher)
        {
        }

        public void Validate(ServiceEndpoint endpoint)
        {
        }
    }


    public class AddHeaderMessageInspector : IClientMessageInspector
    {
        private readonly string _headerName;
        private readonly string _headerValue;

        public AddHeaderMessageInspector(string headerName, string headerValue)
        {
            _headerName = headerName;
            _headerValue = headerValue;
        }

        public object BeforeSendRequest(ref Message request, IClientChannel channel)
        {
            var httpRequestMessageProperty = new HttpRequestMessageProperty();

            if (request.Properties.ContainsKey(HttpRequestMessageProperty.Name))
            {
                httpRequestMessageProperty = (HttpRequestMessageProperty)request.Properties[HttpRequestMessageProperty.Name];
            }

            // Agregar los encabezados personalizados al objeto HttpRequestMessageProperty
            httpRequestMessageProperty.Headers["SOAPAction"] = "";
            httpRequestMessageProperty.Headers["Security"] = "";

            // Establecer el objeto HttpRequestMessageProperty en la colección de propiedades de la solicitud
            request.Properties[HttpRequestMessageProperty.Name] = httpRequestMessageProperty;

            return null;
        }

        public void AfterReceiveReply(ref Message reply, object correlationState)
        {
        }
    }


    public class AddSoapHeaderInspector : IClientMessageInspector
    {
        public object BeforeSendRequest(ref Message request, IClientChannel channel)
        {
            var httpRequestMessage = new HttpRequestMessageProperty();

            var operationContract = GetOperationContractAttribute(request);
            if (operationContract != null)
            {
                string action = operationContract.Action;
                if (string.IsNullOrWhiteSpace(action))
                {
                    if (request.Headers.Action.EndsWith("altaCliente"))
                    {
                        action = "altaCliente";
                    }
                    else if (request.Headers.Action.EndsWith("bajaCliente"))
                    {
                        action = "bajaCliente";
                    }
                    // Agrega aquí más condiciones para las demás operaciones...
                }
                httpRequestMessage.Headers["SOAPAction"] = action;
            }
            else
            {
                httpRequestMessage.Headers["SOAPAction"] = ""; // Establece un valor predeterminado
            }

            request.Properties[HttpRequestMessageProperty.Name] = httpRequestMessage;

            return null;
        }

        //public object BeforeSendRequest(ref Message request, IClientChannel channel)
        //{
        //    var httpRequestMessage = new HttpRequestMessageProperty();

        //    var operationContract = GetOperationContractAttribute(request);
        //    if (operationContract != null)
        //    {
        //        string action = string.IsNullOrWhiteSpace(operationContract.Action) ? "" : operationContract.Action;
        //        // Si la propiedad Action del OperationContractAttribute está vacía, establece un espacio en blanco en el encabezado SOAPAction
        //        httpRequestMessage.Headers["SOAPAction"] = action;
        //    }
        //    else
        //    {
        //        httpRequestMessage.Headers["SOAPAction"] = ""; // Establece un espacio en blanco para el encabezado SOAPAction
        //    }

        //    request.Properties[HttpRequestMessageProperty.Name] = httpRequestMessage;

        //    return null;
        //}

        public void AfterReceiveReply(ref Message reply, object correlationState)
        {
            // No es necesario hacer nada aquí
        }

        private OperationContractAttribute GetOperationContractAttribute(Message request)
        {
            var action = request.Headers.Action;
            var contractType = typeof(WsMediosPago);

            var operations = contractType.GetMethods()
                .SelectMany(m => m.GetCustomAttributes(typeof(OperationContractAttribute), false))
                .OfType<OperationContractAttribute>()
                .Where(o => o.Action == action);

            return operations.FirstOrDefault();
        }
    }

    public class AddSoapHeaderBehavior : IEndpointBehavior
    {
        public void AddBindingParameters(ServiceEndpoint endpoint, BindingParameterCollection bindingParameters)
        {
            // No es necesario hacer nada aquí
        }

        public void ApplyClientBehavior(ServiceEndpoint endpoint, ClientRuntime clientRuntime)
        {
            clientRuntime.ClientMessageInspectors.Add(new AddSoapHeaderInspector());
        }

        public void ApplyDispatchBehavior(ServiceEndpoint endpoint, EndpointDispatcher endpointDispatcher)
        {
            // No es necesario hacer nada aquí
        }

        public void Validate(ServiceEndpoint endpoint)
        {
            // No es necesario hacer nada aquí
        }
    }

    public class CustomMessageInspector : IClientMessageInspector
    {
        public void AfterReceiveReply(ref Message reply, object correlationState)
        {
            // This method is not needed for this example
        }

        public object BeforeSendRequest(ref Message request, IClientChannel channel)
        {
            // Manipulate the SOAP message here
            // For instance, to remove whitespace between the Body start and end tags
            // Note: You'll need to replace this with code that actually modifies the SOAP message
            string soapString = request.ToString();
            string modifiedSoapString = Regex.Replace(soapString, "<soapenv:Body>\\s*<", "<soapenv:Body><");
            modifiedSoapString = Regex.Replace(modifiedSoapString, ">\\s*</soapenv:Body>", "></soapenv:Body>");
            // You may also need to calculate the digest and create a Security header with a Signature here
            // This would require more complex XML manipulation
            // ...

            // Create a new message with the modified SOAP
            Message buffer = Message.CreateMessage(request.Version, null, new StringReader(modifiedSoapString));

            return null;
        }
    }
}
