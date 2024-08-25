using System.ComponentModel.DataAnnotations;

namespace backend.Database.Entities;

public sealed class UserEntity
{
    public long Id { get; set; }
    public Guid UserId { get; set; } = Guid.NewGuid();
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public string? PhoneNumber { get; set; }  
    public string? Address { get; set; }  
    public string? City { get; set; }  
    public string? State { get; set; }  
    public string? ZipCode { get; set; }  
    public string? Country { get; set; }  
    public string? ResetToken { get; set; }
    public DateTime? ResetTokenExpiryDtm { get; set; }
    public DateTime RegistrationDtm { get; set; } = DateTime.UtcNow;
    public long? UserRoleId { get; set; } = 3;
    public DateTime? UpdatedDtm { get; set; }
    public bool IsDeleted { get; set; }
    public long? DeletedBy { get; set; }
    public DateTime? DeletedDtm { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; }

    public RoleEntity RoleEntity { get; set; }
    public ICollection<OrderEntity> Orders { get; set; } = new List<OrderEntity>(); 
}
