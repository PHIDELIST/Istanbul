using System;
using System.Collections.Generic;

namespace backend.Database.Entities
{
    public class OrderEntity
    {
        public long OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public long UserId { get; set; }
        public UserEntity User { get; set; }
        public ICollection<OrderProductEntity> OrderProducts { get; set; } = new List<OrderProductEntity>();
        
        public bool Delivered { get; set; }
    }

    public class OrderProductEntity
    {
        public long OrderProductId { get; set; }
        public long OrderId { get; set; }
        public OrderEntity Order { get; set; }
        public long ProductId { get; set; }
        public ProductEntity Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
