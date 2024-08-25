using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;
using backend.Interfaces;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<GetProducts>> GetProducts()
        {
            var result = await _productService.GetProductsAsync();
            return Ok(result);
        }

        [HttpGet("{productId}")]
        [Authorize(Roles = "admin")] // Require 'admin' role for this action
        public async Task<ActionResult<GetProduct>> GetProduct(long productId)
        {
            var result = await _productService.GetProductAsync(productId);

            if (result == null)
            {
                return NotFound(); 
            }

            return Ok(result);
        }
    }
}
