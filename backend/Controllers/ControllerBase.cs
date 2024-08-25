using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class ControllerBase: Microsoft.AspNetCore.Mvc.ControllerBase
{
    
}
