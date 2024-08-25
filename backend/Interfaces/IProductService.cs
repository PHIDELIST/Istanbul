using backend.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IProductService
    {
        Task<GetProducts> GetProductsAsync();
        Task<GetProduct> GetProductAsync(long productId);
    }
}