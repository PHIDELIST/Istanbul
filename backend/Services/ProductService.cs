using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Database;
using backend.Database.Entities;
using backend.DTOs;
using backend.Interfaces;
using AutoMapper;

namespace backend.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly DatabaseContext _context;

        public ProductService(IMapper mapper, DatabaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<GetProducts> GetProductsAsync()
        {
            var dbProducts = await _context.ProductEntities.ToListAsync();
            var mappedProducts = _mapper.Map<List<GetProduct>>(dbProducts);

            var response = new GetProducts
            {
                Products = mappedProducts
            };

            return response;
        }

        public async Task<GetProduct> GetProductAsync(long productId)
        {
            var dbProduct = await _context.ProductEntities.FindAsync(productId);
            return _mapper.Map<GetProduct>(dbProduct);
        }

        public async Task<CreateProductResponse> CreateProductAsync(CreateProductRequest request)
        {
            var productEntity = _mapper.Map<ProductEntity>(request);
            _context.ProductEntities.Add(productEntity);
            await _context.SaveChangesAsync();

            var response = new CreateProductResponse
            {
                Product = _mapper.Map<GetProduct>(productEntity)
            };

            return response;
        }

        public async Task<UpdateProductResponse> UpdateProductAsync(long productId, UpdateProductRequest request)
        {
            var productEntity = await _context.ProductEntities.FindAsync(productId);
            if (productEntity == null)
            {
                return null; 
            }

            _mapper.Map(request, productEntity);
            _context.ProductEntities.Update(productEntity);
            await _context.SaveChangesAsync();

            var response = new UpdateProductResponse
            {
                Product = _mapper.Map<GetProduct>(productEntity)
            };

            return response;
        }

        public async Task<bool> DeleteProductAsync(long productId)
        {
            var productEntity = await _context.ProductEntities.FindAsync(productId);
            if (productEntity == null)
            {
                return false; // Or throw an exception if preferred
            }

            _context.ProductEntities.Remove(productEntity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> GetProductCountAsync()
        {
            return await _context.ProductEntities.CountAsync();
        }
    }
}
