# 📋 Especificaciones: dbv-md2word

> **Fase:** `/spec` (Especificación)
> **Estado:** Validado
> **Última Revisión:** 2026-06-13

---

## 🎯 1. Contexto y Objetivos

- **Problema:** Los conversores genéricos de Markdown a Word (incluyendo el script anterior) no utilizan adecuadamente los estilos nativos de Microsoft Word (como "Título 1", "Título 2", "Normal"), sino que aplican formato directo (fuente, tamaño, color) sobre texto normal. Esto genera archivos Word "sucios" y difíciles de editar o formatear posteriormente. Además, no se generan índices reales de Word (TOC) ni numeración automática de figuras y tablas con referencias cruzadas reales de Word.
- **Objetivo (Éxito):** Crear una aplicación web local potente e interactiva con backend en Python (Flask) y frontend en HTML/CSS/JS que permita a los usuarios cargar por arrastre (drag-and-drop) múltiples archivos Markdown y convertirlos a documentos de Word (.docx) perfectamente estructurados. El usuario podrá personalizar las fuentes, colores corporativos y activar opciones avanzadas (TOC, numeración automática de figuras/tablas y referencias cruzadas nativas).

## 👥 2. Usuarios y Escenarios

- **Perfil de Usuario:** Desarrolladores, redactores técnicos y profesionales que escriben documentación en Markdown y necesitan exportarla a Microsoft Word con formato corporativo impecable y editable de forma profesional.
- **Escenarios Clave:**
  - *Conversión de múltiples manuales:* El usuario arrastra 5 archivos `.md` de documentación, selecciona la fuente corporativa "Aptos Display", elige un color azul oscuro y genera los 5 archivos `.docx` correspondientes en un solo clic.
  - *Documento Técnico Complejo:* El usuario convierte un documento técnico con diagramas (figuras), tablas y código fuente. El documento resultante incluye un índice nativo actualizable en Word, figuras numeradas como `Fig. 1`, `Fig. 2` de forma dinámica mediante campos `SEQ`, y el texto que dice `[Fig. 1]` se convierte en una referencia cruzada (campo `REF`) que apunta directamente al marcador de la imagen.

## ✨ 3. Funcionalidades Principales (Requisitos)

- [ ] **F1: Interfaz Visual Local:** Aplicación web local accesible desde el navegador con zona drag-and-drop para cargar archivos `.md` simultáneamente.
- [ ] **F2: Personalización de Estilos en UI:**
  - Selección de fuente para Títulos (ej. Aptos Display, Arial, Georgia).
  - Selección de fuente para Texto Normal (ej. Calibri, Arial).
  - Selección de fuente para Código (Consolas, Courier New).
  - Selector de color principal para encabezados y bordes de bloques de código.
- [ ] **F3: Mapeo de Estilos Nativos de Word (Español):**
  - Encabezados Markdown (#, ##, ###) deben mapearse a los estilos nativos de Word: `Heading 1` (Título 1), `Heading 2` (Título 2), `Heading 3` (Título 3).
  - Bloques de código deben crearse bajo un estilo de párrafo propio llamado `codigo` (con fondo gris y borde azul).
  - Código en línea debe usar un estilo de carácter propio llamado `codigo_car` con fuente Courier New/Consolas de tamaño reducido.
- [ ] **F4: Tabla de Contenidos (TOC) Nativa:** Opción de insertar un índice nativo de Word (`w:instrText` con el código de campo `TOC \o "1-3" \h \z \u`) al inicio del documento.
- [ ] **F5: Numeración Automática y Referencias Cruzadas:**
  - Las imágenes (`![Descripción](ruta)`) se renderizarán con un pie de foto: "Fig. [Campo SEQ Figure]: Descripción".
  - Las tablas tendrán un pie de tabla o cabecera: "Tabla [Campo SEQ Table]: Título".
  - Las referencias cruzadas en el texto escritas como `[Fig. X]` o `[Tabla Y]` se buscarán y se convertirán en campos dinámicos `REF` de Word que apunten al marcador (`bookmark`) de la figura o tabla correspondiente.
- [ ] **F6: Descarga Múltiple:** Permitir descargar los archivos convertidos individualmente o agrupados en un archivo `.zip`.

## 🏗️ 4. Propuesta de Solución Técnica (Resumen)

- **Enfoque:** Servidor local Flask en Python 3 para el backend y panel en HTML/CSS/JS con Vanilla CSS.
- **Dependencias Críticas:** `python-docx` para manipulación de archivos Word XML, `Flask` para el servidor web local.
- **Sistema de Diseño:** Ver `docs/DESIGN.md` para el estilo visual premium (oscuro/claro, transiciones fluidas, tipografía Outfit/Inter).

## 🚫 5. Fuera de Alcance (Out of Scope)

- [ ] Edición directa de Markdown en la interfaz web (solo carga y conversión).
- [ ] Sincronización en la nube o base de datos de usuarios (aplicación 100% local y offline).

## ⚠️ 6. Riesgos y Mitigación

- **Riesgo:** Limitación de Microsoft Word en la actualización automática de campos dinámicos. Al abrir el archivo, Word no muestra el número final del campo `SEQ` o `TOC` hasta que los campos se actualizan.
  - **Mitigación:** Incluir una advertencia clara en la interfaz y en el README explicando que el usuario debe pulsar "Sí" al diálogo de actualización de Word, o presionar `Ctrl + E` y luego `F9`.
- **Riesgo:** Rutas de imágenes rotas en Markdown.
  - **Mitigación:** El parser debe buscar las imágenes tanto de forma relativa al archivo markdown como en un directorio temporal si se suben a través de la web, validando su existencia antes de intentar insertarlas en el documento Word.

## ❓ 7. Preguntas Abiertas

*No hay preguntas abiertas críticas pendientes para la fase inicial de desarrollo.*