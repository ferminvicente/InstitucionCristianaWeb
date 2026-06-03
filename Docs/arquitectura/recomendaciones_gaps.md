# Recomendaciones para Mitigar las Brechas (Gaps) de la Arquitectura
**Proyecto:** Sitio Web del Ministerio Educativo Cristiano  
**Fecha:** Junio 2026  

A continuación, se detallan las soluciones recomendadas para resolver cada una de las limitaciones identificadas en la arquitectura estática, manteniendo la premisa de **costo de hosting de $0.00 USD/mes** y **mínimo mantenimiento**.

---

## 1. Solución para el GAP 1: Gestión Manual de Contenido (No CMS)

*   **Problema:** Los líderes del ministerio (pastores, profesores) no saben programar y necesitan una forma visual y sencilla de publicar nuevos cursos o artículos de noticias sin tocar archivos HTML.
*   **Recomendación:** **Decap CMS** (anteriormente Netlify CMS).
*   **¿Cómo funciona?**
    1. Es un gestor de contenidos de código abierto que funciona directamente sobre Git (Git-based CMS).
    2. Se añade una sola página estática (`admin/index.html`) en la carpeta pública del proyecto.
    3. Cuando un administrador inicia sesión en `tusitio.com/admin/`, accede a un panel visual intuitivo para crear/editar cursos y subir imágenes.
    4. Al hacer clic en "Guardar", Decap CMS realiza automáticamente un commit en el repositorio de GitHub de forma transparente.
    5. La integración de GitHub Actions compila y actualiza la web de forma automática en minutos.
*   **Costo:** **$0.00 USD/mes** (Licencia libre y hosting estático).

---

## 2. Solución para el GAP 2: Interacción y Aula Virtual (E-learning)

*   **Problema:** El sitio web estático no permite gestionar entregas de tareas, exámenes, ni foros de discusión privada para estudiantes matriculados.
*   **Recomendación:** Integración con **Google Classroom**.
*   **¿Cómo funciona?**
    1. En lugar de gastar miles de dólares desarrollando un "LMS" (Learning Management System) a medida o manteniendo servidores pesados de Moodle, el sitio web funciona como el "Lobby/Recepción" del ministerio.
    2. El estudiante ve los cursos en la web estática y hace clic en "Inscribirse".
    3. Tras completar el formulario (Google Forms), se le envía un correo automatizado o una pantalla de confirmación con el **Código de Invitación de Google Classroom**.
    4. Google Classroom es una plataforma educativa profesional 100% gratuita para ministerios y organizaciones sin fines de lucro. Allí los estudiantes pueden:
        - Descargar lecturas y diapositivas de clase.
        - Ver videos grabados de lecciones.
        - Enviar tareas e interactuar con los profesores y otros alumnos en foros de discusión.
*   **Costo:** **$0.00 USD/mes** (Servicio gratuito de Google).

---

## 3. Solución para el GAP 3: Motor de Búsqueda Interno

*   **Problema:** Los usuarios no pueden buscar de forma rápida un curso o documento específico por palabras clave si hay muchos recursos en la web.
*   **Recomendación:** Búsqueda del lado del cliente mediante **Fuse.js**.
*   **¿Cómo funciona?**
    1. Se crea un archivo de datos estructurado simple (ej. `public/cursos.json`) que contiene los títulos, descripciones y enlaces de todos los cursos y archivos en descarga.
    2. Se añade un campo de texto de búsqueda en la cabecera del sitio web.
    3. Utilizando la librería JavaScript ultra ligera **Fuse.js** (que pesa menos de 10 KB), se realiza una búsqueda de concordancia difusa (fuzzy search) sobre el archivo JSON directamente en el navegador del visitante.
    4. Los resultados de búsqueda aparecen instantáneamente en la pantalla del usuario a medida que escribe, sin necesidad de consultar a ningún servidor externo.
*   **Costo:** **$0.00 USD/mes** (Se ejecuta localmente en el dispositivo del visitante).
