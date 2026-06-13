# 🎨 Sistema de Diseño: dbv-md2word

> **Fase:** `/spec` (Especificación Visual)
> **Estado:** Validado
> **Última Revisión:** 2026-06-13
> **Aplica a:** Interfaz Web Local (GUI)

---

> 📐 Inspirado en el estándar **[design.md](https://github.com/google-labs-code/design.md)** de Google Labs — un formato abierto para describir identidades visuales a agentes de codificación.

---

```yaml
# ────────────────────────────────────────────────
# DESIGN TOKENS — Legibles por la IA y por máquina
# ────────────────────────────────────────────────
version: alpha
name: "dbv-md2word UI"
description: "Minimalismo tecnológico, moderno e intuitivo, con estética Glassmorphism, esquemas claro/oscuro y acentos de color vibrantes."

# COLORES
colors:
  primary:      "#1E3A8A"   # Azul marino profundo (Títulos y branding principal)
  secondary:    "#3B82F6"   # Azul eléctrico (Enlaces, botones secundarios)
  accent:       "#10B981"   # Esmeralda (Éxito, botón de conversión principal)
  neutral:      "#F8FAFC"   # Fondo base gris pizarra extremadamente claro (Reducción de fatiga)
  surface:      "#FFFFFF"   # Blanco puro para tarjetas y modales
  on-primary:   "#FFFFFF"   # Texto sobre primario
  on-surface:   "#0F172A"   # Texto oscuro principal (Slate 900)
  on-neutral:   "#64748B"   # Texto secundario/desvanecido (Slate 500)
  error:        "#EF4444"   # Rojo para errores y cancelaciones
  success:      "#10B981"   # Verde
  warning:      "#F59E0B"   # Naranja

# MODO OSCURO (Dark Mode)
dark:
  primary:      "#60A5FA"   # Azul claro para contraste óptimo
  secondary:    "#3B82F6"
  accent:       "#34D399"   # Verde menta brillante
  neutral:      "#0B0F19"   # Azul noche muy oscuro para fondo
  surface:      "#1E293B"   # Gris pizarra oscuro para tarjetas (Slate 800)
  on-primary:   "#FFFFFF"
  on-surface:   "#F8FAFC"   # Texto claro (Slate 50)
  on-neutral:   "#94A3B8"   # Texto secundario claro (Slate 400)

# TIPOGRAFÍA
typography:
  heading:
    fontFamily: "Outfit, Inter, system-ui, sans-serif"
    fontSize:   2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  subheading:
    fontFamily: "Outfit, Inter, system-ui, sans-serif"
    fontSize:   1.5rem
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize:   1rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize:   0.875rem
    fontWeight: 500
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize:   0.75rem
    fontWeight: 400

# BORDES Y RADIOS
rounded:
  none: 0px
  sm:   6px
  md:   10px
  lg:   16px
  xl:   24px
  full: 9999px

# ESPACIADO (escala base 4px)
spacing:
  xs:  4px
  sm:  8px
  md:  16px
  lg:  24px
  xl:  48px
  xxl: 96px

# COMPONENTES — Mapeo de tokens a elementos de UI concretos
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor:       "{colors.on-primary}"
    typography:      "{typography.label}"
    rounded:         "{rounded.md}"
    padding:         "12px 24px"
  button-primary-hover:
    backgroundColor: "#059669"
  button-secondary:
    backgroundColor: "transparent"
    textColor:       "{colors.secondary}"
    rounded:         "{rounded.md}"
    padding:         "12px 24px"
    border:          "1.5px solid {colors.secondary}"
  card:
    backgroundColor: "{colors.surface}"
    rounded:         "{rounded.lg}"
    padding:         "{spacing.lg}"
  input:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.on-surface}"
    rounded:         "{rounded.md}"
    padding:         "10px 14px"
    border:          "1px solid {colors.on-neutral}"
  input-focus:
    border:          "2px solid {colors.secondary}"
```

---

## Visión General

La interfaz de `dbv-md2word` busca ser limpia, profesional y evocadora de herramientas de alta productividad (como las aplicaciones de Notion, Vercel o Figma). El diseño utiliza **Glassmorphism** sutil en la zona de arrastre (drag-and-drop) para dar profundidad tridimensional y transiciones suaves para guiar el flujo de conversión del usuario.

---

## 🎨 Colores

- **Primary (`#1E3A8A`):** Azul corporativo clásico y profundo. Se utiliza en el título principal y headers de tarjetas para dar seriedad institucional.
- **Secondary (`#3B82F6`):** Azul eléctrico brillante. Se utiliza para elementos interactivos secundarios, enlaces, inputs enfocados y botones de descarga individual.
- **Accent (`#10B981`):** Color esmeralda vibrante. Se reserva exclusivamente para indicar éxito o la acción definitiva de "Convertir Documentos".
- **Neutral (`#F8FAFC`):** Fondo gris claro que reduce el contraste agresivo en pantallas de alta resolución.
- **Surface (`#FFFFFF`):** Las tarjetas e inputs destacan flotando sobre el fondo gracias a sombras difusas muy suaves (`box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05)`).

### Modo Oscuro
- **Estrategia:** Cambio automático basado en las preferencias de sistema o botón interruptor (toggle). Se sustituyen los fondos claros por colores pizarra oscuros (`#0B0F19` y `#1E293B`) y las tipografías principales a tonalidades brillantes para mantener la accesibilidad y el contraste WCAG AA.

---

## ✍️ Tipografía

- **Fuentes:** Usamos **Outfit** (vía Google Fonts) para títulos destacados, aportando un aire geométrico moderno, e **Inter** para textos legibles de interfaz y cuerpo.
- **Fuentes del Código:** Los selectores del panel permiten elegir fuentes monoespaciadas nativas del sistema como **Consolas**, **Courier New**, **Monaco** o **Fira Code** para la visualización y conversión.

---

## ✨ Movimiento e Interacción

- **Duración base:** `200ms` para efectos hover en botones y tarjetas.
- **Micro-animaciones:**
  - *Zona de Arrastre:* Al pasar un archivo por encima de la zona de drop, la escala aumenta un 2% (`transform: scale(1.02)`) con un borde discontinuo animado y un brillo de fondo azul translúcido.
  - *Botón Convertir:* Un spinner de carga en CSS aparece suavemente cuando se realiza la petición fetch, deshabilitando los controles.
  - *Tarjetas de Archivos:* Al agregar un archivo, aparece con un efecto fade-in deslizado hacia arriba.
