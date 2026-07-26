<!--
  dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
  Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
  Licensed under the MIT License. See LICENSE for details.
  Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
-->

# 🐙 Integración con GitHub Actions — dbv-md2word

Esta guía describe detalladamente cómo integrar `dbv-md2word` en tus flujos de Integración Continua (CI/CD) de GitHub Actions para compilar automáticamente tus archivos Markdown a Word (.docx).

---

## 📑 Índice
- [Entradas de la Acción (Inputs)](#entradas-de-la-acción-inputs)
- [Ejemplo 1: Conversión básica (Un único archivo)](#ejemplo-1-conversión-básica-un-único-archivo)
- [Ejemplo 2: Conversión de múltiples archivos individuales](#ejemplo-2-conversión-de-múltiples-archivos-individuales)
- [Ejemplo 3: Conversión masiva automática (Bucle Bash)](#ejemplo-3-conversión-masiva-automática-bucle-bash)
- [Descarga de los archivos Word generados](#descarga-de-los-archivos-word-generados)

---

## 📥 Entradas de la Acción (Inputs)

La GitHub Action acepta los siguientes parámetros en el bloque `with:`:

| Parámetro | Descripción | Requerido | Por defecto |
| --- | --- | --- | --- |
| `source` | Ruta al archivo Markdown (`.md`) que deseas convertir. | **Sí** | - |
| `output` | Ruta donde deseas guardar el archivo Word resultante (`.docx`). | No | El mismo nombre del archivo `.md` pero con extensión `.docx`. |
| `config` | Ruta a un archivo JSON de estilos personalizados (ej. `config.json`). | No | Utiliza la configuración por defecto de la aplicación. |

---

## 📝 Ejemplo 1: Conversión básica (Un único archivo)

Crea un archivo en tu repositorio bajo la ruta `.github/workflows/convert-docs.yml` con el siguiente contenido para compilar tu README a Word cada vez que hagas un push:

```yaml
name: Compilar Documentación a Word

on:
  push:
    branches:
      - master  # Cambia a main si tu rama principal se llama así
    paths:
      - 'README.md'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar Código
        uses: actions/checkout@v4

      - name: Convertir README.md a Word
        uses: davidbuenov/dbv-md2word@v1.1.1
        with:
          source: 'README.md'
          output: 'dist/README.docx'

      - name: Subir Documento Word
        uses: actions/upload-artifact@v4
        with:
          name: word-documento-readme
          path: dist/README.docx
```

---

## 📂 Ejemplo 2: Conversión de múltiples archivos individuales

Si deseas compilar varios archivos específicos en el mismo flujo de trabajo, puedes duplicar los pasos de la acción y guardar todos en la misma carpeta para descargarlos en un único archivo comprimido:

```yaml
name: Compilar Varios Documentos a Word

on:
  push:
    branches:
      - master
    paths:
      - 'docs/**.md'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar Código
        uses: actions/checkout@v4

      # 1. Convertir el manual técnico
      - name: Convertir Manual Técnico
        uses: davidbuenov/dbv-md2word@v1.1.1
        with:
          source: 'docs/manual_tecnico.md'
          output: 'dist/Manual_Tecnico.docx'

      # 2. Convertir las especificaciones
      - name: Convertir Especificaciones
        uses: davidbuenov/dbv-md2word@v1.1.1
        with:
          source: 'docs/specifications.md'
          output: 'dist/Especificaciones.docx'

      # 3. Subir toda la carpeta dist/ con los Word compilados
      - name: Subir Documentos Word
        uses: actions/upload-artifact@v4
        with:
          name: documentos-word-compilados
          path: dist/
```

---

## 🔄 Ejemplo 3: Conversión masiva automática (Bucle Bash)

Si tu proyecto tiene decenas de archivos Markdown y quieres convertirlos todos de manera dinámica sin tener que configurar un paso por cada archivo, puedes correr un bucle bash directamente llamando al script de conversión de Python:

```yaml
name: Conversión Masiva Automática

on:
  push:
    branches:
      - master
    paths:
      - '**.md'

jobs:
  bulk-convert:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar Código
        uses: actions/checkout@v4

      # 1. Configurar el entorno de Python en la máquina virtual
      - name: Configurar Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      # 2. Instalar dependencias del convertidor
      - name: Instalar dependencias
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      # 3. Buscar todos los archivos .md y convertirlos a .docx en dist/
      - name: Convertir todos los .md a Word
        run: |
          mkdir -p dist
          find . -name "*.md" ! -path "*/venv/*" ! -path "*/node_modules/*" | while read -r file; do
            filename=$(basename "$file" .md)
            echo "Convirtiendo $file en dist/${filename}.docx..."
            python convert_md_to_docx.py "$file" "dist/${filename}.docx"
          done

      # 4. Guardar todos los archivos Word compilados
      - name: Subir todos los archivos convertidos
        uses: actions/upload-artifact@v4
        with:
          name: todos-los-documentos-word
          path: dist/
```

---

## 📥 Descarga de los archivos Word generados

Una vez que el flujo de trabajo termina su ejecución con éxito (color verde ✅):
1. Entra a la pestaña **Actions** en tu repositorio de GitHub.
2. Selecciona la última ejecución de tu flujo de trabajo.
3. Desplázate hasta la parte inferior de la página.
4. En la sección **Artifacts** (Artefactos), haz clic en el nombre de tu archivo (ej. `mis-documentos-word`) y se descargará un archivo comprimido `.zip` con todos tus documentos Word generados de forma nativa.
