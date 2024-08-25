using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AutoMapper;
namespace backend.Controllers;

[ApiController]
[Route("/auth")]
[AllowAnonymous]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly PasswordService _passwordService;
    private readonly TokenService _tokenService;
    private readonly IMapper _mapper;

    public AuthController(
        AuthService authService,
        PasswordService passwordService,
        TokenService tokenService,
        IMapper mapper
    )
    {
        _authService = authService;
        _passwordService = passwordService;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    /// <summary>
    /// Creates a new user.
    /// </summary>
    /// <param name="registrationDto"></param>
    /// <returns>Returns a token</returns>
    /// <response code="200">Returns a token</response>
    /// <response code="409">If user already exists</response>
    [HttpPost]
    [Route("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> RegisterUser([FromBody] RegistrationDto registrationDto)
    {
        var userExists = await _authService.UserExists(registrationDto.Email);

        if (userExists != null)
        {
            return Conflict(new { message = "User exists" });
        }

        var result = await _authService.SaveUser(registrationDto);

        return Ok(new { token = result });
    }

    /// <summary>
    /// Logins in a user.
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns>Returns a token</returns>
    /// <response code="200">Returns a token</response>
    /// <response code="404">If user does not exist / password is wrong</response>
    [HttpPost]
    [Route("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> LoginUserAsync([FromBody] LoginDto loginDto)
    {
        var userExists = await _authService.UserExists(loginDto.Email);

        if (userExists == null)
        {
            return NotFound(new { message = "Invalid email or password provided" });
        }

        // Validate password
        var isValidPassword = _passwordService.PasswordIsValid(loginDto.Password, userExists.PasswordHash);

        if (!isValidPassword) return NotFound(new { message = "Invalid password provided" });

        var roleName = await _authService.GetUserRole(null, userExists.UserRoleId, null);

        var token = _tokenService.CreateToken(userExists, roleName?.RoleName);

        // Return user profile along with token
        var userProfile = new
        {
            userExists.FirstName,
            userExists.LastName,
            userExists.Email,
            userExists.PhoneNumber, // Include other relevant fields here
            userExists.Address,
            userExists.City,
            userExists.State,
            userExists.ZipCode,
            userExists.Country
        };

        return Ok(new { token, profile = userProfile });
    }

    [HttpPut]
    [Route("update-profile")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateProfileDto updateProfileDto)
    {
        // Extract user ID from the claims
        var userIdClaim = User.FindFirstValue("id");
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
        {
            return BadRequest(new { message = "Invalid user" });
        }

        var updatedUser = await _authService.UpdateUserProfile(userId, updateProfileDto);

        if (updatedUser == null)
        {
            return BadRequest(new { message = "Error updating profile" });
        }

        return Ok(updatedUser);
    }

}