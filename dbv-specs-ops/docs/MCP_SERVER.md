<!--
  dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
  Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
  Licensed under the MIT License. See LICENSE for details.
  Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
-->

# 🤖 Servidor MCP (Model Context Protocol) — dbv-md2word

Esta guía describe detalladamente cómo configurar y utilizar el servidor MCP (`mcp_server.py`) de `dbv-md2word` para integrar la conversión automática de Markdown a Word en entornos de desarrollo asistidos por Inteligencia Artificial (IA).

---

## 📑 Índice
- [¿Qué es MCP?](#qué-es-mcp)
- [Requisitos previos](#requisitos-previos)
- [Guía 1: Configuración en Claude Desktop](#guía-1-configuración-en-claude-desktop)
- [Guía 2: Configuración en Cursor](#guía-2-configuración-en-cursor)
- [Guía 3: Configuración en Windsurf](#guía-3-configuración-en-windsurf)
- [Herramienta Expuesta (`convert_markdown_to_docx`)](#herramienta-expuesta-convert_markdown_to_docx)
- [Ejemplos de Prompts para usar con la IA](#ejemplos-de-prompts-para-usar-con-la-ia)

---

## ❓ ¿Qué es MCP?

El **Model Context Protocol (MCP)** es un estándar abierto desarrollado por Anthropic que permite a modelos de lenguaje (LLM) interactuar de forma segura con herramientas y datos locales en tu computadora. Al configurar este servidor, le das "superpoderes" a tu IA (como Claude o GPT) para que cree archivos de Word estructurados profesionalmente directamente en tu máquina.

---

## 🧰 Requisitos previos

1. Tener clonado este repositorio en tu máquina local.
2. Tener configurado el entorno virtual (`venv/`) e instaladas las dependencias. Si ya has iniciado la aplicación alguna vez con `start.cmd` o `start.sh`, esto ya está hecho.

---

## 💻 Guía 1: Configuración en Claude Desktop

1. Abre tu archivo de configuración de Claude Desktop:
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Pega la configuración del servidor MCP dentro del objeto `"mcpServers"` (sustituye las rutas por las tuyas absolutas usando barras normales `/`):

```json
{
  "mcpServers": {
    "dbv-md2word": {
      "command": "D:/Programacion/github-davidbuenov/dbv-md2word/venv/Scripts/python.exe",
      "args": [
        "D:/Programacion/github-davidbuenov/dbv-md2word/mcp_server.py"
      ]
    }
  }
}
```

3. Guarda el archivo y reinicia Claude Desktop por completo. 
4. Verás un icono de enchufe 🔌 en la esquina inferior derecha del chat de Claude indicando que el servidor está conectado.

---

## 🚀 Guía 2: Configuración en Cursor

1. Abre los ajustes de Cursor (`Ctrl + ,` o `Cmd + ,`).
2. Ve a la sección **Features** (Características) y busca **MCP**.
3. Haz clic en **+ Add New MCP Server** (Añadir nuevo servidor MCP).
4. Rellena los campos con los siguientes datos:
   - **Name**: `dbv-md2word`
   - **Type**: `command`
   - **Command**: `D:/Programacion/github-davidbuenov/dbv-md2word/venv/Scripts/python.exe D:/Programacion/github-davidbuenov/dbv-md2word/mcp_server.py`
5. Haz clic en **Save**. Cursor iniciará el servidor de inmediato y mostrará un círculo verde indicando que está activo.

---

## 🌊 Guía 3: Configuración en Windsurf

1. Abre la configuración de Windsurf (`Ctrl + ,` o `Cmd + ,`).
2. Busca la sección **Model Context Protocol (MCP)**.
3. Haz clic en **Add Server** (Añadir Servidor) y configura:
   - **Name**: `dbv-md2word`
   - **Type**: `command`
   - **Command**: `D:/Programacion/github-davidbuenov/dbv-md2word/venv/Scripts/python.exe D:/Programacion/github-davidbuenov/dbv-md2word/mcp_server.py`
4. Guarda los ajustes. El IDE conectará el servidor automáticamente.

---

## 🛠️ Herramienta Expuesta (`convert_markdown_to_docx`)

El servidor registra una única herramienta potente que la IA puede invocar de manera autónoma:

* **Nombre de la herramienta:** `convert_markdown_to_docx`
* **Argumentos:**
  - `markdown_content` (requerido): El contenido de texto en formato Markdown a convertir.
  - `output_path` (opcional): Ruta local donde guardar el archivo `.docx` resultante. Por defecto crea `document.docx` en el directorio actual.
  - `heading_font` (opcional): Tipografía para títulos (ej. `"Arial"`, `"Aptos Display"`).
  - `body_font` (opcional): Tipografía para texto normal (ej. `"Calibri"`, `"Aptos"`).
  - `code_font` (opcional): Tipografía para código (ej. `"Consolas"`).
  - `body_align` (opcional): Alineación del cuerpo (`"justify"` o `"left"`).
  - `primary_color` (opcional): Color principal en formato Hexadecimal (ej. `"#1F4E79"`).
  - `toc_enabled` (opcional): Activar/desactivar el Índice automático (`true` / `false`).
  - `numbering_enabled` (opcional): Activar/desactivar numeración de tablas/imágenes (`true` / `false`).

---

## 💬 Ejemplos de Prompts para usar con la IA

Una vez configurado el servidor en tu cliente de IA preferido, puedes usar prompts como los siguientes para realizar conversiones directas en caliente:

* **Ejemplo 1 (Básico):**
  > *"Toma este archivo markdown y conviértelo a un documento Word llamado informe.docx. Utiliza la herramienta dbv-md2word."*

* **Ejemplo 2 (Con estilo personalizado):**
  > *"Genera un documento Word a partir de este contenido. Quiero que uses la tipografía 'Georgia' para títulos, 'Arial' para el texto normal, alineación justificada y que el color primario de los títulos sea un azul marino oscuro (`#0B3C5D`). Guarda el resultado como dist/manual.docx."*

* **Ejemplo 3 (Creación y Conversión en un paso):**
  > *"Escribe una propuesta de arquitectura técnica para un microservicio en Node.js de unas 3 páginas y, una vez la tengas, conviértela directamente a Word usando dbv-md2word con índice de contenidos activado."*
