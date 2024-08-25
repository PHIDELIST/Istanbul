using AutoMapper;
using backend.Database.Entities;
using backend.DTOs;

namespace backend.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductEntity, GetProduct>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ImageAlt, opt => opt.MapFrom(src => src.ImageAlt))
                .ForMember(dest => dest.ImageSrc, opt => opt.MapFrom(src => src.ImageSrc))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.CategoryName))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price));

        }
    }
}