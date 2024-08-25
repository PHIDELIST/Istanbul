using backend.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.EntityConfigs;

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
    }
}