# Lineamientos de Arquitectura de Software (Sitio Estático / JAMstack)
**Proyecto:** Sitio Web del Ministerio Educativo Cristiano  
**Fecha:** Junio 2026  
**Decisión Adoptada:** Arquitectura Estática (Opción B) sin Base de Datos.

---

## 1. Justificación de la Arquitectura

Para un sitio web plenamente informativo, una arquitectura **estática / JAMstack** es la más recomendada debido a:
1. **Costo Cero ($0.00 USD/mes):** El hospedaje se realiza en servicios como **Firebase Hosting**, **GitHub Pages** o **Cloudflare Pages** que ofrecen un nivel gratuito extremadamente generoso.
2. **Mantenimiento Técnico Cero:** Al no existir servidores web dedicados (como una máquina virtual VPS) ni servidores de base de datos, no hay actualizaciones del sistema operativo, parches de seguridad, ni caídas por falta de memoria.
3. **Seguridad Absoluta:** No hay código ejecutándose en el servidor que pueda ser vulnerado o atacado mediante inyección de SQL. El sitio es invulnerable a este tipo de amenazas.
4. **Velocidad de Carga Superior:** Todo el contenido (HTML, CSS, imágenes, JS) está pre-renderizado y se distribuye a través de una red CDN global, cargando casi al instante.

---

## 2. Flujo de Publicación de Contenidos (Sin Base de Datos)

Dado que no hay base de datos dinámica, los cursos, horarios y artículos de información se administran directamente modificando el código HTML o archivos de datos estructurados (Markdown/JSON) en el repositorio y desplegándolos. 

```mermaid
graph LR
    Editor[Editor / Administrador] -->|Modifica HTML / Markdown| Code[Repositorio Git / Archivos Locales]
    Code -->|Comando de Despliegue| Firebase[Firebase Hosting CDN]
    Firebase -->|Sirve archivos estáticos| User[Usuario Final]
```

---

## 3. Estructura de Directorios del Sitio Estático (Vite / Vanilla)

Una vez que eliminemos la plantilla C# .NET, el proyecto se organizará bajo el siguiente esquema simple:

```text
InstitucionCristianaWeb/
│
├── Docs/                         # Documentación del Proyecto (Arquitectura, Diseño, Historias)
│   ├── arquitectura/
│   ├── diseno/
│   └── Historias de usuario/
│
├── public/                       # Archivos estáticos directos (no compilados)
│   ├── favicon.ico
│   ├── logo.png
│   └── documentos/               # Guías de estudio en PDF y folletos descargables
│
├── src/                          # Código Fuente de la Interfaz
│   ├── css/
│   │   └── main.css              # Estilos globales y tokens de diseño
│   ├── js/
│   │   └── main.js               # Interactividad simple (menús, sliders, interactivos)
│   │
│   # Páginas principales del sitio:
│   ├── index.html                # Página de inicio
│   ├── nosotros.html             # Misión, visión, declaración de fe
│   ├── cursos.html               # Catálogo de cursos informativos
│   └── contacto.html             # Información de contacto y mapa
│
├── firebase.json                 # Configuración de despliegue en Firebase Hosting
├── package.json                  # Definición de dependencias de desarrollo (ej. Vite para emulación local)
└── README.md
```

---

## 4. Lineamientos de Despliegue (Firebase Hosting)

Para desplegar y servir el sitio web de forma gratuita bajo una infraestructura de Google:

1. **Herramientas necesarias:** Node.js y el CLI de Firebase (`npm install -g firebase-tools`).
2. **Inicialización:**
   ```bash
   firebase login
   firebase init hosting
   ```
   *Durante la configuración se asocia el proyecto al ID de Firebase correspondiente y se define la carpeta pública (`public` o `dist` según el compilador).*
3. **Comando de publicación:**
    ```bash
    firebase deploy
    ```
    Esto sube los archivos instantáneamente a la red CDN de Google.
4. **Dominio Personalizado:** Firebase Hosting permite conectar un dominio propio (ej. `www.ministerioeducativo.org`) de forma gratuita, incluyendo la generación y renovación automática del certificado SSL de seguridad (HTTPS).

