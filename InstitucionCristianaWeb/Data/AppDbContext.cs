using Microsoft.EntityFrameworkCore;
using InstitucionCristianaWeb.Models;

namespace InstitucionCristianaWeb.Data
{
    public class AppDbContext : DbContext
    {
        // Constructor requerido para DI
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Definir DbSets
        public DbSet<ContactoModel> Contactos { get; set; }
    }
}