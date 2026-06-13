# Changelog — dbv-md2word

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Sin publicar] / [Unreleased]

### Added
- **Mapeo de Estilos Nativos en Español:** Mapeo automático de títulos Markdown a los estilos nativos de Word en español (`Título 1`, `Título 2`, `Título 3`) y cuerpo a `Normal`.
- **Estilos de Código Personalizados:** Creación dinámica de estilos `codigo` (párrafo para bloques de código) y `codigo_car` (carácter para código en línea).
- **Tabla de Contenidos (TOC):** Inyección de campo dinámico `TOC` nativo de Word al inicio del documento.
- **Numeración de Figuras y Tablas:** Inserción automática de campos `SEQ Figure` y `SEQ Table` para figuras e imágenes con captions.
- **Referencias Cruzadas:** Detección de marcadores tipo `[Fig. X]` o `[Tabla Y]` en texto y reemplazo por campos dinámicos `REF` a bookmarks automáticos.
- **Interfaz Gráfica Web Local (GUI):** Servidor Flask local con un panel web interactivo en HTML5/CSS/JS con Drag & Drop para convertir múltiples archivos.
- **Entorno Virtual y Scripts:** Entorno virtual `venv` local y scripts de automatización multiplataforma `start.cmd`/`stop.cmd` y `start.sh`/`stop.sh`.