---

## 5. Lineamientos de Despliegue (GitHub Pages)

Dado que los archivos del sitio web compilado son puramente estáticos, el sitio también es **100% compatible con GitHub Pages**:

1. **Configuración de Rutas:** El archivo `vite.config.js` ya está configurado con `base: './'`. Esto permite que todos los archivos (CSS, JS, imágenes) usen rutas relativas y funcionen correctamente tanto si el sitio está hospedado en un dominio raíz (`www.ministerio.org`) como en un subdirectorio de repositorio (`usuario.github.io/nombre-repositorio/`).
2. **Método 1: Usando la biblioteca `gh-pages` (Despliegue Manual):**
   - Instala la herramienta de despliegue de GitHub Pages en el proyecto:
     ```bash
     npm install -D gh-pages
     ```
   - Agrega los siguientes scripts a tu `package.json`:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```
   - Ejecuta el comando para compilar y publicar directamente a la rama `gh-pages` de tu repositorio de GitHub:
     ```bash
     npm run deploy
     ```
3. **Método 2: GitHub Actions (Automatizado - Recomendado):**
   - Se puede configurar una acción de GitHub (CI/CD) para que compile y publique el sitio automáticamente cada vez que hagas `git push` a la rama `main` o `master`.
   - Crea un archivo en `.github/workflows/deploy.yml` con los pasos para compilar usando Node.js y desplegar el directorio `dist` a la rama `gh-pages`.

---

## 6. Seguridad en Sitios Estáticos

La arquitectura JAMstack/Estática proporciona un nivel de seguridad extremadamente alto por diseño:

1. **Sin Vulnerabilidades de Servidor (Serverless):** Al no haber un servidor que ejecute código dinámico (C#, Node.js, PHP, etc.), no existe riesgo de ejecución remota de código (RCE) ni de inyecciones de archivos.
2. **Inexistencia de Inyección SQL:** Dado que no hay bases de datos relacionales directamente conectadas, ataques como SQL Injection son físicamente imposibles.
3. **Capa HTTPS obligatoria:** Tanto Firebase Hosting como GitHub Pages proveen certificados SSL/TLS automáticos y gratuitos de forma obligatoria, garantizando que todo el tráfico viaje cifrado de punto a punto.
4. **Mitigación de Cross-Site Scripting (XSS):** Dado que no tenemos un sistema donde los usuarios carguen o rendericen textos dinámicos propios (como comentarios o foros), el riesgo de XSS está limitado a la integridad de las dependencias. Al no tener librerías externas complejas, el riesgo es cercano a cero.

---

## 7. Brechas y Limitaciones (Gaps) de la Arquitectura

Es importante tener claras las limitaciones de esta arquitectura simplificada para gestionarlas en el futuro:

1. **Gestión Manual de Contenidos (No CMS):** 
   - *Brecha:* No hay panel de administración visual o interactivo ("Backoffice") para que personas sin conocimientos de código agreguen cursos o noticias.
   - *Solución/Mitigación:* Para cambiar datos de cursos, el administrador debe editar directamente los archivos HTML correspondientes en el código y desplegar. Esto es muy simple pero requiere un mínimo de conocimiento técnico de edición.
2. **Ausencia de Interacción en Tiempo Real:** 
   - *Brecha:* No hay perfiles de usuario, inicios de sesión de estudiantes ni paneles personalizados.
   - *Solución/Mitigación:* Se delega en servicios externos. Por ejemplo, en lugar de foros internos se usa WhatsApp/Telegram, y en lugar de un sistema de registro se usa Google Forms.
3. **Métricas de Rendimiento y Búsqueda:** 
   - *Brecha:* No hay un motor de búsqueda interno para los cursos o lecturas.
   - *Solución/Mitigación:* Al ser un sitio pequeño (menos de 20 páginas de contenido), la búsqueda interna no es prioritaria. Si en el futuro es necesaria, se puede integrar una solución de búsqueda estática del lado del cliente como *Lunr.js* o *Fuse.js*.

