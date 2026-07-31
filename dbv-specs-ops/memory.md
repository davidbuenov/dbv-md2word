# 🧠 Memory & Context

> **Frontera de uso (Memory vs. Tasks):**
> - `task.md` → progreso **operativo**: checklist de tareas, Snapshot de Contexto (el paso exacto siguiente), y estado de la sesión.
> - `memory.md` → contexto **cualitativo y temático**: conocimiento persistente, decisiones técnicas profundas, lecciones, y el área del producto en foco (no el paso específico).

---

## 🎯 Contexto Activo
- **Estado actual del desarrollo:** Reestructurando el proyecto para incorporar la metodología SDD. Inicializando Git, creando entorno virtual `venv/` local e implementando la interfaz visual interactiva con servidor local FastAPI.
- **Foco inmediato:** Refactorizar el backend de conversión en `convert_md_to_docx.py` para soportar estilos nativos localized de Word en español ("Título 1", "Título 2", "Título 3"), campos XML dinámicos (TOC, SEQ, REF para figuras/tablas) e implementar el servidor local FastAPI (`server.py`).

## 🏗️ Log de Decisiones Técnicas (ADR Ligero)

- **2026-06-13 - Servidor local FastAPI para la GUI:** Decisión de usar un servidor FastAPI (Uvicorn) local para levantar una interfaz web interactiva (HTML/CSS/JS) que permite subir múltiples archivos y configurar de forma visual las fuentes y colores del documento generado. Evita dependencias pesadas de Node.js o frameworks desktop nativos complejos (como Electron o PyQt) manteniendo el núcleo en Python y eliminando warnings de desarrollo.
- **2026-06-13 - Mapeo de Estilos Nativos en Español:** Para que los documentos generados se consideren bien hechos en Word en español, mapeamos los niveles de título a los nombres traducidos de Word (`Título 1`, `Título 2`, `Título 3`).
- **2026-06-13 - Numeración Automática mediante Campos SEQ y Marcadores REF:** Las imágenes y tablas se numeran con campos `SEQ` insertados a nivel XML de Word processingML. Las referencias en texto `[Fig. X]` se reemplazan por campos de referencia `REF` que enlazan con el marcador (`bookmark`) de la figura correspondiente. Esto permite actualizaciones dinámicas directas en Word (vía F9).
- **2026-06-13 - Estructura XML Secuencial Correcta para Campos de Word:** Los campos dinámicos (TOC, SEQ, REF) deben construirse en el orden estricto de Word OpenXML: `begin` -> `instrText` (código del campo) -> `separate` -> `result/placeholder` -> `end`. Separar esto en runs consecutivos y en orden evita que el placeholder quede fuera del campo, lo cual impedía su correcta actualización en Word.
- **2026-06-13 - Configuración Centralizada y Consistente (`config.json`):** Se introdujo `config.json` para definir las opciones iniciales por defecto (como la fuente "Aptos"). Esto unifica los fallbacks en la CLI y permite sincronizar dinámicamente la Web GUI al iniciar consultando la API `/api/config`.
- **2026-06-13 - Control de Alineación del Cuerpo y Código:** Se implementó el soporte para la alineación del texto normal (justificado por defecto). Los bloques de código y las leyendas de tablas se forzaron de manera explícita a la izquierda (`LEFT`) para garantizar una legibilidad adecuada, evitando heredar la alineación justificada del estilo normal del que heredan.
- **2026-06-14 - Integración de Servidor MCP via FastMCP:** Implementación de un punto de acceso MCP en `mcp_server.py` utilizando FastMCP para dar soporte nativo a agentes de IA. Se identificó que `FastMCP` no acepta el keyword argument `description` en su inicializador en la versión actual.
- **2026-06-14 - Acción Compuesta en Lugar de Docker:** Uso de un GitHub Composite Runner en `action.yml` para evitar el retraso de compilación de Docker y dar soporte multiplataforma nativo a runners Windows, macOS y Linux.
- **2026-06-14 - Pasaje Seguro de Argumentos Opcionales en CI:** Construcción de arrays de argumentos condicionales en bash (`ARGS`) para evitar enviar strings vacías a `convert_md_to_docx.py`.
- **2026-07-31 - Fuente Dedicada de Emoji (Segoe UI Emoji) y Tratamiento de Fallback:** Implementación de división de runs para aislar caracteres de emoji aplicando una fuente compatible con colores (como "Segoe UI Emoji"). Se reconoce que es Windows-céntrico por defecto y se permite su personalización o desactivación (cadena vacía) en config.json.


## ⚠️ Lecciones Aprendidas / Errores Evitados

- **Campos dinámicos no evaluados por defecto en python-docx:** python-docx no contiene un motor de layout para evaluar el valor de los campos SEQ o de la Tabla de Contenidos (TOC). El documento generado contiene solo los campos XML. Microsoft Word se encargará de evaluarlos y numerarlos al abrir el documento y aceptar la actualización, o forzando la actualización con `Ctrl + E` + `F9`. Esto debe explicarse en la interfaz web y el README para evitar falsos reportes de error por parte del usuario.
- **Incompatibilidades del IDE con la variable `${workspaceFolder}` y el directorio `venv/`:** En Windows, el uso de `${workspaceFolder}` mezclado con barras normales en `"python.defaultInterpreterPath"` a menudo resulta en rutas que los servicios e indexadores de extensiones de VS Code o Antigravity no pueden manejar. Configurar rutas relativas y añadir la carpeta `venv/` a las directivas de exclusión de búsqueda y archivos evita que el IDE indexe ejecutables binarios y lance alertas de error de manejo de archivos.
- **Fallbacks automáticos de fuentes en Word frente a w:rFonts explícito:** Si un run de Word declara explícitamente una fuente (ej. w:rFonts con w:ascii="Aptos"), Word desactiva el fallback automático para emojis si esa fuente no los contiene, mostrando cuadrados vacíos. Dividir los runs en caliente y aplicar "Segoe UI Emoji" únicamente al tramo de caracteres emoji soluciona este comportamiento.
- **Validación robusta de sintaxis Markdown:** El parseo de enlaces markdown usando búsquedas de subcadenas sueltas con "in" (ej. '[' y '(' en el texto) produce falsos positivos destructivos en textos cotidianos como "[Sí] Activo (pasivo)". Es obligatorio el uso de delimitación estricta y adyacencia real "]" + "(" junto con expresiones regulares ancladas para aislar el enlace real.


## 🗺️ Mapa de Relaciones

- `server.py` → Servidor local FastAPI, gestiona la API `/api/convert` y sirve los archivos del frontend (`templates/index.html` y estáticos en `static/`). Depende de `convert_md_to_docx.py`.
- `convert_md_to_docx.py` → Módulo principal de conversión de Markdown a DOCX. Parsea bloques y textos e interactúa con `python-docx` para inyectar estilos y campos XML nativos.
- `static/app.js` → Orquesta el Drag & Drop, recolecta las configuraciones de estilos de la interfaz y hace fetch al backend para descargar el resultado.

---

## 🧹 Política de Mantenimiento

*Aplicar en cada `/ship` de tipo Major, o cuando este fichero supere las 200 líneas activas:*

- **Consolida** decisiones relacionadas en una sola entrada.
- **Archiva** lecciones ya internalizadas en el código: muévelas a `memory.archive.md`.
- **Elimina** entradas obsoletas.
