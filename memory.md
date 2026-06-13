# 🧠 Memory & Context

> **Frontera de uso (Memory vs. Tasks):**
> - `task.md` → progreso **operativo**: checklist de tareas, Snapshot de Contexto (el paso exacto siguiente), y estado de la sesión.
> - `memory.md` → contexto **cualitativo y temático**: conocimiento persistente, decisiones técnicas profundas, lecciones, y el área del producto en foco (no el paso específico).

---

## 🎯 Contexto Activo
- **Estado actual del desarrollo:** Reestructurando el proyecto para incorporar la metodología SDD. Inicializando Git, creando entorno virtual `venv/` local e implementando la interfaz visual interactiva con servidor local Flask.
- **Foco inmediato:** Refactorizar el backend de conversión en `convert_md_to_docx.py` para soportar estilos nativos localized de Word en español ("Título 1", "Título 2", "Título 3"), campos XML dinámicos (TOC, SEQ, REF para figuras/tablas) e implementar el servidor local Flask (`server.py`).

## 🏗️ Log de Decisiones Técnicas (ADR Ligero)

- **2026-06-13 - Servidor local Flask para la GUI:** Decisión de usar un servidor Flask local para levantar una interfaz web interactiva (HTML/CSS/JS) que permite subir múltiples archivos y configurar de forma visual las fuentes y colores del documento generado. Evita dependencias pesadas de Node.js o frameworks desktop nativos complejos (como Electron o PyQt) manteniendo el núcleo en Python.
- **2026-06-13 - Mapeo de Estilos Nativos en Español:** Para que los documentos generados se consideren bien hechos en Word en español, mapeamos los niveles de título a los nombres traducidos de Word (`Título 1`, `Título 2`, `Título 3`).
- **2026-06-13 - Numeración Automática mediante Campos SEQ y Marcadores REF:** Las imágenes y tablas se numeran con campos `SEQ` insertados a nivel XML de Word processingML. Las referencias en texto `[Fig. X]` se reemplazan por campos de referencia `REF` que enlazan con el marcador (`bookmark`) de la figura correspondiente. Esto permite actualizaciones dinámicas directas en Word (vía F9).

## ⚠️ Lecciones Aprendidas / Errores Evitados

- **Campos dinámicos no evaluados por defecto en python-docx:** python-docx no contiene un motor de layout para evaluar el valor de los campos SEQ o de la Tabla de Contenidos (TOC). El documento generado contiene solo los campos XML. Microsoft Word se encargará de evaluarlos y numerarlos al abrir el documento y aceptar la actualización, o forzando la actualización con `Ctrl + E` + `F9`. Esto debe explicarse en la interfaz web y el README para evitar falsos reportes de error por parte del usuario.

## 🗺️ Mapa de Relaciones

- `server.py` → Servidor local Flask, gestiona la API `/api/convert` y sirve los archivos del frontend (`templates/index.html` y estáticos en `static/`). Depende de `convert_md_to_docx.py`.
- `convert_md_to_docx.py` → Módulo principal de conversión de Markdown a DOCX. Parsea bloques y textos e interactúa con `python-docx` para inyectar estilos y campos XML nativos.
- `static/app.js` → Orquesta el Drag & Drop, recolecta las configuraciones de estilos de la interfaz y hace fetch al backend para descargar el resultado.

---

## 🧹 Política de Mantenimiento

*Aplicar en cada `/ship` de tipo Major, o cuando este fichero supere las 200 líneas activas:*

- **Consolida** decisiones relacionadas en una sola entrada.
- **Archiva** lecciones ya internalizadas en el código: muévelas a `memory.archive.md`.
- **Elimina** entradas obsoletas.
