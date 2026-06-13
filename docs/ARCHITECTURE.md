# 🏗 Arquitectura Técnica: dbv-md2word

> **Fase:** `/plan` (Planificación Técnica)
> **Estado:** Validado
> **Última Revisión:** 2026-06-13

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Justificación |
| --- | --- | --- |
| **Lenguaje Backend** | Python 3.8+ | Lenguaje del script original y compatible con la librería `python-docx`. |
| **Lenguaje Frontend** | HTML5, JavaScript (ES6+), Vanilla CSS | Interfaz ligera, altamente responsiva y fácil de diseñar con estética premium sin dependencias pesadas de Node.js. |
| **Servidor Local** | FastAPI + Uvicorn | Servidor ASGI rápido y robusto de grado de producción en Python. Elimina warnings de desarrollo. |
| **Generación Word** | python-docx 1.2+ | Librería líder en Python para manipulación directa del formato OpenXML (.docx). |
| **Testing** | unittest (Python built-in) | Evitamos dependencias externas adicionales para testing. |

---

## 📂 Estructura de Directorios

```text
dbv-md2word/
├── docs/                        # Documentación SDD
│   ├── ARCHITECTURE.md          # Este archivo
│   ├── SPECIFICATIONS.md        # Especificaciones funcionales
│   └── DESIGN.md                # Directrices del sistema de diseño visual
├── static/                      # Recursos estáticos de la interfaz web
│   ├── app.js                   # Lógica frontend (Drag & Drop, API calls)
│   └── style.css                # Diseño visual (Premium Glassmorphism y Dark/Light)
├── templates/                   # Plantillas del servidor
│   └── index.html               # Página web única de la aplicación
├── tests/                       # Suite de pruebas unitarias
│   └── test_converter.py        # Validación de estilos, campos SEQ y referencias cruzadas
├── convert_md_to_docx.py        # Módulo de conversión Markdown a Word (refactorizado)
├── server.py                    # Servidor local Flask y punto de entrada de la aplicación
├── requirements.txt             # Dependencias del proyecto
├── start.cmd / start.sh         # Scripts de arranque automatizado (activan venv)
├── stop.cmd / stop.sh           # Scripts de parada de la aplicación
├── project.config.md            # Identidad del proyecto
├── memory.md                    # Memoria de decisiones técnicas
└── task.md                      # Registro y checklist de tareas actuales
```

---

## 🔑 Decisiones Técnicas Clave

### Estilos Nativos de Microsoft Word
- Para evitar aplicar formato directo a cada párrafo (lo cual ensucia el documento), configuraremos las propiedades de los estilos a nivel del documento (`doc.styles`):
  - Actualizaremos los estilos existentes: `Normal`, `Heading 1` (Título 1), `Heading 2` (Título 2) y `Heading 3` (Título 3) con la tipografía y el color configurados por el usuario.
  - Crearemos estilos personalizados en el documento si no existen:
    - `codigo` (Estilo de Párrafo): Para bloques de código, con sangría izquierda, tipografía monoespacio seleccionada, tamaño de fuente Pt(9) y borde izquierdo personalizado.
    - `codigo_car` (Estilo de Carácter): Para código en línea (`inline code`), tipografía monoespacio, sombreado de fondo gris y tamaño Pt(9.5).

### Generación de Campos Dinámicos de Word (XML)
Word procesa campos de instrucción dinámica. Usaremos manipulación XML (`python-docx` y `lxml` internos) para inyectar estos elementos en el documento:
- **TOC (Tabla de Contenidos):** Añadido mediante un nodo `w:instrText` con contenido `TOC \o "1-3" \h \z \u`.
- **SEQ (Secuencias):** Para numeración dinámica de figuras y tablas, inyectaremos un campo de instrucción `SEQ Figure \* ARABIC` y `SEQ Table \* ARABIC`.
- **Bookmarks (Marcadores):** Para que las referencias cruzadas funcionen, añadiremos un nodo `w:bookmarkStart` y `w:bookmarkEnd` alrededor de cada leyenda de figura o tabla con un nombre de marcador único (ej. `_Ref_Fig_1`).
- **REF (Referencias Cruzadas):** Para referenciar figuras/tablas en el texto (ej. al procesar `[Fig. X]`), buscaremos el patrón y lo reemplazaremos por un run que contenga un campo XML de instrucción `REF _Ref_Fig_X \h`.

---

## ⚠️ Restricciones y Riesgos Técnicos

- **Acceso a Archivos Locales:** Un servidor web en navegador no puede acceder directamente al sistema de archivos local del cliente por motivos de seguridad. 
  - **Mitigación:** Los archivos Markdown cargados mediante arrastre se suben a la memoria del servidor FastAPI. La conversión se realiza en el backend y los archivos Word resultantes se devuelven para su descarga inmediata.
- **Rutas de Imágenes:** Si el Markdown contiene imágenes relativas (ej. `![Diagrama](images/diag.png)`), el servidor FastAPI/Uvicorn necesita resolver esa ruta.
  - **Mitigación:** La API de conversión aceptará una estructura donde el usuario puede arrastrar tanto el Markdown como sus imágenes asociadas, o bien la herramienta resolverá las imágenes si se ejecuta mediante la CLI tradicional. En la interfaz web, se permitirá al usuario subir las imágenes correspondientes junto al archivo markdown.
