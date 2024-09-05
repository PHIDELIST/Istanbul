using AutoMapper;
using backend.Database.Entities;
using backend.DTOs;

namespace backend.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderDto, OrderEntity>()
                .ForMember(dest => dest.OrderProducts, opt => opt.MapFrom(src => src.Products));
            
            CreateMap<OrderEntity, OrderDto>()
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.OrderProducts));

            CreateMap<OrderProductDto, OrderProductEntity>();

            CreateMap<OrderProductEntity, OrderProductDto>();

            CreateMap<CreateOrderRequest, OrderEntity>()
                .ForMember(dest => dest.OrderProducts, opt => opt.MapFrom(src => src.Products));
            CreateMap<CreateOrderProductRequest, OrderProductEntity>();
        }
    }
}
