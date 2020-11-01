using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
              services.AddSwaggerGen(c=>{
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo{
                     Title="Skinet API", Version="V1"
                });
            });

            return services;            
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c=>{c.SwaggerEndpoint("/swagger/v1/swagger.json","Skinet API V1");});

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            return app;
        }
    }
}