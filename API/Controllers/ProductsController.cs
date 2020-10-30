using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository repository;

        public ProductsController(IProductRepository repository )
        {
            
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await repository.GetProductsAsync();
            return  Ok(products);
        }
        [HttpGet("{id}")]
        public async Task <ActionResult<Product>> GetProduct(int id)
        {
            var product = await  repository.GetProductByIdAsync(id);
            return  Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var products = await repository.GetProductBrandsAsync();
            return  Ok(products);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var products = await repository.GetProductTypesAsync();
            return  Ok(products);
        }
    }
}