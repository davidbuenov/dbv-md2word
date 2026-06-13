# dbv-md2word

`dbv-md2word` es una herramienta potente y autónoma en Python diseñada para convertir archivos Markdown (`.md`) a documentos de Microsoft Word (`.docx`) manteniendo un estilo visual premium de forma nativa (sin depender de Pandoc) y utilizando **estilos nativos de Word** en español (`Título 1`, `Título 2`, `Título 3`, `Normal`).

La herramienta incluye una **interfaz web local interactiva** que permite configurar la tipografía, el color corporativo de los títulos y bordes, e inyectar campos dinámicos de Word como la Tabla de Contenidos (TOC), numeración automática de figuras/tablas (campos SEQ) y referencias cruzadas (campos REF).

---

## 🎨 Características Destacadas

- 🚀 **Sin Dependencias de Sistema:** 100% nativo. No requiere tener instalado Pandoc u otros convertidores; solo necesita Python y las librerías del entorno virtual (`python-docx`, `fastapi` y `uvicorn`).
- 🖥️ **Interfaz Visual Local (GUI Web):** Panel interactivo con zona Drag & Drop para arrastrar múltiples archivos Markdown e imágenes simultáneamente.
- 🎨 **Estilo Visual Personalizable:**
  - Selector de color corporativo personalizado.
  - Elección de fuentes para encabezados, texto normal y bloques de código (soporta fuentes modernas como *Aptos*, *Inter* u *Outfit*).
  - Mapeo impecable de encabezados Markdown a estilos nativos de Word (`Título 1`, `Título 2`, `Título 3`).
- 📝 **Estructuración Profesional y Campos Dinámicos:**
  - **Tabla de Contenidos (TOC):** Generación automática de índices nativos de Word.
  - **Figuras y Tablas Auto-numeradas:** Las imágenes se convierten en figuras con leyenda (`Fig. X`), y las tablas se numeran como (`Tabla Y`) usando campos `SEQ` de Word.
  - **Referencias Cruzadas:** Detección de marcadores como `[Fig. Leyenda]` o `[Tabla. Leyenda]` en el texto, reemplazándolos por campos dinámicos `REF` de Word que enlazan directamente con las figuras y tablas.
  - **Bloques de Código Estilizados:** Creación de estilos personalizados `codigo` (párrafo) y `codigo_car` (carácter para código en línea) con bordes y sombreados XML.

---

## 🚀 Instalación y Arranque Rápido

### En Windows:
1. Simplemente haz doble clic en `start.cmd` en la raíz del proyecto (o ejecútalo en la consola).
2. El script creará automáticamente el entorno virtual (`venv`), instalará las dependencias necesarias y abrirá el conversor en tu navegador predeterminado (`http://127.0.0.1:puerto`).

### En macOS / Linux:
1. Otorga permisos de ejecución e inicia el script de arranque:
   ```bash
   chmod +x start.sh stop.sh
   ./start.sh
   ```
2. El servidor web local se levantará y se abrirá tu navegador predeterminado automáticamente.

---

## 📝 Uso de la Interfaz Visual (Web GUI)

1. **Selecciona tus Estilos:** En el panel izquierdo, elige el color corporativo que desees para tus títulos y los bordes de los bloques de código, así como las fuentes para el texto.
2. **Carga los Archivos:** Arrastra uno o varios archivos `.md` a la zona de drop. Si tus documentos tienen imágenes locales (ej. `![Imagen](mi_foto.png)`), arrastra también los archivos de imagen correspondientes a la misma zona.
3. **Convierte:** Haz clic en **Convertir a Word (.docx)**.
4. **Descarga:** Si subiste un solo archivo, se descargará directamente el `.docx` con su mismo nombre original. Si subiste varios, se descargará un archivo `.zip` con todos los documentos convertidos.

> ⚠️ **IMPORTANTE (Actualización de Campos en Word):**  
> Debido a que python-docx escribe los campos dinámicos (`TOC`, `SEQ`, `REF`) en formato XML nativo pero no los renderiza (tarea que corresponde a Word), al abrir el documento generado Microsoft Word te preguntará: *"Este documento contiene campos que pueden hacer referencia a otros archivos. ¿Desea actualizar los campos en el documento?"*. Haz clic en **Sí** para que las referencias, la Tabla de Contenidos y los números de figuras se generen automáticamente.  
> También puedes presionar `Ctrl + E` (seleccionar todo) y luego `F9` dentro de Word para forzar la actualización de todos los campos en cualquier momento.

---

## 💻 Uso por Línea de Comandos (CLI)

Puedes seguir utilizando la herramienta directamente desde la CLI usando el entorno virtual:

```bash
# Activa el entorno virtual
venv\Scripts\activate

# Ejecuta el convertidor tradicional (usará fuentes y colores por defecto)
python convert_md_to_docx.py <archivo.md> [archivo_salida.docx]
```

---

## 🛠 Desarrollo y Pruebas

Si deseas realizar modificaciones al código del parser o del conversor, puedes ejecutar la suite de pruebas unitarias para validar que no haya regresiones en los estilos o la generación del XML de Word:

```bash
venv\Scripts\python -m unittest tests/test_converter.py
```

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Desarrollado con ❤️ en colaboración con **Antigravity** bajo la metodología Spec-Driven Development de **dbv-specs-ops**.
