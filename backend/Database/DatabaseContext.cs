using backend.Database.Entities;
using backend.Database.EntityConfigs;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        protected DatabaseContext()
        {
        }
        
        public virtual DbSet<UserEntity> UserEntities { get; set; }
        public virtual DbSet<RoleEntity> RoleEntities { get; set; }
        public virtual DbSet<ProductEntity> ProductEntities { get; set; }
        public virtual DbSet<OrderEntity> OrderEntities { get; set; }
        public virtual DbSet<OrderProductEntity> OrderProductEntities { get; set; }  // Updated to match naming conventions

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new RoleConfig());
            modelBuilder.ApplyConfiguration(new ProductConfig());
            modelBuilder.ApplyConfiguration(new OrderConfig());  
            modelBuilder.ApplyConfiguration(new OrderProductConfig()); 
        }
    }
}
