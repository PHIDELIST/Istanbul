using backend.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.EntityConfigs
{
    public class ProductConfig : IEntityTypeConfiguration<ProductEntity>
    {
        public void Configure(EntityTypeBuilder<ProductEntity> builder)
        {
            builder.ToTable("Products");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name)
                .IsRequired() 
                .HasMaxLength(100); 

            builder.Property(p => p.ImageAlt)
                .HasMaxLength(255); 

            builder.Property(p => p.CategoryName)
                .IsRequired() 
                .HasMaxLength(100); 

            builder.Property(p => p.Price)
                .IsRequired(); 

            
        }
    }
}
