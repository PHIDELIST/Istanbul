using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using backend.Database.Entities;

namespace backend.Database.EntityConfigs
{
    public class OrderConfig : IEntityTypeConfiguration<OrderEntity>
    {
        public void Configure(EntityTypeBuilder<OrderEntity> builder)
        {
            builder.ToTable("Orders");

            // Define primary key
            builder.HasKey(o => o.OrderId);

            builder.Property(o => o.OrderId)
                .ValueGeneratedOnAdd();
                
            builder.Property(o => o.OrderDate)
                .IsRequired();

            builder.Property(o => o.Delivered)
                .HasDefaultValue(false);

            builder.HasOne(o => o.User)
                .WithMany(u => u.Orders) 
                .HasForeignKey(o => o.UserId);

            builder.HasMany(o => o.OrderProducts)
                .WithOne(op => op.Order)
                .HasForeignKey(op => op.OrderId);
        }
    }

    public class OrderProductConfig : IEntityTypeConfiguration<OrderProductEntity>
    {
        public void Configure(EntityTypeBuilder<OrderProductEntity> builder)
        {
            builder.ToTable("OrderProducts");

            // Define primary key
            builder.HasKey(op => op.OrderProductId);

            builder.Property(op => op.OrderProductId)
                .ValueGeneratedOnAdd();

            builder.Property(op => op.Quantity)
                .IsRequired();

            builder.Property(op => op.Price)
                .IsRequired();

            builder.HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            builder.HasOne(op => op.Product)
                .WithMany() 
                .HasForeignKey(op => op.ProductId);
        }
    }
}
