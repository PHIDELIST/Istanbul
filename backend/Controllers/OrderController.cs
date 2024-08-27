using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
        {
            var userIdClaim = User.FindFirstValue("id");
            if (string.IsNullOrEmpty(userIdClaim) || !long.TryParse(userIdClaim, out var userId))
            {
                return BadRequest(new { message = "Invalid user" });
            }

            orderDto.UserId = userId; // Ensure the order has the user ID
            var createdOrder = await _orderService.CreateOrderAsync(orderDto);
            return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.OrderId }, createdOrder);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetOrderById(long id)
        {
            var userIdClaim = User.FindFirstValue("id");
            if (string.IsNullOrEmpty(userIdClaim) || !long.TryParse(userIdClaim, out var userId))
            {
                return BadRequest(new { message = "Invalid user" });
            }

            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null || order.UserId != userId)
            {
                return Forbid(); // Forbidden if the user does not own the order
            }

            return Ok(order);
        }

        [HttpGet("user-orders")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserOrders()
        {
            var userIdClaim = User.FindFirstValue("id");
            if (string.IsNullOrEmpty(userIdClaim) || !long.TryParse(userIdClaim, out var userId))
            {
                return BadRequest(new { message = "Invalid user" });
            }

            var userOrders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(new
            {
                Orders = userOrders,
                Count = userOrders.Count()
            });
        }
        [HttpGet("all-orders")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrders()
        {
            var ordersWithCount = await _orderService.GetAllOrdersAsync();
            return Ok(new
            {
                Orders = ordersWithCount.Orders,
                Count = ordersWithCount.OrderCount
            });
        }

        [HttpPost("{id}/deliver")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> MarkOrderAsDelivered(long id)
        {
            var success = await _orderService.MarkOrderAsDeliveredAsync(id);
            if (!success)
            {
                return NotFound(new { message = "Order not found" });
            }

            return Ok(new { message = "Order marked as delivered" });
        }

        [HttpGet("sales")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSales()
        {
            var salesResponse = await _orderService.GetSalesAsync();
            return Ok(new
            {
                Sales = salesResponse.Sales,
                TotalSales = salesResponse.TotalSales
            });
        }

    }
}
