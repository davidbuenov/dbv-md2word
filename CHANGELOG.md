# Changelog — dbv-md2word

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Sin publicar] / [Unreleased]

---

## [1.4.0] — 2026-08-07

### Added
- **Empaquetado Agent Plugin 1.0.0:** El servidor MCP (`mcp_server.py`) y el Agent Skill `dbv-md2word` se exponen ahora de forma portable (sin rutas absolutas de máquina) bajo el estándar universal en `.well-known/agent-plugin/` (`plugin.json` + `mcp.json` con placeholders `${PLUGIN_ROOT}` + `skills/dbv-md2word/`). Ver `docs/AGENT_PLUGINS.md`.

### Changed
- **Upgrade del Framework a v2.4.0:** Se actualizaron `docs/MASTER_PROMPT.md`, `docs/UPGRADE_PROMPT.md` y se añadió `docs/AGENT_PLUGINS.md` (nuevo) para integrar el estándar Agent Plugins 1.0.0 en el flujo SDD.
- **Migración de la carpeta `skills/dbv-md2word/`:** Movida a `.well-known/agent-plugin/skills/dbv-md2word/`, eliminando la carpeta antigua en la raíz. Documentación (`README.md`, `docs/AGENTIC_SKILLS.md`, `docs/MCP_SERVER.md`) actualizada para reflejar la nueva ruta.
- **Consistencia de especificaciones:** `docs/SPECIFICATIONS.md` y `docs/ARCHITECTURE.md` actualizados con la interfaz de agentes de IA (MCP + Agent Plugin) y una nueva sección de Agent Harness.

---

## [1.3.0] — 2026-07-31

### Added
- **Aislamiento y soporte de fuente para Emojis:** Se dividen los fragmentos de texto (runs) en MS Word para aislar caracteres Unicode de tipo emoji y aplicarles una fuente de emojis específica (por defecto "Segoe UI Emoji"), configurable en `config.json` o mediante parámetros en la API y MCP. Esto soluciona que los emojis (✅, ❌, etc.) se renderizaran como cuadros vacíos al usar fuentes corporativas que no disponen de sus glifos (como Aptos).

### Changed
- **Upgrade del Framework a v2.3.0:** Se actualizaron los archivos del framework `dbv-specs-ops` a la última versión 2.3.0 para soporte de guías de diseño visual avanzadas (`docs/DESIGN_ENRICHMENT.md`).

### Fixed
- **Falsos positivos de enlaces en Markdown:** Se corrigió un error en `add_runs_to_paragraph` que confundía cualquier fragmento de texto delimitado por corchetes y paréntesis (como "[Sí] Activo (pasivo)") con un enlace markdown real, perdiendo texto en el proceso. Ahora se exige estrictamente la adyacencia de los caracteres `](` para tratarlos como enlaces.

---

## [1.2.0] — 2026-07-26

### Added
- **Empaquetado y soporte para `pip install` (PEP 621):** Configurado `pyproject.toml` en la raíz para permitir la instalación directa del proyecto (`pip install .` o editable con `-e .`), así como su instalación remota directa desde GitHub (`pip install git+...`).
- **Comandos Ejecutables Globales:** Registro de entry points para los comandos `dbv-md2word` (CLI), `dbv-md2word-server` (GUI web FastAPI) y `dbv-md2word-mcp` (servidor MCP).
- **Nueva guía técnica de IA:** Añadido `docs/AGENTIC_ENGINEERING.md` con pautas de desarrollo de agentes e integraciones.

### Changed
- **Upgrade del Framework a v2.2.0:** Los archivos del framework de Spec-Driven Development se actualizaron a la versión 2.2.0 y se aislaron de manera limpia dentro de la subcarpeta `dbv-specs-ops/`.
- **Actualización de Activadores:** Modificados `GEMINI.md`, `CLAUDE.md`, `ANTIGRAVITY.md`, `.windsurfrules` y las instrucciones de Copilot para redirigir a los asistentes a la nueva subcarpeta de control.
- **Instrucciones en README:** Refactorizada la documentación del proyecto para cubrir los nuevos comandos y estructura de directorios.

### Fixed
- **Robustez de Codificación (Markdown Parser):** Corregido fallo de decodificación `UnicodeDecodeError` al procesar archivos Markdown con acentos en español guardados en codificación local de Windows (CP1252/ANSI), añadiendo fallbacks ordenados (UTF-8 -> CP1252 -> Latin-1).
- **Accesibilidad HTML:** Añadidos atributos `aria-label` y `title` a campos interactivos de formulario sin etiqueta en `templates/index.html` para cumplir con las pautas de accesibilidad.
- **Compatibilidad CSS**: Añadido el prefijo de compatibilidad `-webkit-backdrop-filter` para el efecto blur en `static/style.css`.

---

## [1.1.1] — 2026-06-14

### Fixed
- **Creación de Carpeta de Destino:** Corrección en `convert_md_to_docx.py` para asegurar que el directorio de salida se cree automáticamente si no existe al guardar el archivo Word. Esto resuelve fallos de ejecución en entornos de CI/CD (como GitHub Actions).

---

## [1.1.0] — 2026-06-14

