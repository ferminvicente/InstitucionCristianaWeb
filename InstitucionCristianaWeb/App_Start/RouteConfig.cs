using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace InstitucionCristianaWeb
{
    public class RouteConfig
    {
        public static void RegisterRoutes(IEndpointRouteBuilder endpoints)
        {
            // Configuración de endpoints para ASP.NET Core
            endpoints.MapControllerRoute(
                name: "Nosotros",
                pattern: "Nosotros",
                defaults: new { controller = "Nosotros", action = "Index" }
            );

            // Ruta por defecto
            endpoints.MapControllerRoute(
                name: "Default",
                pattern: "{controller=Home}/{action=Index}/{id?}"
            );
        }
    }
}