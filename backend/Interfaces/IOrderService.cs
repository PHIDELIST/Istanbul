using backend.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(OrderDto orderDto);
        Task<OrderDto> GetOrderByIdAsync(long orderId);
        Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(long userId);
        Task<OrdersWithCountResponse> GetAllOrdersAsync();  
        Task<bool> MarkOrderAsDeliveredAsync(long orderId);  
        Task<SalesResponse> GetSalesAsync();  
    }
}
