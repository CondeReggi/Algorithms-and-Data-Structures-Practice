using DUCSA.App.Payments.Sistarbanc.Sistarbanc.MediosPago;
using DUCSA.App.Payments.Sistarbanc.WSClient;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;
using System;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Description;
using System.ServiceModel.Dispatcher;
using System.ServiceModel.Security;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace DUCSA.App.Payments.Sistarbanc
{
    public class Tests
    {
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Contructor de la clase
        /// </summary>
        public Tests(IConfiguration configuration)
        {
            ServicePointManager.ServerCertificateValidationCallback += (a, b, c, d) => true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            _configuration = configuration;
        }

        private string SerializeToXml<T>(T obj)
        {
            using (var stringWriter = new StringWriter())
            {
                var serializer = new XmlSerializer(typeof(T));
                serializer.Serialize(stringWriter, obj);
                return stringWriter.ToString();
            }
        }

        public async Task<string> Test5()
        {
            try
            {
                string path = _configuration.GetSection("SistarBanc:RutaPath").Value;
                string password = _configuration.GetSection("SistarBanc:Password").Value;
                string fileName = _configuration.GetSection("SistarBanc:FileName").Value;

                string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
                var certificate = new X509Certificate2(certPath, password);

                // Convertir el certificado en un token de seguridad codificado en base64
                string certificateToken = Convert.ToBase64String(certificate.RawData);

                var binding = new BasicHttpBinding(BasicHttpSecurityMode.TransportWithMessageCredential);
                binding.Security.Transport.ClientCredentialType = HttpClientCredentialType.Certificate;
                binding.Security.Message.ClientCredentialType = BasicHttpMessageCredentialType.Certificate;
                binding.MessageEncoding = WSMessageEncoding.Text;
                binding.TextEncoding = Encoding.UTF8;
                binding.Security.Message.AlgorithmSuite = SecurityAlgorithmSuite.Basic256Sha256;

                //var endpoint = new EndpointAddress("https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago");
                var endpoint = new EndpointAddress("https://localhost:8088/mockWsMediosPagoSoapBinding");

                var channelFactory = new ChannelFactory<WsMediosPago>(binding, endpoint);

                channelFactory.Endpoint.EndpointBehaviors.Add(new MyEndpointBehavior());

                channelFactory.Credentials.ClientCertificate.Certificate = certificate;
                channelFactory.Credentials.ServiceCertificate.Authentication.CertificateValidationMode = X509CertificateValidationMode.None;

                var serviceClient = channelFactory.CreateChannel();

                using (var scope = new OperationContextScope((IClientChannel)serviceClient))
                {
                    // Configurar los headers
                    HttpRequestMessageProperty httpRequestProperty = new HttpRequestMessageProperty();
                    httpRequestProperty.Headers["SOAPAction"] = "";

                    // Insertar el token de seguridad en el encabezado
                    httpRequestProperty.Headers["Security"] = "<wsse:Security soapenv:mustUnderstand=\"1\">" +
                                                              "<wsse:BinarySecurityToken>" + certificateToken + "</wsse:BinarySecurityToken>" +
                                                              "</wsse:Security>";

                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = httpRequestProperty;

                    // Crear la solicitud
                    var request = new altaClienteRequest
                    {
                        codigoEntidad = "DUCSA",
                        idMedioPago = "",
                        tipoDocumentoCliente = "",
                        documentoCliente = "",
                        numeroServicio = new string[] { },
                        numeroTransaccion = ""
                    };

                    // Realizar la llamada al servicio
                    var responseTask = serviceClient.altaClienteAsync(request);

                    responseTask.Wait(); // Esto bloqueará el hilo hasta que la tarea asincrónica se complete
                    var response = responseTask.Result;
                    return response.ToString();
                }
            }
            catch (Exception ex)
            {
                return "El cliente dio error..." + ex.InnerException ?? ex.Message;
            }
        }

        public class MyEndpointBehavior : IEndpointBehavior
        {
            public void AddBindingParameters(ServiceEndpoint endpoint, BindingParameterCollection bindingParameters)
            {
            }

            public void ApplyClientBehavior(ServiceEndpoint endpoint, ClientRuntime clientRuntime)
            {
                clientRuntime.ClientMessageInspectors.Add(new MyMessageInspector());
            }

            public void ApplyDispatchBehavior(ServiceEndpoint endpoint, EndpointDispatcher endpointDispatcher)
            {
            }

            public void Validate(ServiceEndpoint endpoint)
            {
            }
        }

        public class MyMessageInspector : IClientMessageInspector
        {
            public object BeforeSendRequest(ref Message request, IClientChannel channel)
            {
                // Para imprimir el contenido del mensaje en la consola:
                var buffer = request.CreateBufferedCopy(int.MaxValue);
                var xdoc = XDocument.Parse(buffer.CreateMessage().ToString());

                var actionNode = xdoc.Descendants().FirstOrDefault(x => x.Name.LocalName.Contains("Action"));
                actionNode?.Remove();

                // Encontrar y remover el atributo MustUnderstand
                //var mustUnderstandAttribute = xdoc.Descendants().Attributes().FirstOrDefault(a => a.Name.LocalName.Equals("mustUnderstand"));
                //mustUnderstandAttribute?.Remove();

                var xmlDoc = new XmlDocument();
                xmlDoc.Load(xdoc.CreateReader());

                // Convertir el XDocument modificado de nuevo a un Message
                var modifiedMessage = Message.CreateMessage(new XmlNodeReader(xmlDoc), int.MaxValue, request.Version);

                // Actualizar el mensaje que se va a enviar
                request = modifiedMessage;

                var reqMsgProperty = new HttpRequestMessageProperty();

                string path = "";
                string password = "MIercoles.-0706";
                string fileName = "ducsa-test.pfx";


                string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
                var certificate = new X509Certificate2(certPath, password);

                // Convertir el certificado en un token de seguridad codificado en base64
                string certificateToken = Convert.ToBase64String(certificate.RawData);

                reqMsgProperty.Headers["Security"] = "<wsse:Security soapenv:mustUnderstand=\"1\">" +
                                                              "<wsse:BinarySecurityToken>" + certificateToken + "</wsse:BinarySecurityToken>" +
                                                              "</wsse:Security>";

                reqMsgProperty.Headers.Add("SOAPAction", "");

                request.Properties[HttpRequestMessageProperty.Name] = reqMsgProperty;

                return null;
            }

            public void AfterReceiveReply(ref Message reply, object correlationState)
            {
                // No necesitas hacer nada después de recibir la respuesta en este caso.
            }
        }

        public async Task<string> Test4()
        {
            try
            {
                string path = _configuration.GetSection("SistarBanc:RutaPath").Value;
                string password = _configuration.GetSection("SistarBanc:Password").Value;
                string fileName = _configuration.GetSection("SistarBanc:FileName").Value;

                string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
                var cert = new X509Certificate2(certPath, password);

                EndpointAddress ea = new EndpointAddress("https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago");

                WSHttpBinding b = new WSHttpBinding();
                b.Security.Mode = SecurityMode.Transport;
                b.Security.Transport.ClientCredentialType = HttpClientCredentialType.Certificate;

                // Create the client
                WsMediosPagoClient client = new WsMediosPagoClient(b, ea);
                client.ClientCredentials.ClientCertificate.Certificate = cert;

                var request = new altaClienteRequest
                {
                    codigoEntidad = "DUCSA",
                    idMedioPago = "",
                    tipoDocumentoCliente = "",
                    documentoCliente = "",
                    numeroServicio = new string[] { },
                    numeroTransaccion = ""
                };

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago");
                httpRequest.Headers.Add("SOAPAction", "");

                string to_send = SerializeToXml(request);

                httpRequest.Content = new StringContent(to_send, Encoding.UTF8, "text/xml");

                // Enviar la solicitud al servicio web
                var httpClient = new HttpClient();
                var response = await httpClient.SendAsync(httpRequest);

                // Verificar la respuesta
                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                }
                else
                {
                    // Manejar el error de la llamada al servicio web
                }

                var res = await client.altaClienteAsync("DUCSA", "idMedioPago", "tipoDocumentoCliente", "documentoCliente", new string[] { }, "numeroTransaccion");

                return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public async Task<string> Test3()
        {
            try
            {
                string path = _configuration.GetSection("SistarBanc:RutaPath").Value;
                string password = _configuration.GetSection("SistarBanc:Password").Value;
                string fileName = _configuration.GetSection("SistarBanc:FileName").Value;

                string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
                var certificate = new X509Certificate2(certPath, password);

                // Convertir el certificado en un token de seguridad codificado en base64
                string certificateToken = Convert.ToBase64String(certificate.RawData);

                var binding = new BasicHttpBinding(BasicHttpSecurityMode.TransportWithMessageCredential);
                binding.Security.Transport.ClientCredentialType = HttpClientCredentialType.Certificate;
                binding.Security.Message.ClientCredentialType = BasicHttpMessageCredentialType.Certificate;
                binding.MessageEncoding = WSMessageEncoding.Text;
                binding.TextEncoding = Encoding.UTF8;

                var endpoint = new EndpointAddress("https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago");

                var channelFactory = new ChannelFactory<WsMediosPago>(binding, endpoint);
                channelFactory.Credentials.ClientCertificate.Certificate = certificate;
                channelFactory.Credentials.ServiceCertificate.Authentication.CertificateValidationMode = X509CertificateValidationMode.None;

                var serviceClient = channelFactory.CreateChannel();

                using (var scope = new OperationContextScope((IClientChannel)serviceClient))
                {
                    // Configurar los headers
                    HttpRequestMessageProperty httpRequestProperty = new HttpRequestMessageProperty();
                    httpRequestProperty.Headers["SOAPAction"] = "\"\"";
                    // Insertar el token de seguridad en el encabezado
                    httpRequestProperty.Headers["Security"] = "<wsse:Security soapenv:mustUnderstand=\"1\">" +
                                                              "<wsse:BinarySecurityToken>" + certificateToken + "</wsse:BinarySecurityToken>" +
                                                              "</wsse:Security>";

                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = httpRequestProperty;

                    // Crear la solicitud
                    var request = new altaClienteRequest
                    {
                        codigoEntidad = "DUCSA",
                        idMedioPago = "",
                        tipoDocumentoCliente = "",
                        documentoCliente = "",
                        numeroServicio = new string[] { },
                        numeroTransaccion = ""
                    };

                    // Realizar la llamada al servicio
                    var responseTask = serviceClient.altaClienteAsync(request);
                    responseTask.Wait(); // Esto bloqueará el hilo hasta que la tarea asincrónica se complete
                    var response = responseTask.Result;
                    return response.ToString();
                }
            }
            catch (Exception ex)
            {
                return "El cliente dio error..." + ex.InnerException ?? ex.Message;
            }
        }

        public async Task<string> Test3FuncionaPeroNoEsWCF()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago?WSDL");
            request.Headers.Add("SOAPAction", "");
            request.Headers.Add("Security", "");
            var content = new StringContent("<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:wsm=\"https://spf.sistarbanc.com.uy/spfws/services/WsMediosPago\">\r\n    <soapenv:Header><wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsse:BinarySecurityToken EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\" ValueType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3\" wsu:Id=\"X509-90D390FDDCA07501FE168752286022011\">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</wsse:BinarySecurityToken><ds:Signature Id=\"SIG-90D390FDDCA07501FE168752286022314\" xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"><ec:InclusiveNamespaces PrefixList=\"soapenv wsm\" xmlns:ec=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/></ds:CanonicalizationMethod><ds:SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/><ds:Reference URI=\"#id-99C8D72B989D0CEC371686921784277236\"><ds:Transforms><ds:Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"><ec:InclusiveNamespaces PrefixList=\"wsm\" xmlns:ec=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/></ds:Transform></ds:Transforms><ds:DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/><ds:DigestValue>C35BkGakzsGv2LW8j+wyL/uFSY7UDtEVtrX9/sZ12zM=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>f0Dm1nmte/QjGGkAYuO98cfyNdFuFLukMQdDkwj41CGl4qeYhswzZgYhMHVDGRz/ZQrLjsNVvX/EZfpiYhwvm6BGQJCAZZ8BiXH6m47sTls1nu9patb4XcbBiBldt68HDQiPgK6YTw0IeY6j3uPn9yHpqcYpooFxl8cNTfM6EDErvigEpCmkubpM0t0xwIVPN5tCr5E9J6Phmcdv+4WUOJQ/+9WkPi/OoFml08bMtu6cMRJIWr/UJTTRtq+momh0O5n/vwKn1P5AN+LNZvz1OT8+yR+yl8cikGBwycAuMf6z+tzsPDlMUZ0O8iHhkH6PzCLDHGOla87UUVNHxUyMGy7ZMgYC+vun0sE/RbK3tW6Q3IWvxlpP5fhOvxuey6mbL9YJdtOGKqIopbpNH9RiOmqLCn8Wi1zwMXZAH6R4jHjZqX7MClPTjg6eZlqerKVAET2PzCeYbiwpAmtjgnsHgM3+hlv4IGMMV+B3BD4Lcfv7m/FsaKr/KgIthLIR9VolFCHG2+xP8tLA7pEA05WEEzu9+vTEJ5n2uJtiLRUCdOY0W5dKfTw5dJpOXu3bgAbD/kALcNNOr0fkX7a1nDGGf2tg1ddEOKQzdgGSa5XHVq0tWGg6pG6kaWb470zt0npbZtZpekmi3RroQ1nn7sfkJXTFFBMdTt9v4cjwEEh56l0=</ds:SignatureValue><ds:KeyInfo Id=\"KI-90D390FDDCA07501FE168752286022012\"><wsse:SecurityTokenReference wsu:Id=\"STR-90D390FDDCA07501FE168752286022013\"><wsse:Reference URI=\"#X509-90D390FDDCA07501FE168752286022011\" ValueType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3\"/></wsse:SecurityTokenReference></ds:KeyInfo></ds:Signature></wsse:Security>\r\n        \r\n    </soapenv:Header>\r\n    <soapenv:Body wsu:Id=\"id-99C8D72B989D0CEC371686921784277236\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsm:altaCliente>\r\n        <wsm:codigoEntidad>DUCSA</wsm:codigoEntidad>\r\n        <wsm:idMedioPago>?</wsm:idMedioPago>\r\n        <wsm:tipoDocumentoCliente>?</wsm:tipoDocumentoCliente>\r\n        <wsm:documentoCliente>?</wsm:documentoCliente>\r\n        <wsm:numeroServicio>?</wsm:numeroServicio>\r\n        <wsm:numeroTransaccion>?</wsm:numeroTransaccion>\r\n    </wsm:altaCliente></soapenv:Body>\r\n</soapenv:Envelope>", null, "application/xml");
            request.Content = content;

            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var contenido = await response.Content.ReadAsStringAsync();

            return contenido;
        }

        public WsMediosPago Test2()
        {
            // Obtén los valores de la configuración
            string path = _configuration.GetSection("SistarBanc:RutaPath").Value;
            string password = _configuration.GetSection("SistarBanc:Password").Value;
            string fileName = _configuration.GetSection("SistarBanc:FileName").Value;

            // Carga el certificado
            string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
            var certificate = new X509Certificate2(certPath, password);

            // Crea el objeto TextMessageEncodingBindingElement para SOAP 1.2
            var textBindingElement = new TextMessageEncodingBindingElement
            {
                MessageVersion = MessageVersion.Soap11
            };

            // Crea el objeto HttpsTransportBindingElement
            var binding = new CustomBinding();

            var httpsTransport = new HttpsTransportBindingElement();

            var securityBinding = SecurityBindingElement.CreateCertificateOverTransportBindingElement(MessageSecurityVersion.WSSecurity10WSTrustFebruary2005WSSecureConversationFebruary2005WSSecurityPolicy11BasicSecurityProfile10);
            securityBinding.IncludeTimestamp = true;
            securityBinding.SetKeyDerivation(false);

            var textEncoding = new TextMessageEncodingBindingElement()
            {
                MessageVersion = MessageVersion.CreateVersion(EnvelopeVersion.Soap11, AddressingVersion.None),
                WriteEncoding = Encoding.UTF8,
            };

            binding.Elements.Add(textEncoding);
            binding.Elements.Add(securityBinding);
            binding.Elements.Add(httpsTransport); // Esto ahora es el último elemento

            // Configura la dirección del endpoint
            var endpoint = new EndpointAddress("https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago");

            // Define los comportamientos de las credenciales
            var behaviors = new ClientCredentials();
            behaviors.ClientCertificate.Certificate = certificate;

            try
            {
                // Crea el cliente con el binding, endpoint y comportamientos configurados
                var factory = new ChannelFactory<DUCSA.App.Payments.Sistarbanc.Sistarbanc.MediosPago.WsMediosPago>(binding, endpoint);

                factory.Endpoint.Behaviors.Remove(typeof(ClientCredentials));
                factory.Endpoint.Behaviors.Add(behaviors);
                factory.Endpoint.EndpointBehaviors.Add(new AddSoapHeaderBehavior());
                factory.Endpoint.EndpointBehaviors.Add(new CustomEndpointBehavior("Content-Type", "application/soap+xml;charset=utf-8"));

                var client = factory.CreateChannel();

                if (((IClientChannel)client).State == CommunicationState.Faulted)
                {
                    Console.WriteLine("El cliente está en un estado de Faulted. Intentando cerrar...");
                    ((IClientChannel)client).Abort();
                }

                return client;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener el cliente del servicio: {ex.Message}");
                throw;
            }
        }

        public WsMediosPago Test1()
        {
            string path = _configuration.GetSection("SistarBanc:RutaPath").Value;
            string password = _configuration.GetSection("SistarBanc:Password").Value;
            string fileName = _configuration.GetSection("SistarBanc:FileName").Value;

            string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
            var certificate = new X509Certificate2(certPath, password);

            var binding = new CustomBinding();

            var httpsTransport = new HttpsTransportBindingElement();

            var securityBinding = SecurityBindingElement.CreateCertificateOverTransportBindingElement(MessageSecurityVersion.WSSecurity10WSTrustFebruary2005WSSecureConversationFebruary2005WSSecurityPolicy11BasicSecurityProfile10);
            securityBinding.IncludeTimestamp = true;
            securityBinding.SetKeyDerivation(false);

            var textEncoding = new TextMessageEncodingBindingElement()
            {
                MessageVersion = MessageVersion.CreateVersion(EnvelopeVersion.Soap11, AddressingVersion.None),
                WriteEncoding = Encoding.UTF8,
            };

            binding.Elements.Add(securityBinding);
            binding.Elements.Add(textEncoding);
            binding.Elements.Add(httpsTransport);

            var endpoint = new EndpointAddress("https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago");

            var behaviors = new ClientCredentials();
            behaviors.ClientCertificate.Certificate = certificate;

            try
            {
                var factory = new ChannelFactory<DUCSA.App.Payments.Sistarbanc.Sistarbanc.MediosPago.WsMediosPago>(binding, endpoint);

                factory.Endpoint.Behaviors.Remove(typeof(ClientCredentials));
                factory.Endpoint.Behaviors.Add(behaviors);
                factory.Endpoint.EndpointBehaviors.Add(new AddSoapHeaderBehavior());
                factory.Endpoint.EndpointBehaviors.Add(new CustomEndpointBehavior("Content-Type", "text/xml;charset=utf-8"));

                var client = factory.CreateChannel();

                if (((IClientChannel)client).State == CommunicationState.Faulted)
                {
                    Console.WriteLine("El cliente está en un estado de Faulted. Intentando cerrar...");
                    ((IClientChannel)client).Abort();
                }

                return client;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener el cliente del servicio: {ex.Message}");
                throw;
            }
        }

        public WsMediosPagoClient ObtenerCliente()
        {
            //Could not find endpoint element with name 'https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago' and 
            //    contract 'Sistarbanc.MediosPago.WsMediosPago' in the ServiceModel client configuration section.This might 
            //    be because no configuration file was found for your application, or because no endpoint element matching 
            //    this name could be found in the client element.

            return new WsMediosPagoClient("https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago");
        }

        public string FragrmentToSingningAgain(string xml, X509Certificate2 certificate, string id)
        {
            XmlDocument doc = new XmlDocument();
            doc.PreserveWhitespace = true;
            doc.LoadXml(xml);

            // Create a SignedXml object.
            SignedXml signedXml = new SignedXml(doc);

            // Add the key to the SignedXml document.
            signedXml.SigningKey = certificate.PrivateKey;

            // Get the RSA private key from the certificate
            RSACryptoServiceProvider rsaKey = (RSACryptoServiceProvider)certificate.PrivateKey;

            // Create a new instance of the RSAParameters structure.
            RSAParameters rsaParams = rsaKey.ExportParameters(false);

            // Create a new instance of the RSACryptoServiceProvider class.
            RSACryptoServiceProvider rsaKeyWithSha256 = new RSACryptoServiceProvider();

            // Import parameters into rsaKeyWithSha256.
            rsaKeyWithSha256.ImportParameters(rsaParams);

            // Set the key in the SignedXml object.
            signedXml.SigningKey = rsaKeyWithSha256;

            // Create a reference to be signed.
            Reference reference = new Reference();
            reference.Uri = "#SIG-64CB31E3E22EDE8FED168839302839860";

            // Add an enveloped transformation to the reference.
            XmlDsigEnvelopedSignatureTransform env = new XmlDsigEnvelopedSignatureTransform();
            reference.AddTransform(env);

            // Add the reference to the SignedXml object.
            signedXml.AddReference(reference);

            // Compute the signature.
            signedXml.ComputeSignature();

            // Get the XML representation of the signature and save it to an XmlElement object.
            XmlElement xmlDigitalSignature = signedXml.GetXml();

            // Append the element to the XML document.
            doc.DocumentElement.AppendChild(doc.ImportNode(xmlDigitalSignature, true));

            return doc.OuterXml;
        }

        public async Task<string> Test6()
        {
            try
            {
                string path = _configuration.GetSection("SistarBanc:RutaPath").Value;
                string password = _configuration.GetSection("SistarBanc:Password").Value;
                string fileName = _configuration.GetSection("SistarBanc:FileName").Value;

                string certPath = Path.Combine(Directory.GetCurrentDirectory(), path, fileName);
                var certificate = new X509Certificate2(certPath, password, X509KeyStorageFlags.Exportable | X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet);

                var uri = new Uri("https://spftest.sistarbanc.com.uy/spfws/services/WsMediosPago?WSDL");

                string srcXML = @"<wsm:altaCliente>
                                        <wsm:codigoEntidad>DUCSA</wsm:codigoEntidad>
                                        <wsm:idMedioPago>?</wsm:idMedioPago>
                                        <wsm:tipoDocumentoCliente>?</wsm:tipoDocumentoCliente>
                                        <wsm:documentoCliente>?</wsm:documentoCliente>
                                        <wsm:numeroServicio>?</wsm:numeroServicio>
                                        <wsm:numeroTransaccion>?</wsm:numeroTransaccion>
                                    </wsm:altaCliente>";

                string id = "id-" + Guid.NewGuid().ToString("N").ToUpper();

                string envelope = SOAPRequest.createSOAPRequest(srcXML, certificate, id);
                envelope = envelope.Replace("\" /", "\"/").Replace("\n", "").Replace("\r", "").Replace("\t", "");

                envelope = FragrmentToSingningAgain(envelope, certificate, id);

                using (var httpClientHandler = new HttpClientHandler())
                using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, uri))
                {
                    using (var client = new HttpClient(httpClientHandler))
                    {
                        request.Content = new StringContent(envelope, null, "application/xml");
                        request.Headers.Add("SOAPAction", "");

                        using (HttpResponseMessage response = await client.SendAsync(request))
                        {
                            if (response.IsSuccessStatusCode)
                            {
                                string responseString = await response.Content.ReadAsStringAsync();
                                return responseString;
                            }
                            else
                            {
                                return "El cliente dio error..." + response.StatusCode;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return "El cliente dio error..." + ex.InnerException ?? ex.Message;
            }
        }

        public void Test7()
        {
            //String configFile = args[0];
            //if (!File.Exists(configFile))
            //{
            //    Console.WriteLine("File not found! ");
            //    System.Environment.Exit(1);
            //}
            //config = new ConfigurationBuilder().SetBasePath(Path.GetDirectoryName(configFile)).AddJsonFile(Path.GetFileName(configFile), true, true).Build();
            //String srcXML = config["base-path"] + config["source-xml"];
            //if (args.Length > 1 && File.Exists(args[1]))
            //{
            //    srcXML = args[1];
            //}

            //Console.WriteLine("App Version: " + config["version"]);
            //Console.WriteLine("Current Directoty = " + System.IO.Directory.GetCurrentDirectory());
            //Uri uri = new Uri(config["endpoint"]);
            //X509Certificate2 clientCertificate = new X509Certificate2(config["base-path"] + config["client-certificate"], config["certificate-password"], X509KeyStorageFlags.PersistKeySet);
            //X509Certificate2 serverCertificate = new X509Certificate2(config["base-path"] + config["server-certificate"]);
            //String envelope = SOAPRequest.createSOAPRequest(srcXML, clientCertificate);


            //using (var httpClientHandler = new HttpClientHandler())
            //using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, uri))
            //{
            //    httpClientHandler.ServerCertificateCustomValidationCallback = (message, certificate, chain, errors) => {
            //        Console.WriteLine("HTTP Request Headers: " + message.Headers);
            //        Console.WriteLine("Remote Server Identity: " + certificate.Subject);
            //        // To disable SSL validation return true.
            //        // return true;
            //        return certificate.Equals(serverCertificate);
            //    };
            //    using (var client = new HttpClient(httpClientHandler))
            //    {
            //        request.Content = new StringContent(envelope, Encoding.UTF8, "application/soap+xml");
            //        request.Headers.Add("SOAPAction", config["SOAPAction"]);
            //        using (HttpResponseMessage response = client.SendAsync(request).Result)
            //        {
            //            if (response.IsSuccessStatusCode)
            //            {
            //                response.Content.ReadAsStringAsync().ContinueWith(task =>
            //                {
            //                    Console.WriteLine("----- Server Response -----");
            //                    Console.WriteLine(task.Result);
            //                }, TaskContinuationOptions.ExecuteSynchronously);
            //            }
            //        }
            //    }
            //}
        }

        public async Task<string> Test8()
        {
            return "";
        }
    }
}
