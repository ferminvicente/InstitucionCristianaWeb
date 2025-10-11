using System.ComponentModel.DataAnnotations;

namespace InstitucionCristianaWeb.Models
{
public class ContactoModel

{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio")]
    [StringLength(100, ErrorMessage = "Máximo 100 caracteres")]
    public string Nombre { get; set; }

    [Required(ErrorMessage = "El email es obligatorio")]
    [EmailAddress(ErrorMessage = "Formato de email inválido")]
    public string Email { get; set; }

    [RegularExpression(@"^[0-9]{8,10}$", ErrorMessage = "Teléfono inválido")] 
    public string Telefono { get; set; }

    [Required(ErrorMessage = "Seleccione un asunto")]
    public string Asunto { get; set; }

    [Required(ErrorMessage = "El mensaje es obligatorio")]
    [StringLength(500, ErrorMessage = "Máximo 500 caracteres")]
    public string Mensaje { get; set; }

    public DateTime FechaEnvio { get; set; } = DateTime.Now;

    // Campo Honeypot para protección contra bots
    public string Honeypot { get; set; }

    // ... otras propiedades

    [Required(ErrorMessage = "Validación reCAPTCHA requerida")]
    public string GRecaptchaResponse { get; set; } // Nombre debe coincidir con el campo hidden
}
}