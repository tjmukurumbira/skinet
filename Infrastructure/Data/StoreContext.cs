using System.Linq;
using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }

        protected override void OnModelCreating( ModelBuilder builder)
        {
                base.OnModelCreating(builder);
                builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

                if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
                {
                    foreach(var ety in builder.Model.GetEntityTypes())
                    {
                        var properties = ety.ClrType.GetProperties().Where (p=>p.PropertyType == typeof(decimal));
                        foreach(var prop in properties)
                        {
                            builder.Entity(ety.Name).Property(prop.Name)
                            .HasConversion<double>();
                        }
                    }
                }
        }
    }
}