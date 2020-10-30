using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext storeDbContext;

        public ProductsController( StoreContext storeDbContext)
        {
            this.storeDbContext = storeDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await storeDbContext.Products.ToListAsync();
            return  Ok(products);
        }
        [HttpGet("{id}")]
        public async Task <ActionResult<Product>> GetProduct(int id)
        {
            var product = await storeDbContext.Products.FindAsync(id);
            return  Ok(product);
        }
    }
}