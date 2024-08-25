using backend.Database.Entities;
using backend.DTOs;

namespace backend.Interfaces;

public interface IAuthService
{
    Task<UserEntity?> UserExists(string email);

    Task<string> SaveUser(RegistrationDto registrationDto);

    Task<RoleEntity?> GetUserRole(Guid? roleId, long? id, string roleName);
}