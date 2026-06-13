# Tareas de Implementación — dbv-md2word

- [x] **Task 1: Refactorizar `convert_md_to_docx.py`**
    - [x] Crear la función `add_field` para formatear correctamente la secuencia de elementos XML de los campos de Word.
    - [x] Refactorizar `add_toc`, `add_figure_caption`, `add_table_caption` y `add_cross_reference` para que utilicen `add_field`.
    - [x] Mejorar la lógica de ubicación del TOC automático.
- [x] **Task 2: Modificar `server.py`**
    - [x] Añadir el endpoint `GET /api/config`.
    - [x] Actualizar el parámetro `body_font` por defecto a "Aptos".
- [x] **Task 3: Modificar `templates/index.html`**
    - [x] Establecer el valor por defecto del selector `body-font` a "Aptos".
- [x] **Task 4: Modificar `static/app.js`**
    - [x] Implementar la función `loadConfig()` para poblar la UI al iniciar.
- [x] **Task 5: Verificar cambios**
    - [x] Ejecutar pruebas unitarias.
    - [x] Levantar el servidor y realizar verificación manual de la interfaz y conversión.
- [x] **Task 6: Configuración del Entorno en IDE**
    - [x] Configurar rutas relativas y exclusiones en `.vscode/settings.json` para corregir el error de detección de python.exe de Antigravity.

---

## 📸 Snapshot de Contexto (Próximo Paso)
- **Versión Liberada:** `v1.0.0` (Versión inicial estable con interfaz gráfica web local, personalización de alineación del texto normal, campos dinámicos nativos de Word en español, corrección de dependencias y exclusión de temporales).
- **Siguiente Objetivo:** Optimizar el rendimiento de la conversión para archivos masivos y agregar soporte para estilos de tablas personalizados avanzados en el backend.