### Added
- **Servidor MCP (Model Context Protocol):** Añadido `mcp_server.py` utilizando FastMCP para exponer la conversión a agentes de IA como Cursor, Windsurf y Claude Desktop.
- **GitHub Action:** Acción compuesta de GitHub (`action.yml`) para compilar de forma automática archivos Markdown a Word en flujos de integración continua (CI/CD).
- **Parámetro de Configuración en CLI:** Soporte para especificar un tercer argumento opcional con la ruta a un archivo JSON de configuración personalizada en `convert_md_to_docx.py`.

## [1.0.0] — 2026-06-13

### Added
- **Alineación de Texto Normal:** Nueva opción para elegir la alineación del texto del cuerpo del documento (Justificado o Alineado a la izquierda) desde la interfaz gráfica y el archivo de configuración. Por defecto, el texto normal se genera justificado, mientras que los bloques de código y las leyendas de tablas se mantienen alineados a la izquierda.

### Fixed
- **Dependencia de `werkzeug`:** Se añadió `werkzeug>=2.0.0` a [requirements.txt](file:///d:/Programacion/github-davidbuenov/dbv-md2word/requirements.txt) para solucionar el error `ModuleNotFoundError: No module named 'werkzeug'` al arrancar el servidor con `start.cmd`.

---

## [0.2.0] — 2026-06-13

### Added
- **Configuración Global (`config.json`):** Archivo de configuración central en la raíz del proyecto para definir fuentes por defecto (`body_font`, `heading_font`, `code_font`), color primario y estados por defecto de los selectores.
- **Endpoint `/api/config`:** Nueva ruta en `server.py` que sirve los valores cargados desde `config.json`.
- **Sincronización Web:** Script `static/app.js` modificado para obtener y aplicar la configuración de `config.json` en los controles de la interfaz web en tiempo de ejecución.
- **Exclusión de Entorno Virtual en IDE:** Añadidas directivas en `.vscode/settings.json` para evitar que el IDE indexe la carpeta `venv/` y use rutas relativas para el intérprete.

### Changed
- **Fuentes por Defecto:** Cambio de la fuente normal predeterminada de `"Calibri"` a `"Aptos"` en el backend (`convert_md_to_docx.py`, `server.py`) y en el selector HTML (`templates/index.html`).

### Fixed
- **Estructura XML de Campos de Word:** Corrección del orden XML en campos dinámicos (TOC, SEQ, REF) mediante la nueva función `add_field` (`begin` -> `instrText` -> `separate` -> `result` -> `end`), resolviendo fallos al actualizar índices en Microsoft Word.
- **Ubicación Inteligente del TOC:** Inyección de la Tabla de Contenidos al inicio del documento si este empieza con párrafos o encabezados distintos a H1.

---

## [0.1.1] — 2026-06-13

### Added
- **Mapeo de Estilos Nativos en Español:** Mapeo automático de títulos Markdown a los estilos nativos de Word en español (`Título 1`, `Título 2`, `Título 3`) y cuerpo a `Normal`.
- **Tipografías Forzadas por Run:** Configuración explícita de la tipografía elegida a nivel de run para evitar que el motor de temas de Word sobrescriba la fuente (ej. forzar *Aptos Display* y evitar fallback a *Calibri*).
- **Estilos Rápidos en Word:** Estilos `codigo` y `codigo_car` añadidos a la galería de estilos rápidos de Word (`quick_style = True`) para que aparezcan en la barra de formato superior.
- **Opción de Desplazamiento de Encabezados (Shift Headings):** Opción en UI y CLI para desplazar niveles de títulos (mapear H1 al estilo 'Título' de Word, H2 a 'Título 1', H3 a 'Título 2', etc.) para documentos con portada o títulos unificados.
- **Estilos de Código Personalizados:** Creación dinámica de estilos `codigo` (párrafo para bloques de código) y `codigo_car` (carácter para código en línea).
- **Tabla de Contenidos (TOC):** Inyección de campo dinámico `TOC` nativo de Word al inicio del documento.
- **Numeración de Figuras y Tablas:** Inserción automática de campos `SEQ Figure` y `SEQ Table` para figuras e imágenes con captions.
- **Referencias Cruzadas:** Detección de marcadores tipo `[Fig. X]` o `[Tabla Y]` en texto y reemplazo por campos dinámicos `REF` a bookmarks automáticos.
- **Interfaz Gráfica Web Local (GUI):** Servidor Flask local con un panel web interactivo en HTML5/CSS/JS con Drag & Drop para convertir múltiples archivos.
- **Entorno Virtual y Scripts:** Entorno virtual `venv` local y scripts de automatización multiplataforma `start.cmd`/`stop.cmd` y `start.sh`/`stop.sh`.

[Sin publicar]: https://github.com/davidbuenov/dbv-md2word/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/davidbuenov/dbv-md2word/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/davidbuenov/dbv-md2word/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/davidbuenov/dbv-md2word/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/davidbuenov/dbv-md2word/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/davidbuenov/dbv-md2word/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/davidbuenov/dbv-md2word/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/davidbuenov/dbv-md2word/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/davidbuenov/dbv-md2word/releases/tag/v0.1.1

