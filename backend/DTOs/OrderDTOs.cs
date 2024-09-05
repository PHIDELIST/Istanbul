using System;
using System.Collections.Generic;

namespace backend.DTOs
{
    public class OrderDto
    {
        public long OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public long UserId { get; set; }
        public string UserFirstName { get; set; }
        public bool Delivered { get; set; }
        public List<OrderProductDto> Products { get; set; }
    }

    public class OrderProductDto
    {
        public long OrderProductId { get; set; }
        public long ProductId { get; set; }
         public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public class CreateOrderRequest
    {
        public DateTime OrderDate { get; set; }
        public long UserId { get; set; }
        public List<CreateOrderProductRequest> Products { get; set; }
    }

    public class CreateOrderProductRequest
    {
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public class CreateOrderResponse
    {
        public OrderDto Order { get; set; }
    }

    public class GetOrdersResponse
    {
        public List<OrderDto> Orders { get; set; }
    }

    public class GetOrderResponse
    {
        public OrderDto Order { get; set; }
    }
     public class OrdersWithCountResponse
    {
        public int OrderCount { get; set; }
        public List<OrderDto> Orders { get; set; }
    }
     public class SalesResponse
    {
        public IEnumerable<OrderDto> Sales { get; set; }
        public decimal TotalSales { get; set; }
    }
}
