﻿using backend.Database;
using backend.Database.Entities;
using backend.DTOs;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class RoleService : IRoleService
{
    private readonly DatabaseContext _context;
    private readonly TokenService _tokenService;

    public RoleService(DatabaseContext databaseContext,
        TokenService tokenService
    )
    {
        _context = databaseContext;
        _tokenService = tokenService;
    }


    public async Task<List<RoleEntity>> GetRoles()
    {
        var roles = await _context.RoleEntities.ToListAsync();
        return roles;
    }

    public async Task<RoleEntity> AddRole(RoleDto roleDto, HttpContext httpContext)
    {
        var role = new RoleEntity
        {
            RoleName = roleDto.RoleName,
            RoleDescription = roleDto.RoleDescription,
            CreatedDtm = DateTime.Now,
            CreatedBy = Convert.ToInt64(_tokenService
                .DecodeTokenFromHeaders(httpContext.Request,
                    "id")
            )
        };

        await _context.RoleEntities.AddAsync(role);
        await _context.SaveChangesAsync();
        return role;
    }

    public async Task<RoleEntity?> RoleExists(string roleName)
    {
        var roleExists = await _context
            .RoleEntities
            .FirstOrDefaultAsync(rle => rle.RoleName == roleName);

        return roleExists;
    }

    public async Task<RoleEntity> UpdateRole(UpdateRoleDto updateRoleDto, RoleEntity roleEntity,
        HttpContext httpContext)
    {
        roleEntity.RoleName = updateRoleDto.RoleName;
        roleEntity.RoleDescription = updateRoleDto.RoleDescription;
        roleEntity.UpdatedDtm = DateTime.Now;
        roleEntity.UpdatedBy = Convert.ToInt64(_tokenService
            .DecodeTokenFromHeaders(httpContext.Request,
                "id")
        );

        await _context.SaveChangesAsync();
        return roleEntity;
    }
}