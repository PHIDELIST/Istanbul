using RestSharp;
using Newtonsoft.Json;
using System.Text;

public class MpesaService
{
    private readonly string _consumerKey = "S";
    private readonly string _consumerSecret = "";
    private readonly string _shortCode = "600584"; // Business Short Code
    private readonly string _passKey = ""; // Lipa na Mpesa Online Passkey
    private readonly string _baseUrl = "https://sandbox.safaricom.co.ke"; // Use production URL in live mode

    public async Task<string?> GenerateAccessToken()
    {
        var client = new RestClient($"{_baseUrl}/oauth/v1/generate?grant_type=client_credentials");
        var request = new RestRequest();
        request.AddHeader("Authorization", "Basic " + Convert.ToBase64String(
            Encoding.UTF8.GetBytes($"{_consumerKey}:{_consumerSecret}")));

        var response = await client.ExecuteAsync(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("Failed to generate access token");
        }

        var data = JsonConvert.DeserializeObject<dynamic>(response.Content!);
        return data?.access_token;
    }

    public async Task RegisterUrls(string validationUrl, string confirmationUrl)
    {
        var token = await GenerateAccessToken();
        var client = new RestClient($"{_baseUrl}/mpesa/c2b/v1/registerurl");
        var request = new RestRequest("POST");
        request.AddHeader("Authorization", "Bearer " + token);
        request.AddJsonBody(new
        {
            ShortCode = _shortCode,
            ResponseType = "Completed",
            ConfirmationURL = confirmationUrl,
            ValidationURL = validationUrl
        });

        var response = await client.ExecuteAsync(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("Failed to register URLs");
        }
    }

    public async Task InitiateStkPush(string phoneNumber, decimal amount, string reference)
    {
        var token = await GenerateAccessToken();
        var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
        var password = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{_shortCode}{_passKey}{timestamp}"));

        var client = new RestClient($"{_baseUrl}/mpesa/stkpush/v1/processrequest");
        var request = new RestRequest("POST");
        request.AddHeader("Authorization", "Bearer " + token);
        request.AddJsonBody(new
        {
            BusinessShortCode = _shortCode,
            Password = password,
            Timestamp = timestamp,
            TransactionType = "CustomerPayBillOnline",
            Amount = amount,
            PartyA = phoneNumber,
            PartyB = _shortCode,
            PhoneNumber = phoneNumber,
            CallBackURL = "https://4b7a-102-215-33-50.ngrok-free.app/api/Mpesa/confirmation", // Replace with your actual callback URL
            AccountReference = reference,
            TransactionDesc = "Payment for Order"
        });

        var response = await client.ExecuteAsync(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("Failed to initiate STK push: " + response.Content);
        }
    }
}
