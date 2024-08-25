using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces;

public interface IErrorService
{
    ObjectResult CatchException(Exception exception, string? errorMessage);
}