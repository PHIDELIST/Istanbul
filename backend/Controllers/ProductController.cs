using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;
using backend.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<GetProducts>> GetProducts()
        {
            var result = await _productService.GetProductsAsync();
            return Ok(result);
        }

        [HttpGet("{productId}")]
        [AllowAnonymous]
        public async Task<ActionResult<GetProduct>> GetProduct(long productId)
        {
            var result = await _productService.GetProductAsync(productId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<CreateProductResponse>> CreateProduct([FromForm] CreateProductRequest request, IFormFile image)
        {
            request.Image = image; 
            var result = await _productService.CreateProductAsync(request);
            return CreatedAtAction(nameof(GetProduct), new { productId = result.Product.Id }, result);
        }

        [HttpPut("{productId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateProduct(long productId, [FromForm] UpdateProductRequest request, IFormFile image)
        {
            request.Image = image; 
            var result = await _productService.UpdateProductAsync(productId, request);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("{productId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteProduct(long productId)
        {
            var result = await _productService.DeleteProductAsync(productId);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("count")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<int>> GetProductCount()
        {
            var count = await _productService.GetProductCountAsync();
            return Ok(count);
        }
    }
}
