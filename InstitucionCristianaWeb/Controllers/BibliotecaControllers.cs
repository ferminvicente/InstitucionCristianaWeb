// Controllers/BibliotecaController.cs
using Microsoft.AspNetCore.Mvc;

namespace InstitucionCristianaWeb.Controllers
{
    public class BibliotecaController : Controller
    {
        public IActionResult Biblioteca()
        {
            return View(); 
        }
    }
}