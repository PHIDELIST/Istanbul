using AutoMapper;
using backend.DTOs;
using backend.Database.Entities;

namespace backend.Profiles
{
    public class ProfileProfile : Profile
    {
        public ProfileProfile()
        {
            CreateMap<UpdateProfileDto, UserEntity>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
