// Controllers/NosotrosController.cs
using Microsoft.AspNetCore.Mvc;

namespace InstitucionCristianaWeb.Controllers
{
    public class NosotrosController : Controller
    {
        public IActionResult Nosotros()
        {
            return View(); 
        }
    }
}