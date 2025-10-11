using Microsoft.AspNetCore.Mvc;
using InstitucionCristianaWeb.Models;
using InstitucionCristianaWeb.Data;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace InstitucionCristianaWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<HomeController> _logger;

        public HomeController(
            AppDbContext context,
            ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Acción principal requerida
        public IActionResult Index()
        {
            return View(); // Asegúrate de tener Views/Home/Index.cshtml
        }

        [HttpGet]
        public IActionResult Contacto()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Contacto(ContactoModel model)
        {
            if (!string.IsNullOrEmpty(model.Honeypot))
            {
                _logger.LogWarning("Intento de envío con honeypot detectado");
                return RedirectToAction("Contacto");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Contactos.Add(model);
                    await _context.SaveChangesAsync();

                    TempData["SuccessMessage"] = "Mensaje enviado correctamente";
                    return RedirectToAction("Contacto");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error al enviar mensaje de contacto");
                    TempData["ErrorMessage"] = "Ocurrió un error al procesar su solicitud";
                }
            }

            return View(model);
        }
    }
}