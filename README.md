# dbv-md2word

> Conversor personalizable de Markdown a Word (.docx) con interfaz visual local

## 📑 Índice

- [Sobre el proyecto](#about)
- [Requisitos](#requirements)
- [Instalación](#installation)
- [Cómo ejecutar](#usage)
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

- Python 3.12 o superior
- Pip (Administrador de paquetes de Python)

---

<a name="installation"></a>
## ⚙️ Instalación

El proceso de instalación de dependencias está completamente automatizado y se realiza mediante el script de arranque inteligente (`start.cmd` o `start.sh`). La primera vez que lo ejecutes, creará el entorno virtual e instalará todo de forma automática. En las siguientes ejecuciones, se saltará este paso para arrancar la aplicación de forma instantánea.

No obstante, si deseas realizar una instalación manual en tu entorno local:

```bash
# 1. Crear el entorno virtual
python -m venv venv

# 2. Activar el entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS / Linux:
source venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt
```

---

<a name="usage"></a>
## ▶️ Cómo ejecutar

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

### 📝 Uso por Línea de Comandos (CLI)
Si prefieres no usar la interfaz web, puedes realizar conversiones directamente desde la consola:
```bash
# Activa el entorno virtual
venv\Scripts\activate

# Ejecuta el convertidor tradicional (usará fuentes y colores por defecto)
python convert_md_to_docx.py <archivo.md> [archivo_salida.docx]
```

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
├── docs/                        # Documentación del diseño y especificaciones (SDD)
│   ├── ARCHITECTURE.md          # Arquitectura técnica y stack
│   ├── DESIGN.md                # Sistema de diseño y estilos visuales
│   └── SPECIFICATIONS.md        # Especificaciones funcionales
├── static/                      # Recursos estáticos de la interfaz web
│   ├── app.js                   # Lógica frontend (Drag & Drop, API)
│   └── style.css                # Estética visual y Glassmorphism
├── templates/                   # Plantillas del servidor
│   └── index.html               # Interfaz gráfica de la aplicación
├── tests/                       # Suite de pruebas unitarias
│   └── test_converter.py        # Validación de estilos y XML
├── convert_md_to_docx.py        # Módulo de conversión de Markdown a Word
├── server.py                    # Servidor FastAPI local y API de conversión
├── requirements.txt             # Dependencias del proyecto
├── start.cmd / start.sh         # Scripts de arranque automatizado
├── stop.cmd / stop.sh           # Scripts de parada de la aplicación
├── config.json                  # Opciones de estilo globales por defecto
├── project.config.md            # Identidad del proyecto y plantillas de cabecera
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
