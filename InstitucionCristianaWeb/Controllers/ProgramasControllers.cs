// Controllers/NosotrosController.cs
using Microsoft.AspNetCore.Mvc;

namespace InstitucionCristianaWeb.Controllers
{
    public class ProgramasController : Controller
    {
        public IActionResult Programas()
        {
            return View(); 
        }
    }
}