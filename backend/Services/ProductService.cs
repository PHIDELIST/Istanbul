using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Database;
using backend.Database.Entities;
using backend.DTOs;
using backend.Interfaces;


namespace backend.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly DatabaseContext  _context;

        public ProductService(IMapper mapper, DatabaseContext  context)
        {
            _context = context;
            _mapper = mapper;
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
    }
}