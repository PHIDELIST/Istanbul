namespace backend.Controllers;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MpesaController : ControllerBase
{
    private readonly MpesaService _mpesaService;

    public MpesaController()
    {
        _mpesaService = new MpesaService();
    }

    /// <summary>
    /// Initiates an STK Push transaction
    /// </summary>
    /// <param name="phoneNumber">The customer's phone number in international format (e.g., 2547XXXXXXXX).</param>
    /// <param name="amount">The amount to be charged.</param>
    /// <param name="reference">The account or order reference.</param>
    /// <returns>A response indicating the success of the initiation.</returns>
    [HttpPost("initiate")]
    public async Task<IActionResult> InitiateTransaction([FromBody] InitiateTransactionRequest request)
    {
        if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Reference) || request.Amount <= 0)
        {
            return BadRequest(new { message = "PhoneNumber, Amount, and Reference are required." });
        }
        try
        {
            await _mpesaService.InitiateStkPush(request.PhoneNumber, request.Amount, request.Reference);
            return Ok("STK Push transaction initiated successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest($"Error initiating transaction: {ex.Message}");
        }
    }

    /// <summary>
    /// Receives payment confirmation callback from Safaricom
    /// </summary>
    /// <param name="data">The confirmation data received from M-Pesa.</param>
    /// <returns>An acknowledgment response.</returns>
    [HttpPost("confirmation")]
    public IActionResult ReceiveConfirmation([FromBody] dynamic data)
    {
        // Log or process the confirmation data as needed.
        Console.WriteLine($"Confirmation received: {data}");

        // Return the acknowledgment response required by Safaricom.
        return Ok(new { ResultCode = 0, ResultDesc = "Accepted" });
    }
}
