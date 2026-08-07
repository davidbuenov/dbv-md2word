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
- [x] **Task 10: Actualizar framework dbv-specs-ops a v2.2.0**
    - [x] Migrar ficheros de control a la subcarpeta `dbv-specs-ops/`.
    - [x] Actualizar ficheros de framework descargados (v2.2.0).
    - [x] Actualizar ficheros de activación en la raíz.
    - [x] Realizar cambios quirúrgicos en `project.config.md`.
    - [x] Ejecutar suite de pruebas unitarias.
    - [x] Generar el Walkthrough de cierre.

- [x] **Task 11: Corrección de Emojis, Links y Framework v2.3.0**
    - [x] Descargar y actualizar todos los ficheros del framework a v2.3.0.
    - [x] Actualizar `project.config.md` y `SPECIFICATIONS.md` con referencias de v2.3.0.
    - [x] Aplicar parches de emojis y detección de enlaces en `convert_md_to_docx.py` y `config.json`.
    - [x] Propagar cambios a `server.py` y `mcp_server.py`.
    - [x] Sincronizar la carpeta `skills/dbv-md2word/` con el nuevo motor y recursos.
    - [x] Agregar tests para emojis y falsos positivos de enlaces en `tests/test_converter.py`.
    - [x] Validar con la suite de pruebas unitarias.
    - [x] Generar el `walkthrough.md` y registrar en el `CHANGELOG.md`.

- [x] **Task 12: Actualización del framework a v2.4.0 y migración a Agent Plugins 1.0.0**
    - [x] Descargar y actualizar `docs/MASTER_PROMPT.md` y `docs/UPGRADE_PROMPT.md` a v2.4.0.
    - [x] Crear `docs/AGENT_PLUGINS.md` (nuevo) con la guía del estándar.
    - [x] Actualizar `project.config.md` (`Framework Version: 2.4.0`).
    - [x] Migrar `skills/dbv-md2word/` a `.well-known/agent-plugin/skills/dbv-md2word/` (`git mv`) y crear `plugin.json` + `mcp.json` portables (`${PLUGIN_ROOT}`).
    - [x] Actualizar `docs/SPECIFICATIONS.md` y `docs/ARCHITECTURE.md` con la interfaz de agentes (Agent Harness).
    - [x] Corregir rutas obsoletas en `docs/AGENTIC_SKILLS.md` y `docs/MCP_SERVER.md`.
    - [x] Bump de versión de la app a `v1.4.0` (`pyproject.toml`, `__version__`, `SKILL.md`, README).
    - [x] Actualizar `CHANGELOG.md` con la entrada `[1.4.0]`.
    - [x] Generar el `walkthrough.md` de cierre.

---

## 📸 Snapshot de Contexto (Próximo Paso)
- **Versión Liberada:** `v1.4.0`
- **Siguiente Objetivo:** Ninguno pendiente de esta entrega. Próximos pasos opcionales sugeridos: (1) revisar si procede implementar la infraestructura completa de Agent Readiness Web (robots.txt, llms.txt, cabeceras `Link`) ya que `project.config.md` tiene `Agent Readiness (Web): Yes` pero la app es 100% local/offline; (2) regenerar `.well-known/agent-plugin/skills/dbv-md2word/dbv-md2word.zip` si se distribuye como artefacto descargable.