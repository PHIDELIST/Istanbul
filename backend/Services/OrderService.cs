using AutoMapper;
using backend.Database;
using backend.Database.Entities;
using backend.DTOs;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class OrderService : IOrderService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public OrderService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrderDto> CreateOrderAsync(OrderDto orderDto)
        {
            var orderEntity = _mapper.Map<OrderEntity>(orderDto);
            _context.OrderEntities.Add(orderEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<OrderDto>(orderEntity);
        }

        public async Task<OrderDto> GetOrderByIdAsync(long orderId)
        {
            var orderEntity = await _context.OrderEntities
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            return _mapper.Map<OrderDto>(orderEntity);
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(long userId)
        {
            var orders = await _context.OrderEntities
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToListAsync();

            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<OrdersWithCountResponse> GetAllOrdersAsync()
        {
            var orders = await _context.OrderEntities
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToListAsync();

            var orderDtos = _mapper.Map<List<OrderDto>>(orders);

            return new OrdersWithCountResponse
            {
                OrderCount = orderDtos.Count,
                Orders = orderDtos
            };
        }

    }
}
