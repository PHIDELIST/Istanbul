using backend.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Interfaces
{
   public interface IProductService
{
    Task<GetProducts> GetProductsAsync();
    Task<GetProduct> GetProductAsync(long productId);
    Task<CreateProductResponse> CreateProductAsync(CreateProductRequest request);
    Task<UpdateProductResponse> UpdateProductAsync(long productId, UpdateProductRequest request);
    Task<bool> DeleteProductAsync(long productId);
    Task<int> GetProductCountAsync();
}

}