# Tareas de Implementación — dbv-md2word

- [x] **Task 1: Refactorizar `convert_md_to_docx.py`**
    - [x] Crear la función `add_field` para XML.
    - [x] Refactorizar pie de foto, pie de tabla y referencias.
    - [x] Mejorar la ubicación del TOC.
- [x] **Task 2: Modificar `server.py`**
    - [x] Endpoint GET /api/config.
- [x] **Task 3: Modificar `templates/index.html`**
    - [x] Valor por defecto a Aptos.
- [x] **Task 4: Modificar `static/app.js`**
    - [x] Carga de config al iniciar.
- [x] **Task 5: Verificar cambios**
    - [x] Pruebas unitarias.
- [x] **Task 6: Configuración del Entorno en IDE**
    - [x] Configurar exclusiones de venv.
- [x] **Task 7: Servidor MCP (Model Context Protocol)**
    - [x] Agregar `fastmcp>=0.1.0` a `requirements.txt`.
    - [x] Crear `mcp_server.py` con FastMCP.
    - [x] Implementar la herramienta `convert_markdown_to_docx` que exponga la lógica de conversión a los LLM.
- [x] **Task 8: GitHub Action**
    - [x] Crear `action.yml` como acción compuesta de GitHub.
    - [x] Configurar las entradas (`source`, `output`, `config`) y salidas de la acción.
- [x] **Task 9: Documentación y Verificación**
    - [x] Actualizar `README.md` con instrucciones de configuración de MCP (Cursor/Claude Desktop) y GitHub Actions.
    - [x] Ejecutar pruebas locales y verificar el servidor MCP con el inspector de MCP.

---

## 📸 Snapshot de Contexto (Próximo Paso)
- **Versión Liberada:** `v1.1.0` (Pendiente de commit y tag)
- **Siguiente Objetivo:** Obtener confirmación del título del commit por parte del usuario para proceder a la entrega formal (/ship) en Git y versionado semántico.