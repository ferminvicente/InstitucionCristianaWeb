# Historias de Usuario Simplificadas (Sitio Estático)
**Proyecto:** Sitio Web del Ministerio Educativo Cristiano  
**Fecha:** Junio 2026  

Dado que el sitio web es plenamente informativo y no requiere bases de datos dinámicas ni login de usuarios, las historias de usuario se centran en el consumo de información limpia y rápida.

---

## 1. Definición de Roles
* **Visitante / Estudiante:** Persona interesada en conocer la oferta del ministerio, sus creencias, cursos y descargar materiales de estudio en PDF.
* **Administrador del Ministerio (Editor de Código):** Persona que actualiza la oferta educativa del ministerio editando directamente las páginas estáticas del proyecto en el repositorio.

---

## 2. Historias de Usuario

### HU-01: Página de Inicio e Identidad del Ministerio
* **Como** Visitante,
* **Quiero** ver una página de inicio atractiva,
* **Para** entender claramente la misión, visión, declaración doctrinal del ministerio y sus últimas novedades.
* **Criterios de Aceptación:**
  - Sección hero con un pasaje bíblico representativo y botones de llamada a la acción hacia la lista de cursos.
  - Bloques informativos de "Quiénes Somos" y "Nuestra Fe".
  - Diseño responsivo que cargue perfectamente en teléfonos móviles.

### HU-02: Catálogo Informativo de Cursos y Horarios
* **Como** Estudiante o Visitante,
* **Quiero** ver la lista de cursos bíblicos disponibles,
* **Para** conocer las temáticas, los instructores a cargo, las fechas de inicio y los horarios de clase.
* **Criterios de Aceptación:**
  - Estructurado en cuadrículas de tarjetas (cards) visualmente llamativas.
  - Cada tarjeta de curso detalla: Título del curso, Profesor facilitador, Horario, Modalidad (Virtual o Presencial) y Duración.
  - Si un curso ya inició, debe mostrar una etiqueta visual que indique "En curso" o "Finalizado".

### HU-03: Descarga Directa de Materiales de Estudio (PDFs)
* **Como** Estudiante,
* **Quiero** acceder a la página de recursos del sitio web,
* **Para** descargar guías de estudio, folletos y lecturas en formato PDF directamente a mi dispositivo.
* **Criterios de Aceptación:**
  - Sección limpia con un listado de descargas por categorías (ej. "Teología Básica", "Estudio de Romanos", etc.).
  - Botón de descarga directa que abra el archivo PDF almacenado localmente en la carpeta estática del sitio.
  - Iconos indicativos del tipo de archivo y su tamaño estimado.

### HU-04: Formulario / Enlace de Inscripción a través de Google Forms
* **Como** Estudiante interesado en un curso,
* **Quiero** presionar un botón de inscripción,
* **Para** llenar mis datos en un formulario de registro y asegurar mi cupo.
* **Criterios de Aceptación:**
  - En lugar de un sistema complejo de registro con login, el botón de inscripción redirige al usuario a un formulario de **Google Forms** o **Microsoft Forms** oficial del ministerio.
  - El formulario se abre en una pestaña nueva para no perder la navegación del sitio.
  - El formulario recopila información básica (Nombre, Teléfono, Correo electrónico y Curso seleccionado).

### HU-05: Información de Contacto Directo y Canales de Redes Sociales
* **Como** Visitante,
* **Quiero** ver los datos oficiales de contacto (dirección, teléfono, correo) y enlaces a redes sociales (WhatsApp, Facebook, YouTube),
* **Para** resolver dudas específicas de manera directa.
* **Criterios de Aceptación:**
  - Sección de contacto con un mapa interactivo (ej. Google Maps embebido si hay sede física).
  - Enlaces de WhatsApp directo (`https://wa.me/...`) y correo con formato `mailto:` estilizado para facilitar el contacto desde teléfonos.
  - Enlaces oficiales de redes sociales en el pie de página (footer).
