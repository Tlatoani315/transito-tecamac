# Tránsito y Seguridad Vial — H. Ayuntamiento de Tecámac

Sitio web institucional de la **Dirección de Tránsito y Seguridad Vial** del H. Ayuntamiento de Tecámac, Estado de México.

Permite a los ciudadanos consultar requisitos de trámites vehiculares, conocer programas de educación vial y enviar reportes ciudadanos, sin necesidad de trasladarse a las oficinas.

---

## ¿Para qué sirve este sitio?

| Sección | Qué ofrece al ciudadano |
|---|---|
| **Trámites y Servicios** | Requisitos para permisos de conducir, liberación de vehículos del corralón y consulta de infracciones |
| **Cultura y Seguridad Vial** | Programas preventivos: Uno y Uno, límites de velocidad, uso de casco y chaleco |
| **Quiénes Somos** | Misión, visión y valores de la Dirección de Tránsito |
| **Contacto y Reportes** | Formulario de contacto ciudadano para dudas, quejas y reportes |

---

## Tecnologías utilizadas

Este sitio es 100% estático. No requiere servidor, base de datos ni instalación de dependencias.

- **HTML5** semántico
- **CSS3** puro — variables CSS, Flexbox, Grid, diseño responsivo mobile-first
- **JavaScript ES6+** Vanilla — sin frameworks ni librerías externas

El único recurso externo es **Font Awesome 6** (íconos, cargado vía CDN).

---

## Estructura del proyecto

```
transito-tecamac/
│
├── index.html          ← Página principal (single-page con anclas a cada sección)
├── estilos.css         ← Todos los estilos: variables, layout, componentes, responsivo
├── scripts.js          ← Toda la lógica: navbar, animaciones, modales, formulario
│
├── assets/
│   ├── images/         ← Imágenes del sitio (logo, fotografías)
│   └── docs/           ← Formatos descargables en PDF para ciudadanos
│
├── .gitignore
└── README.md
```

---

## Cómo visualizar el sitio

No se necesita instalar nada. Solo abrir el archivo directamente en el navegador:

1. Navega a la carpeta del proyecto.
2. Haz doble clic en `index.html`.
3. El sitio carga en tu navegador preferido (Chrome, Firefox o Edge).

> Para verlo en mobile, puedes usar la herramienta de *DevTools* del navegador (`F12` → ícono de dispositivo móvil).

---

## Cómo actualizar el contenido

### Cambiar textos (requisitos, horarios, información de contacto)
Edita directamente `index.html`. Cada sección está marcada con comentarios:
```html
<!-- ==================== TRÁMITES Y SERVICIOS ==================== -->
<!-- ==================== EDUCACIÓN VIAL ==================== -->
<!-- ==================== CONTACTO ==================== -->
```

### Cambiar colores institucionales
Todas las variables de color están centralizadas al inicio de `estilos.css`:
```css
:root {
  --color-primary:   #800020; /* Guinda institucional */
  --color-secondary: #b89445; /* Dorado/Arena institucional */
}
```
Modificar solo esas dos líneas actualiza el color en todo el sitio.

### Agregar formatos descargables (PDF)
1. Coloca el archivo PDF en `assets/docs/`.
2. En `index.html`, cambia el atributo `href` del enlace correspondiente:
```html
<a href="assets/docs/nombre-del-formato.pdf" download>Descargar formato</a>
```

### Agregar o cambiar la imagen del hero
1. Guarda la imagen en `assets/images/`.
2. En `estilos.css`, cambia la URL en la sección `.hero`:
```css
.hero {
  background-image: url('assets/images/tu-imagen.jpg');
}
```

---

## Compatibilidad

| Navegador | Soporte |
|---|---|
| Google Chrome 90+ | ✅ Completo |
| Mozilla Firefox 90+ | ✅ Completo |
| Microsoft Edge 90+ | ✅ Completo |
| Safari 15+ | ✅ Completo |

El sitio es responsivo en dispositivos desde 375px (iPhone SE) hasta pantallas de escritorio.

---

## Accesibilidad

El sitio implementa las siguientes prácticas de accesibilidad (WCAG AA):

- Todas las imágenes tienen atributo `alt` descriptivo.
- Todos los campos del formulario tienen `<label>` correctamente asociado.
- El menú hamburguesa tiene `aria-label` y `aria-expanded` actualizables.
- El contraste de texto supera la relación 4.5:1 en todos los fondos.
- Las animaciones se desactivan automáticamente si el sistema operativo del usuario tiene activada la preferencia de movimiento reducido (`prefers-reduced-motion`).
- La navegación completa es posible solo con teclado.

---

## Autor

**Gabriel Alberto Sánchez Martínez**  
Técnico en Informática  
CBT No. 2 Lic. Carlos Pichardo, Tecámac  
Generación 2026 — Memoria de Trabajo Profesional

---

## Institución

**Dirección de Tránsito y Seguridad Vial**  
H. Ayuntamiento de Tecámac, Estado de México  
© 2026 — Todos los derechos reservados.
