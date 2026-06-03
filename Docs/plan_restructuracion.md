# Plan de Reestructuración a Sitio Estático (JAMstack)
**Proyecto:** Sitio Web del Ministerio Educativo Cristiano  
**Fecha:** Junio 2026  
**Decisión de Arquitectura:** Sitio Estático sin Base de Datos (Opción B)  

Este plan detalla los pasos para reestructurar el repositorio actual (plantilla C# ASP.NET Core) en un sitio web puramente estático, rápido, seguro y con un costo de mantenimiento mensual de **$0.00 USD**.

---

## 1. Alcance de la Reestructuración
El sitio web tendrá un enfoque **puramente informativo** y de distribución de recursos estáticos (material de estudio en PDF, enlaces a clases en video y formularios de inscripción externos). 

### Cambios Clave:
* **Eliminación del Backend en C#:** Se descarta el uso de C#, .NET 8.0, Entity Framework y controladores.
* **Cero Base de Datos:** Los datos de cursos se escribirán directamente en el HTML o en un archivo de datos local simple (JSON/Markdown), lo que elimina los costos e infraestructura de base de datos.
* **Inscripción Externa:** Las inscripciones se gestionarán a través de Google Forms integrado, facilitando la administración de alumnos en hojas de cálculo (Google Sheets) sin costo adicional.
* **Hospedaje en CDN:** Los archivos compilados del sitio se alojarán en **Firebase Hosting** de forma gratuita.

---

## 2. Fases de la Reestructuración

### Fase 1: Limpieza del Repositorio
* Eliminar todos los archivos relacionados con la plantilla de C# ASP.NET Core:
  - Carpetas: `Controllers`, `Models`, `Views`, `Properties`, `wwwroot/lib` (jQuery/Bootstrap por defecto).
  - Archivos: `Program.cs`, `InstitucionCristianaWeb.csproj`, `appsettings.json`, `appsettings.Development.json`.
* Crear la estructura estática base de directorios (`public`, `src`, `src/css`, `src/js`, etc.).

### Fase 2: Configuración del Entorno de Desarrollo (Vite)
* Inicializar un proyecto minimalista con Vite para emular y compilar de manera eficiente:
  - Crear `package.json` con dependencias mínimas (Vite).
  - Configurar `vite.config.js` si es necesario.
* Configurar herramientas de Firebase para emular el despliegue localmente (`firebase.json`).

### Fase 3: Diseño UI/UX y Estilos CSS
* Crear el archivo de diseño global `src/css/main.css` utilizando las pautas visuales de HSL y tipografías Outfit/Inter (según `Docs/diseno/lineamientos_diseno.md`).
* Maquetar el encabezado responsivo con efecto de vidrio esmerilado (glassmorphism) y el pie de página global.

### Fase 4: Creación de Páginas Informativas
* **Inicio (`src/index.html`):** Banner hero con pasaje bíblico, misión y visión del ministerio.
* **Cursos (`src/cursos.html`):** Tarjetas estáticas de cursos con horarios, descripción e instructores. Botón de enlace a Google Forms para inscripción.
* **Recursos (`src/recursos.html`):** Listado de guías de estudio para descarga directa de archivos PDF almacenados en `public/documentos/`.
* **Contacto (`src/contacto.html`):** Mapa interactivo de ubicación física, números de teléfono y botón de WhatsApp directo.

### Fase 5: Despliegue en Firebase Hosting
* Crear el proyecto en la consola de Firebase.
* Ejecutar la inicialización del CLI de Firebase y asociar el proyecto.
* Desplegar los archivos de producción usando el comando `firebase deploy`.
* Conectar el dominio personalizado del ministerio con SSL automático gratuito.

---

## 3. Cronograma Estimado

| Tarea / Actividad | Duración Estimada | Entregable |
| :--- | :--- | :--- |
| **Fase 1:** Limpieza de código .NET y andamiaje estático | 1 día | Repositorio limpio con estructura base. |
| **Fase 2:** Inicialización de Vite y Firebase CLI | 1 día | Servidor de desarrollo local corriendo. |
| **Fase 3:** Maquetación e implementación de Diseño CSS | 3 días | Layout base responsivo y componentes estilizados. |
| **Fase 4:** Contenido de páginas e integración de Google Forms | 3 días | Vistas completas con materiales y enlaces funcionales. |
| **Fase 5:** Despliegue en Firebase Hosting y pruebas de dominio | 1 día | Enlace oficial en producción (`https://...web.app`). |
