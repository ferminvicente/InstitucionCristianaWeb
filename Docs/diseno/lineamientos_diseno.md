# Lineamientos de Diseño UI/UX y Sistema Visual
**Proyecto:** Sitio Web del Ministerio Educativo Cristiano  
**Fecha:** Junio 2026  

---

## 1. Identidad Visual e Inspiración

El diseño de la plataforma del ministerio educativo debe transmitir **seriedad, sabiduría, calidez y modernidad**. Buscamos alejarnos de plantillas genéricas o de aspectos visuales obsoletos de la "web escolar clásica" y optar por una estética premium, limpia y dinámica.

---

## 2. Paleta de Colores (Diseño Armónico)

Se propone evitar colores saturados primarios simples y utilizar una paleta contemporánea basada en tonalidades HSL que facilitan la armonía visual y soportan un tema claro (por defecto) y un tema oscuro elegante.

| Rol del Color | Hex / HSL | Muestra Visual | Propósito |
| :--- | :--- | :--- | :--- |
| **Primario (Teológico)** | `#1E293B` (HSL `215°, 33%, 18%`) | Azul Slate Profundo | Representa estabilidad, seriedad y profundidad académica. Usado en encabezados y navegación. |
| **Secundario (Cálido)** | `#D97706` (HSL `35°, 92%, 43%`) | Oro/Ámbar Cálido | Simboliza luz, sabiduría y calidez. Usado para llamadas a la acción (CTAs) y acentos. |
| **Fondo Claro** | `#F8FAFC` (HSL `210°, 40%, 98%`) | Blanco Hielo Soft | Fondo principal del sitio para lectura limpia y descansada. |
| **Superficie / Tarjetas**| `#FFFFFF` | Blanco Puro | Superficie de componentes (tarjetas de cursos, formularios). |
| **Texto Principal** | `#0F172A` (HSL `222°, 47%, 11%`) | Slate Muy Oscuro | Excelente contraste para lectura prolongada de material de estudio. |
| **Texto Secundario** | `#475569` (HSL `215°, 16%, 47%`) | Slate Medio | Leyendas, subtítulos y metadatos (ej. fecha del curso). |

---

## 3. Tipografía (Google Fonts)

Para lograr un aspecto editorial académico a la vez que moderno, utilizaremos una combinación de dos fuentes gratuitas de Google:

* **Títulos y Encabezados (`<h1>` a `<h6>`):** **Outfit** o **Playfair Display**.
  - *Outfit* aporta un estilo geométrico y moderno.
  - *Playfair Display* aporta una seriedad clásica, ideal para citas bíblicas u encabezados principales de cursos.
* **Texto de Cuerpo (`<body>`, `<p>`, `<input>`):** **Inter** o **Roboto**.
  - Fuentes altamente legibles en pantallas móviles y de computadoras, optimizadas para el rendimiento visual y baja fatiga ocular.

### Configuración CSS Recomendada:
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

body {
    font-family: 'Inter', sans-serif;
    color: #0f172a;
    background-color: #f8fafc;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
}
```

---

## 4. Componentes y Estética Modernos

### Glassmorphism (Efecto Vidrio Esmerilado)
Para elementos flotantes como la barra de navegación superior o ventanas modales, utilizaremos un efecto de desenfoque de fondo para dar profundidad 3D y sensación premium.

```css
.navbar-custom {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    position: sticky;
    top: 0;
    z-index: 1000;
}
```

### Tarjetas de Cursos (Cards)
Las tarjetas que muestran los cursos o materiales de estudio deben tener bordes redondeados pronunciados, sombras suaves y una sutil animación al pasar el cursor (hover).

```css
.course-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
}

.course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
    border-color: #d97706; /* Cambia al color secundario de acento */
}
```

---

## 5. Micro-animaciones e Interactividad
* **Efectos de Transición:** Todos los botones, enlaces y entradas de texto deben tener una transición suave (`transition: all 0.2s ease-in-out`).
* **Indicadores de Carga:** Si la página realiza llamadas asíncronas, utilizar esqueletos de carga (skeleton loaders) en lugar de pantallas en blanco.
* **Scroll Suave:** Configurar `scroll-behavior: smooth` a nivel de documento.

---

## 6. Pautas de Accesibilidad (a11y)
Como ministerio educativo, es vital que todas las personas (incluyendo adultos mayores y personas con dificultades visuales) puedan usar el sitio web:
1. **Contraste de Color:** Asegurar una relación de contraste mínima de `4.5:1` para texto normal contra su fondo (cumpliendo con la norma WCAG AA).
2. **Tamaños de Botón y Enlaces:** Objetivos de clic (tap targets) de al menos `44px x 44px` en dispositivos móviles.
3. **Navegación por Teclado:** Asegurar que todos los elementos interactivos tengan un estado `:focus-visible` claramente visible y estructurado para lectores de pantalla.
4. **Atributos Alt:** Todas las imágenes que transmitan información de aprendizaje o contexto del ministerio deben tener la etiqueta `alt` descriptiva obligatoriamente.
