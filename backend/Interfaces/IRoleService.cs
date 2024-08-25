using backend.Database.Entities;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces;

public interface IRoleService
{
    Task<RoleEntity?> RoleExists(string roleName);
    Task<List<RoleEntity>> GetRoles();
    Task<RoleEntity> AddRole(RoleDto roleDto, HttpContext httpContext);
    Task<RoleEntity> UpdateRole(UpdateRoleDto updateRoleDto, 
        RoleEntity roleEntity, HttpContext httpContext
        );
}