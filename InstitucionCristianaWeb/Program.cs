using InstitucionCristianaWeb.Data;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// ======== REGISTRO DE SERVICIOS ========
builder.Services.AddControllersWithViews();

// Configuración de la base de datos
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// HttpClient para servicios externos
builder.Services.AddHttpClient();

// Rate Limiting
builder.Services.AddRateLimiter(options => {
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString(),
            factory: _ => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                Window = TimeSpan.FromMinutes(1)
            }));

    options.AddPolicy("ContactoPolicy", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString(),
            factory: _ => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 3,
                Window = TimeSpan.FromMinutes(5)
            }));
});

var app = builder.Build();

// ======== CONFIGURACIÓN DEL PIPELINE ========
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseRateLimiter();
app.UseAuthorization();

//Configuración de endpoints
app.UseEndpoints(endpoints =>
 {
   // Ruta para Nosotros
    endpoints.MapControllerRoute(
        name: "nosotros",
        pattern: "Nosotros",
        defaults: new { controller = "Nosotros", action = "Nosotros" });

    // Ruta para Contacto con política específica
    endpoints.MapControllerRoute(
        name: "contacto",
        pattern: "Home/Contacto",
        defaults: new { controller = "Home", action = "Contacto" },
        constraints: null,
        dataTokens: new { policy = "ContactoPolicy" });

    // Ruta por defecto
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});

app.Run();