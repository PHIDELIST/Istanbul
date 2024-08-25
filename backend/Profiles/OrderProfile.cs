using AutoMapper;
using backend.Database.Entities;
using backend.DTOs;

namespace backend.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            // Map from OrderDto to OrderEntity
            CreateMap<OrderDto, OrderEntity>()
                .ForMember(dest => dest.OrderProducts, opt => opt.MapFrom(src => src.Products));
            
            // Map from OrderEntity to OrderDto
            CreateMap<OrderEntity, OrderDto>()
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.OrderProducts));

            // Map from OrderProductDto to OrderProductEntity
            CreateMap<OrderProductDto, OrderProductEntity>();

            // Map from OrderProductEntity to OrderProductDto
            CreateMap<OrderProductEntity, OrderProductDto>();

            // Map from CreateOrderRequest to OrderEntity
            CreateMap<CreateOrderRequest, OrderEntity>()
                .ForMember(dest => dest.OrderProducts, opt => opt.MapFrom(src => src.Products));

            // Map from CreateOrderProductRequest to OrderProductEntity
            CreateMap<CreateOrderProductRequest, OrderProductEntity>();
        }
    }
}
