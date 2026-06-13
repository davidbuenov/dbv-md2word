# 📝 Registro de Tareas / Task Register

## 🏗 In Progress / En Curso

- [/] **Task 1: Bootstrap y Configuración del Entorno**
  - [x] Rellenar `project.config.md` con la identidad real del proyecto
  - [x] Completar las especificaciones técnicas en `docs/SPECIFICATIONS.md`
  - [x] Documentar la arquitectura técnica en `docs/ARCHITECTURE.md`
  - [x] Definir la especificación visual en `docs/DESIGN.md`
  - [ ] Inicializar el repositorio Git y realizar el commit inicial de configuración
  - [ ] Crear el entorno virtual Python local (`venv/`) e instalar las dependencias (`requirements.txt`)

## ⏳ Pending / Pendientes (Backlog)

- [ ] **Task 2: Refactorización del Núcleo Conversor (`convert_md_to_docx.py`)**
  - Mapeo de encabezados a estilos nativos de Word en español (`Título 1`, `Título 2`, `Título 3`).
  - Creación dinámica y configuración de estilos personalizados de párrafo `codigo` y de carácter `codigo_car`.
  - Inyección XML de Tabla de Contenidos (TOC) nativa.
  - Numeración automática de imágenes (`SEQ Figure`) y tablas (`SEQ Table`) con sus respectivos marcadores (`bookmarks`).
  - Reemplazo y generación de referencias cruzadas (`REF`) en el cuerpo del texto para `[Fig. X]` y `[Tabla Y]`.
- [ ] **Task 3: Desarrollo de la Interfaz Web Local**
  - Crear la estructura HTML5 responsiva en `templates/index.html` con panel de arrastre de archivos y panel de personalización de estilos.
  - Diseñar la hoja de estilos en `static/style.css` implementando los tokens de diseño (Dark/Light mode, Glassmorphism y micro-animaciones).
  - Desarrollar la lógica de cliente en `static/app.js` (Drag & Drop, validaciones y fetch API multi-archivo).
- [ ] **Task 4: Implementación del Servidor Flask (`server.py`)**
  - Crear el servidor que sirve la UI y expone la API de conversión `/api/convert`.
  - Soporte para procesar múltiples archivos Markdown, aplicar configuraciones JSON y empaquetar resultados en un `.zip` si hay múltiples salidas.
- [ ] **Task 5: Scripts de Automatización**
  - Crear scripts de arranque y parada multiplataforma (`start.cmd`, `stop.cmd`, `start.sh`, `stop.sh`) automatizando la activación del venv.
- [ ] **Task 6: Suite de Pruebas Unitarias (`tests/test_converter.py`)**
  - Crear pruebas unitarias que validen la conversión estructurada, estilos y campos dinámicos de Word.
- [ ] **Task 7: Entrega de Versión (`/ship`)**
  - Actualizar `README.md` explicando el uso de la interfaz web y la CLI.
  - Actualizar `CHANGELOG.md` e incrementar versión.
  - Realizar commit final, etiquetado y Snapshot de Contexto.

---

## 🔄 Context Snapshot / Snapshot de Contexto

> **Last update / Última actualización:** 2026-06-13
> **Exact point / Punto exacto:** Documentos de especificación, arquitectura y diseño definidos e incorporados al proyecto. Plan de implementación aprobado por el usuario con la consideración de estilos nativos de Word en español.
> **Pending / Pendiente:** Terminar la configuración inicial de Git y entorno virtual `venv/` (Task 1).
> **Next step / Próximo paso:** Crear el venv local, instalar dependencias e inicializar el repositorio git.