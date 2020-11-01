using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> producsRepo;
        private readonly IGenericRepository<ProductBrand> productBrandRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        private readonly IMapper mapper;

        public ProductsController(IGenericRepository<Product> producsRepo,
            IGenericRepository<ProductBrand>  productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo,
            IMapper mapper )
        {
            this.producsRepo = producsRepo;
            this.productBrandRepo = productBrandRepo;
            this.productTypeRepo = productTypeRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await producsRepo.ListAsync(spec);
            return  Ok(mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products));
        }
        [HttpGet("{id}")]
        public async Task <ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await  producsRepo.GetEntityWithSpec(spec);
            return  Ok(mapper.Map<Product, ProductToReturnDto>(product));
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var productBrands = await productBrandRepo.ListAllAsync();
            return  Ok(productBrands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var productTypes = await productTypeRepo.ListAllAsync();
            return  Ok(productTypes);
        }
    }
}