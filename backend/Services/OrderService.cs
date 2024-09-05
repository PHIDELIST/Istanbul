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

            if (orderEntity == null)
                return null;

            var orderDto = _mapper.Map<OrderDto>(orderEntity);
            
            foreach (var orderProduct in orderDto.Products)
            {
                var product = orderEntity.OrderProducts
                    .FirstOrDefault(op => op.ProductId == orderProduct.ProductId)?.Product;

                if (product != null)
                {
                    orderProduct.ProductName = product.Name;
                }
            }

            var user = await _context.UserEntities.FindAsync(orderEntity.UserId);
            orderDto.UserFirstName = user?.FirstName;

            return orderDto;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(long userId)
        {
            var orders = await _context.OrderEntities
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToListAsync();

            var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);

            foreach (var orderDto in orderDtos)
            {
                foreach (var orderProduct in orderDto.Products)
                {
                    var product = orders
                        .SelectMany(o => o.OrderProducts)
                        .FirstOrDefault(op => op.ProductId == orderProduct.ProductId)?.Product;

                    if (product != null)
                    {
                        orderProduct.ProductName = product.Name;
                    }
                }

                var user = await _context.UserEntities.FindAsync(orderDto.UserId);
                orderDto.UserFirstName = user?.FirstName;
            }

            return orderDtos;
        }

        public async Task<OrdersWithCountResponse> GetAllOrdersAsync()
        {
            var orders = await _context.OrderEntities
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToListAsync();

            var orderDtos = _mapper.Map<List<OrderDto>>(orders);

            foreach (var orderDto in orderDtos)
            {
                foreach (var orderProduct in orderDto.Products)
                {
                    var product = orders
                        .SelectMany(o => o.OrderProducts)
                        .FirstOrDefault(op => op.ProductId == orderProduct.ProductId)?.Product;

                    if (product != null)
                    {
                        orderProduct.ProductName = product.Name;
                    }
                }

                var user = await _context.UserEntities.FindAsync(orderDto.UserId);
                orderDto.UserFirstName = user?.FirstName;
            }

            return new OrdersWithCountResponse
            {
                OrderCount = orderDtos.Count,
                Orders = orderDtos
            };
        }

        public async Task<bool> MarkOrderAsDeliveredAsync(long orderId)
        {
            var order = await _context.OrderEntities.FindAsync(orderId);

            if (order == null)
                return false;

            order.Delivered = true;
            _context.OrderEntities.Update(order);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<SalesResponse> GetSalesAsync()
        {
            var deliveredOrders = await _context.OrderEntities
                .Where(o => o.Delivered)
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToListAsync();

            var totalSales = deliveredOrders.Sum(o => o.OrderProducts.Sum(p => p.Quantity * p.Price));
            var salesDtos = _mapper.Map<IEnumerable<OrderDto>>(deliveredOrders);

            foreach (var salesDto in salesDtos)
            {
                foreach (var orderProduct in salesDto.Products)
                {
                    var product = deliveredOrders
                        .SelectMany(o => o.OrderProducts)
                        .FirstOrDefault(op => op.ProductId == orderProduct.ProductId)?.Product;

                    if (product != null)
                    {
                        orderProduct.ProductName = product.Name;
                    }
                }

                var user = await _context.UserEntities.FindAsync(salesDto.UserId);
                salesDto.UserFirstName = user?.FirstName;
            }

            return new SalesResponse
            {
                Sales = salesDtos,
                TotalSales = totalSales
            };
        }
    }
}
