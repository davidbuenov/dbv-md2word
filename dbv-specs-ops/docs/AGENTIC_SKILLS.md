<!--
  dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
  Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
  Licensed under the MIT License. See LICENSE for details.
  Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
-->

# 🧠 Habilidades de Agente (Agentic Skills) — dbv-md2word

Esta guía describe cómo utilizar y configurar `dbv-md2word` en formato de **Skill (Habilidad)** de agente de Inteligencia Artificial para entornos como **Antigravity**, VS Code o perfiles personalizados de agentes de IA (como Custom GPTs o Claude Projects).

---

## 📑 Índice
- [¿Qué es una Habilidad de Agente?](#qué-es-una-habilidad-de-agente)
- [Uso en Antigravity (Google DeepMind)](#uso-en-antigravity-google-deepmind)
- [Portabilidad Rápida: Usar el Skill en otros Proyectos Locales](#portabilidad-rápida-usar-el-skill-en-otros-proyectos-locales)
- [Uso en Claude Projects (Instrucciones del Proyecto)](#uso-en-claude-projects-instrucciones-del-proyecto)
- [Uso en ChatGPT (Custom GPTs / Instrucciones Personalizadas)](#uso-en-chatgpt-custom-gpts--instrucciones-personalizadas)
- [Estructura interna del Skill](#estructura-interna-del-skill)

---

## ❓ ¿Qué es una Habilidad de Agente?

Una **Habilidad (Skill)** es una directiva autónoma y empaquetada que describe de forma exacta a un agente de Inteligencia Artificial qué herramientas de código tiene disponibles y cómo ejecutarlas. 

A diferencia del Servidor MCP (que funciona por comunicación de red/stdio en tiempo real), el **Skill** es un manual de operaciones de código que la IA puede leer, interpretar y ejecutar localmente en su terminal sandbox como parte de su checklist de tareas.

> 📦 **Nota (Agent Plugins 1.0.0):** Desde la v1.4.0, el Skill vive empaquetado de forma portable en [`agent-plugin/skills/dbv-md2word/`](../../agent-plugin/skills/dbv-md2word/) junto al descriptor MCP (`mcp.json`) y el manifiesto (`plugin.json`), siguiendo el estándar universal **Agent Plugins 1.0.0**. Se usa `agent-plugin/` en la raíz — no `.well-known/agent-plugin/` — porque este plugin se instala localmente (clonando/copiando la carpeta), no se sirve desde una web pública. Ver `dbv-specs-ops/docs/AGENT_PLUGINS.md`.

---

## 🪐 Uso en Antigravity (Google DeepMind)

En el entorno **Antigravity**, las habilidades están integradas de forma nativa. 

1. Cuando abres el workspace `dbv-md2word` en Antigravity, el motor del IDE escanea automáticamente la carpeta `agent-plugin/skills/` en la raíz del proyecto.
2. Al leer el manifiesto [SKILL.md](../../agent-plugin/skills/dbv-md2word/SKILL.md), el agente asistente sabrá que tiene disponible la habilidad `dbv-md2word`.
3. Si le pides: *"Genera un informe en Word a partir del diseño técnico"*, el agente buscará la herramienta en su catálogo local, leerá el manifiesto, sabrá qué parámetros pasarle al script de Python y ejecutará el comando en segundo plano sin cometer fallos de sintaxis.

---

## 🚀 Portabilidad Rápida: Usar el Skill en otros Proyectos Locales

Para utilizar este conversor de Markdown a Word de forma nativa en cualquier otro proyecto que tengas abierto en tu IDE local:

1. **Copia la carpeta** `agent-plugin/` del directorio de este proyecto (incluye `plugin.json`, `mcp.json` y `skills/dbv-md2word/`, ya autocontenida con su propia copia de `mcp_server.py` y `convert_md_to_docx.py`).
2. **Pégala en la raíz** del nuevo proyecto (de modo que quede la carpeta `agent-plugin/` en la base de tu nuevo espacio de trabajo).
3. **¡Y listo!** Al abrir ese nuevo proyecto en Antigravity o en un entorno compatible con Skills/Agent Plugins, el agente local escaneará la carpeta y sabrá realizar conversiones utilizando la misma especificación del Skill de forma inmediata.

---

## 💬 Uso en Claude Projects (Instrucciones del Proyecto)

Si usas la interfaz web de Claude.ai en su versión Pro, puedes añadir esta habilidad a tu **Proyecto de Claude** para que el modelo aprenda a interactuar con ella:

1. Crea o entra en tu **Proyecto** en Claude.ai.
2. Sube a los archivos del proyecto el script de Python `convert_md_to_docx.py` y tu archivo de configuración `config.json`.
3. En las **Instrucciones del Proyecto (Project Instructions)** en el panel derecho, copia y pega el manifiesto del Skill:

```markdown
Eres un agente autónomo de desarrollo y tienes a tu disposición la habilidad de conversión de Markdown a Word (.docx) llamada `dbv-md2word`.

### Especificación del comando:
- Para convertir archivos Markdown creados durante el chat, ejecuta en el terminal:
  `python convert_md_to_docx.py [archivo.md] [archivo_salida.docx]`
- Utiliza siempre los estilos nativos generados por este convertidor para entregar especificaciones o reportes en formato Word al usuario.
```

De esta forma, Claude sabrá de inmediato cómo pedirte comandos precisos o ejecutarlos si está conectado a un agente local.

---

## 🎨 Uso en ChatGPT (Custom GPTs / Instrucciones Personalizadas)

Si estás construyendo un **Custom GPT** o utilizando **ChatGPT Plus** con la función de "Code Interpreter" (Análisis de datos avanzado):

1. En la configuración de tu Custom GPT, sube los archivos `convert_md_to_docx.py` y `config.json` en la sección de **Knowledge** (Conocimiento).
2. En las **Instructions** (Instrucciones), escribe la directiva de uso:

```markdown
Cuando el usuario te pida exportar o descargar su contenido o informes generados en formato Microsoft Word (.docx), debes utilizar el script de Python adjunto en tu conocimiento `convert_md_to_docx.py`.

### Instrucciones de ejecución (Code Interpreter):
1. Escribe el contenido final en un archivo Markdown temporal (por ejemplo, `documento.md`).
2. Ejecuta un script de Python que invoque la conversión:
   ```python
   import subprocess
   subprocess.run(["python", "convert_md_to_docx.py", "documento.md", "documento.docx"])
   ```
3. Ofrécele al usuario el enlace de descarga directa del archivo `documento.docx` resultante.
```

Esto permite que ChatGPT compile documentos de Word hermosos y profesionales con estilos personalizados de forma nativa en su propia nube.

---

## 📂 Estructura interna del Skill

La habilidad está empaquetada dentro del Agent Plugin del proyecto para facilitar su transporte a otros workspaces:

```text
dbv-md2word/
 └── agent-plugin/                   # En la raíz, no en .well-known/ (instalación local, no web)
      ├── plugin.json                # Manifiesto del Agent Plugin 1.0.0
      ├── mcp.json                   # Descriptor del servidor MCP (command: "python", token simple)
      └── skills/
           └── dbv-md2word/
                ├── SKILL.md                   # Manifiesto de la Habilidad y reglas para la IA
                ├── scripts/
                │    ├── convert_md_to_docx.py # Motor de conversión independiente
                │    └── mcp_server.py         # Copia autocontenida del servidor MCP
                └── resources/
                     └── config.json           # Valores por defecto de estilos
```
