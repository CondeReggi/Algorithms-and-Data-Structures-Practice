namespace Controllers
{
    [Route("api/Sms")]
    public class SmsController : Controller
    {
        public readonly ISmsService _smsService;
        public readonly IConfiguration _configuration;

        public SmsController(ISmsService smsService, IConfiguration configuration)
        {
            _smsService = smsService;
            _configuration = configuration;
        }

        [HttpGet("smsPrueba")]
        public async Task<ActionResult<Result>> SmsPrueba(string destAddress, string shortMessage, string sourceAddress)
        {
            try
            {
                Serilog.Log.Logger.Information($"Iniciando endpoint con datos: destAddress:{destAddress} shortMessage:{shortMessage} sourceAddress:{sourceAddress}");
                
                var response = await _smsService.SubmitSMS(new SubmitSMSRequest
                {
                    auth = new Auth
                    {
                        usuario = _configuration.GetSection("SmsService:Username").Value,
                        password = _configuration.GetSection("SmsService:Password").Value,
                    },
                    parameters = new TypeMessage<SmsParameters>
                    {
                        Message = new SmsParameters
                        {
                            destAddress = destAddress,
                            shortMessage = shortMessage,
                            sourceAddress = sourceAddress
                        }
                    },
                });

                Serilog.Log.Logger.Information($"Response: {JsonConvert.SerializeObject(response)}");

                return Ok(response);
            }
            catch (Exception ex)
            {
                Serilog.Log.Logger.Error($"Ourrio un error: {ex}");
                return BadRequest(ex);
            }
        }
    }
}
