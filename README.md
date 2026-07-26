# dbv-md2word

> Conversor personalizable de Markdown a Word (.docx) con interfaz visual local

## 📑 Índice

- [Sobre el proyecto](#about)
- [Requisitos](#requirements)
- [Instalación](#installation)
- [Cómo ejecutar](#usage)
  - [Interfaz Web](#usage-web)
  - [Línea de Comandos (CLI)](#usage-cli)
  - [Servidor MCP (Model Context Protocol)](#usage-mcp)
  - [GitHub Action](#usage-github-action)
  - [Habilidades de Agente (Agentic Skills)](#usage-skills)
- [Cómo parar](#stop)
- [Estructura del proyecto](#structure)
- [Changelog](#changelog)
- [Licencia](#license)

---

<a name="about"></a>
## 📌 Sobre el proyecto

`dbv-md2word` es una herramienta potente y autónoma diseñada para convertir archivos Markdown (`.md`) a documentos de Microsoft Word (`.docx`) manteniendo un estilo visual premium de forma nativa (sin depender de Pandoc) y utilizando **estilos nativos de Word** en español (`Título 1`, `Título 2`, `Título 3`, `Normal`).

La herramienta incluye una **interfaz web local interactiva** que permite configurar la tipografía, el color corporativo de los títulos y bordes, la alineación del texto normal (justificado o a la izquierda), e inyectar campos dinámicos de Word como la Tabla de Contenidos (TOC), numeración automática de figuras/tablas (campos SEQ) y referencias cruzadas (campos REF).

**Construido con:**
- Python 3.12+
- python-docx (Generación de Word)
- FastAPI & Uvicorn (Servidor web local)
- HTML5, JS (ES6+) y Vanilla CSS (Interfaz gráfica premium)

---

<a name="requirements"></a>
## 🧰 Requisitos

- **Python 3.12 o superior** (Puedes descargarlo desde la [Web oficial de Python](https://www.python.org/downloads/)).
  - *Recomendación:* Se recomienda descargar el **Standalone Installer** (instalador ejecutable estándar) en lugar de la versión de la tienda de aplicaciones.
  - *⚠️ Muy importante (Windows):* Durante la instalación en Windows, asegúrate de marcar la casilla **"Add python.exe to PATH"** (Añadir python.exe al PATH) para que la consola reconozca el comando.
- **Pip** (Administrador de paquetes de Python): Se instala de forma automática junto con Python, por lo que no requieres realizar ninguna instalación adicional.

---

<a name="installation"></a>
## ⚙️ Instalación

### Método Recomendado (Scripts de Arranque Rápido)
El proceso de instalación de dependencias está completamente automatizado y se realiza mediante el script de arranque inteligente (`start.cmd` o `start.sh`). La primera vez que lo ejecutes, creará el entorno virtual e instalará todo de forma automática.

### Método Avanzado (Instalación de Paquete Local)
Al cumplir con el estándar PEP 621, puedes instalar el proyecto de forma local y editable en tu sistema para registrar los ejecutables globales:

```bash
# 1. Crear y activar el entorno virtual
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# 2. Instalar el proyecto en modo editable
pip install -e .
```

Esto instalará automáticamente todas las dependencias y registrará los comandos `dbv-md2word`, `dbv-md2word-server` y `dbv-md2word-mcp` en tu terminal.

### Instalación desde Repositorio (Git / GitHub)
Cualquier usuario puede instalar la aplicación y registrar los ejecutables globales directamente desde el repositorio remoto con un único comando:

```bash
pip install git+https://github.com/davidbuenov/dbv-md2word.git
```

---

<a name="usage"></a>
## ▶️ Cómo ejecutar

<a name="usage-web"></a>
### 💻 Interfaz Web
Utiliza los scripts de arranque rápido incluidos en la raíz del proyecto. Estos scripts activarán el entorno virtual de Python, instalarán las dependencias necesarias de forma automática y levantarán el servidor.

**Windows:**
Doble clic en el script o ejecútalo en la consola:
```cmd
start.cmd
```

**macOS / Linux:**
Otorga permisos de ejecución e inicia el script de arranque:
```bash
chmod +x start.sh
./start.sh
```

Una vez iniciado el servidor, la aplicación abrirá automáticamente tu navegador en la dirección:
`http://127.0.0.1:puerto` (el puerto se asigna dinámicamente de forma automática).

<a name="usage-cli"></a>
### 📝 Línea de Comandos (CLI)
Si prefieres no usar la interfaz web, puedes realizar conversiones directamente desde la consola.

**Opción A (Comando Global de Pip):**
Si instalaste el proyecto localmente mediante `pip install -e .`, puedes llamar al comando global directamente desde cualquier ubicación:
```bash
dbv-md2word <archivo.md> [archivo_salida.docx] [config.json]
```

**Opción B (Ejecución Tradicional de Python):**
```bash
# Activa el entorno virtual
venv\Scripts\activate

# Ejecuta el convertidor tradicional
python convert_md_to_docx.py <archivo.md> [archivo_salida.docx] [config.json]
```

<a name="usage-mcp"></a>
### 🤖 Servidor MCP (Model Context Protocol)
El proyecto incluye un servidor MCP (`mcp_server.py`) que expone la herramienta `convert_markdown_to_docx` a entornos de agentes LLM como **Cursor**, **Windsurf** o **Claude Desktop**. Esto permite que un agente de IA convierta tus archivos Markdown a Word bajo demanda y con estilos premium.

Si instalaste el paquete vía pip, puedes configurar tu cliente MCP para que apunte directamente al ejecutable registrado `dbv-md2word-mcp`. Para ver las guías de instalación paso a paso en cada IDE o en Claude Desktop, consulta la **[Guía del Servidor MCP](./dbv-specs-ops/docs/MCP_SERVER.md)**.


<a name="usage-github-action"></a>
### 🐙 GitHub Action
Puedes integrar `dbv-md2word` directamente en tus flujos de integración continua (CI/CD) para compilar documentación Markdown a Word automáticamente en cada confirmación de cambios.

Para ver detalles avanzados, parámetros de entradas y ejemplos prácticos (múltiples archivos, bucles de compilación masiva, etc.), consulta la **[Guía de Integración con GitHub Actions](./dbv-specs-ops/docs/GITHUB_ACTIONS.md)**.

Un ejemplo de flujo de trabajo básico (`.github/workflows/convert-docs.yml`):

```yaml
name: Convertir Documentación a Word

on:
  push:
    paths:
      - '**.md'

jobs:
  build-docx:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar Código
        uses: actions/checkout@v4

      - name: Convertir Markdown a Word
        uses: davidbuenov/dbv-md2word@v1.1.1  # Usa la versión estable
        with:
          source: 'README.md'
          output: 'dist/README.docx'

      - name: Subir Documento Word Generado
        uses: actions/upload-artifact@v4
        with:
          name: Word-Document
          path: dist/README.docx
```

<a name="usage-skills"></a>
### 🧠 Habilidades de Agente (Agentic Skills)
El convertidor está empaquetado como un **Agentic Skill** bajo el estándar de herramientas locales de IA. Esto permite que asistentes autónomos (como **Antigravity**) o agentes web (como **Claude Projects** y **Custom GPTs**) reconozcan y ejecuten la conversión de archivos de forma directa en su terminal.

Para ver las guías de integración de la habilidad y cómo usarla en tus propios proyectos de Claude y ChatGPT, consulta la **[Guía de Habilidades de Agente](./dbv-specs-ops/docs/AGENTIC_SKILLS.md)**.

> ⚠️ **IMPORTANTE (Actualización de Campos en Word):**  
> Al abrir los documentos generados, Microsoft Word te preguntará: *"Este documento contiene campos que pueden hacer referencia a otros archivos. ¿Desea actualizar los campos en el documento?"*. Haz clic en **Sí** para que las referencias, el índice (TOC) y los números de figuras se generen correctamente. También puedes forzar la actualización en cualquier momento seleccionando todo (`Ctrl + E`) y presionando `F9`.

---

<a name="stop"></a>
## ⏹ Cómo parar

Para detener de forma segura el servidor local de la aplicación, utiliza los scripts de parada:

**Windows:**
```cmd
stop.cmd
```

**macOS / Linux:**
Otorga permisos e inicia el script de parada:
```bash
chmod +x stop.sh
./stop.sh
```

---

<a name="structure"></a>
## 📂 Estructura del proyecto

```text
dbv-md2word/
├── dbv-specs-ops/               # Carpeta del framework de desarrollo SDD
│   ├── docs/                    # Documentación de diseño y especificaciones
│   │   ├── ARCHITECTURE.md      # Arquitectura técnica y stack de la app
│   │   ├── DESIGN.md            # Sistema de diseño y estilos visuales
│   │   └── SPECIFICATIONS.md    # Especificaciones funcionales de la app
│   ├── project.config.md        # Identidad del proyecto y metadatos del framework
│   ├── memory.md                # Registro de decisiones y lecciones aprendidas
│   └── task.md                  # Registro y checklist de tareas actuales
├── static/                      # Recursos estáticos de la interfaz web
│   ├── app.js                   # Lógica frontend (Drag & Drop, API)
│   └── style.css                # Estética visual y Glassmorphism
├── templates/                   # Plantillas del servidor
│   └── index.html               # Interfaz gráfica de la aplicación
├── tests/                       # Suite de pruebas unitarias
│   └── test_converter.py        # Validación de estilos y XML
├── convert_md_to_docx.py        # Módulo de conversión de Markdown a Word
├── server.py                    # Servidor FastAPI local y API de conversión
├── mcp_server.py                # Servidor Model Context Protocol
├── requirements.txt             # Dependencias del proyecto
├── pyproject.toml               # Configuración de empaquetado (PEP 621)
├── start.cmd / start.sh         # Scripts de arranque rápido automatizado
├── stop.cmd / stop.sh           # Scripts de parada de la aplicación
├── config.json                  # Opciones de estilo globales por defecto
├── CHANGELOG.md                 # Historial de versiones y cambios
└── README.md                    # Este archivo
```

---

<a name="changelog"></a>
## 📋 Changelog

Consulta el archivo [CHANGELOG.md](./CHANGELOG.md) para ver el historial detallado de cambios y versiones del proyecto.

---

<a name="license"></a>
## 📄 Licencia

Este proyecto está bajo la Licencia MIT — consulta el archivo [LICENSE](./LICENSE) para más detalles.

Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov

---

> 🛠️ Built with **[dbv-specs-ops](https://github.com/davidbuenov/dbv-specs-ops)** — the SDD framework for AI-assisted development.  
> Created by [David Bueno Vallejo](https://github.com/davidbuenov) — free and open source.
