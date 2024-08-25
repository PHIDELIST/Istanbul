using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using backend.Database.Entities;

namespace backend.Database.EntityConfigs
{
    public class UserConfig : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.ToTable("Users");
            builder.Property(b => b.RowVersion);
            builder.Property(uid => uid.UserId)
                .ValueGeneratedOnAdd();
            builder.HasOne<RoleEntity>(rle => rle.RoleEntity)
                .WithMany()
                .HasForeignKey(usr => usr.UserRoleId);

            builder.HasMany(o => o.Orders)
                .WithOne(u => u.User)
                .HasForeignKey(o => o.UserId);
        }
    }
}
