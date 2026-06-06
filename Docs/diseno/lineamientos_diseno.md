# Lineamientos de Diseño UI/UX y Sistema Visual Real
**Proyecto:** Sitio Web del Ministerio Educativo Cristiano (InstitucionCristianaWeb)
**Fecha de Actualización:** Junio 2026

---

## 1. Identidad Visual e Inspiración
El diseño visual está alíneado con la identidad institucional del Ministerio de Educación de las Asambleas de Dios, buscando una presencia **formal, confiable y moderna**. Se respeta la estructura y colores de la plantilla original elegida por la institución.

---

## 2. Paleta de Colores Oficial
Para mantener la consistencia gráfica en todas las páginas, se debe utilizar estrictamente la siguiente paleta de colores. Se prohíbe el uso de colores primarios puros de Bootstrap sin personalización.

| Rol del Color | Hexadecimal | Propósito y Uso |
| :--- | :--- | :--- |
| **Azul Principal (Ocean Blue)** | `#0F3968` | Usado para títulos primarios, textos de navegación, botones y bordes principales. |
| **Naranja de Acento (Vermilion)** | `#E64F22` | Usado para estados hover, llamados a la acción destacados, iconos de acento y bordes superiores de tarjetas. |
| **Fondo Oscuro (Slate Blue)** | `#2D3255` | Gradiente junto a `#0F3968` para fondos de banners hero y tarjetas destacadas (como el Director). |
| **Neutro Claro** | `#F8F9FA` | Fondo de secciones secundarias o grillas de tarjetas para dar contraste. |
| **Blanco de Fondo** | `#FFFFFF` | Fondo principal del cuerpo y tarjetas estándar. |
| **Texto Oscuro (Slate Dark)** | `#1D1F2F` | Color del texto principal para garantizar un contraste accesible. |
| **Texto Secundario** | `#6C757D` | Color gris para subtítulos, metadatos y descripciones secundarias. |

---

## 3. Tipografía
El sitio cuenta con una fuente de marca propia que debe aplicarse para conservar la uniformidad de la plantilla:

* **Fuente de Marca (Títulos y Acentos):** **Garet** (`Garet-Bold`)
  - Definida localmente mediante `@font-face` en `Styles - Main.css`.
  - Debe usarse en títulos, elementos de navegación y cargos.
* **Fuente de Texto del Cuerpo:** **Arial** o **sans-serif** (Estándar legible).

### Configuración CSS oficial:
```css
body {
    font-family: Arial, sans-serif;
    color: #1D1F2F;
}

h1, h2, h3, h4, h5, h6, .nav-link {
    font-family: 'Garet', Arial, sans-serif !important;
}
```

---

## 4. Componentes y Normalización Estética

### Tarjetas de Información (Cards)
Para asegurar que todo el contenido del sitio parezca parte de la misma familia, cualquier tarjeta (ej. programas, directorio, contacto) debe seguir estas reglas:
* **Bordes redondeados:** `border-radius: 15px` o `20px` (dependiendo del tamaño).
* **Sombra suave:** `box-shadow: 0 5px 15px rgba(0,0,0,0.08)`.
* **Acento superior:** Un borde superior de `4px solid #E64F22` (Naranja) en tarjetas estándar sobre fondo blanco.
* **Fondo:** `#FFFFFF` para tarjetas normales, o gradiente lineal `linear-gradient(45deg, #2D3255, #0F3968)` para elementos directivos principales.

### Botones y Elementos Interactivos
* **Botones primarios:** Color de fondo `#0F3968`, borde `#0F3968`.
* **Botones de acento o hover:** Color de fondo `#E64F22`, borde `#E64F22`.
* **Efectos hover:** Transición suave de 0.3 segundos para deslizamientos y cambios de color (`transition: all 0.3s ease`).

---

## 5. Pautas de Accesibilidad (a11y)
* **Contraste:** Todo texto sobre fondos oscuros (como banners y la tarjeta de director) debe ser blanco puro (`#ffffff`) o blanco translúcido (`rgba(255,255,255,0.9)`). Nunca heredar colores oscuros sobre fondos oscuros.
* **Enlaces de Teléfono y Correo:** Deben destacar visualmente y ser fácilmente clickeables en dispositivos táctiles.

---

## 6. Pulido Estético Avanzado (UI/UX 2026)
* **Balance de Pesos Tipográficos:** Evitar la aplicación de la fuente de títulos `Garet` (que es negrita por defecto en su archivo woff2) en párrafos largos o textos descriptivos secundarios. Estos textos deben usar `Arial` o `sans-serif` con peso `regular` (`font-weight: 400` o `500`) para no sobrecargar el diseño visual y permitir que los títulos destaquen.
* **Pie de Página (Footer):** Debe usar un fondo azul sólido `#0F3968` o su degradado oficial y tipografías blancas (`#ffffff` / `#f8f9fa`) de alto contraste. Se prohíbe el uso de `text-shadow` que ensucie el texto.
* **Interactividad Responsable en Tarjetas:** Si una tarjeta responde visualmente al cursor (hover), a nivel de experiencia de usuario (UX) significa que es un elemento interactivo. Por lo tanto, toda la tarjeta debe ser clickeable (`.clickable-card`), redirigiendo a la acción principal del elemento.
* **Unboxing de Contenidos Únicos:** En páginas donde existe una única sección de contenido relevante (ej. Biblioteca, Organigrama), evitar encerrar la información en tarjetas blancas con bordes y sombras artificiales. Permitir que el contenido respire libremente en la cuadrícula de la página.
* **Continuidad de Botones en Grillas:** Para evitar desalineaciones en tarjetas de una grilla debido a variaciones en la longitud del texto descriptivo superior, los botones deben alinearse de forma consistente en la parte inferior en bloque continuo, extendiéndose al ancho completo o centrados simétricamente.

