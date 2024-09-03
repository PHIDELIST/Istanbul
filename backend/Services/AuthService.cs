using backend.Database;
using backend.Database.Entities;
using backend.DTOs;
using backend.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

namespace backend.Services;

public class AuthService : IAuthService

{
    private readonly DatabaseContext _context;
    private readonly PasswordService _passwordService;
    private readonly TokenService _tokenService;
    private readonly IMapper _mapper;

    public AuthService(
        DatabaseContext databaseContext,
        PasswordService passwordService,
        IConfiguration config,
        IMapper mapper
    )
    {
        _context = databaseContext;
        _passwordService = passwordService;
        _tokenService = new TokenService(config);
        _mapper = mapper;
    }


    public async Task<UserEntity?> UserExists(string email)
    {
        var userExists =
            await _context.UserEntities.FirstOrDefaultAsync(entity => entity.Email == email);

        return userExists;
    }

    public async Task<string> SaveUser(RegistrationDto registrationDto)
    {
        var roleId = await GetUserRole(registrationDto.UserRoleId ?? null, null);
        var user = new UserEntity
        {
            FirstName = registrationDto.FirstName,
            LastName = registrationDto.LastName,
            Email = registrationDto.Email,
            PasswordHash = _passwordService.CreatePasswordHash(registrationDto.Password),
            UserRoleId = roleId?.Id,
            RegistrationDtm = DateTime.Now,
        };

        await _context.UserEntities.AddAsync(user);

        await _context.SaveChangesAsync();

        var token = _tokenService.CreateToken(user, roleId?.RoleName);

        return token;
    }


    public async Task<RoleEntity?> GetUserRole(Guid? roleId, long? id, string roleName = "User")
    {
        var roleQuery = _context.RoleEntities.AsQueryable();

        if (roleId.HasValue && roleId != Guid.Empty)
        {
            roleQuery = roleQuery.Where(rl => rl.RoleId == roleId);
        }
        else if (id.HasValue && id != 0)
        {
            roleQuery = roleQuery.Where(rl => rl.Id == id);
        }

        else
        {
            roleQuery = roleQuery.Where(rl => rl.RoleName == roleName);
        }


        return await roleQuery.FirstOrDefaultAsync() ?? null;
    }
     public async Task<bool> UpdateUserProfile(int userId, UpdateProfileDto updateProfileDto)
        {
            var user = await _context.UserEntities.FirstOrDefaultAsync(u => u.Id== userId);

            if (user == null)
            {
                return false; 
            }

            _mapper.Map(updateProfileDto, user);

            user.UpdatedDtm = DateTime.UtcNow;

            _context.UserEntities.Update(user);
            await _context.SaveChangesAsync();

            return true; 
        }
        public async Task<GetUserProfileDto?> GetUserProfile(int userId)
    {
        var user = await _context.UserEntities
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            return null;
        }

        return _mapper.Map<GetUserProfileDto>(user);
    }
}
