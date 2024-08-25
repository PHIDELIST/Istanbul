using backend.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.EntityConfigs;

public class RoleConfig : IEntityTypeConfiguration<RoleEntity>
{
    public void Configure(EntityTypeBuilder<RoleEntity> builder)
    {
        builder.ToTable("Roles");
        builder.Property(rl => rl.RowVersion);
        builder.Property(rl => rl.RoleId)
            .ValueGeneratedOnAdd();
    }
}