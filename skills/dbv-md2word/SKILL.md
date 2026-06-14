---
name: dbv-md2word
description: Converts Markdown files (.md) into professionally styled Word documents (.docx) using native styles (Spanish), automatic table of contents, SEQ image/table numbering, and dynamic REF cross-references.
category: Document Automation
inputs:
  source:
    type: string
    description: Path to the source Markdown (.md) file.
    required: true
  output:
    type: string
    description: Path to the target Word (.docx) file.
    required: false
  config:
    type: string
    description: Path to an optional custom configuration JSON file to override styles.
    required: false
---

# Skill: dbv-md2word Converter

Este Skill permite a los agentes autónomos de IA de Antigravity/VS Code convertir de forma directa archivos Markdown (`.md`) a documentos profesionales de Microsoft Word (`.docx`) aplicando estilos corporativos y formateo OpenXML estructurado.

## 🛠️ Instrucciones para el Agente

Cuando el usuario solicite convertir un documento Markdown a Word, o requiera exportar un reporte técnico generado en caliente:

1. **Localizar los archivos**: Identifica la ruta del archivo Markdown de origen.
2. **Ejecutar la conversión**:
   Llama al script ejecutable utilizando Python:
   ```bash
   python {skill_path}/scripts/convert_md_to_docx.py [source] [output] [config]
   ```
   *Nota: Si no se especifica la ruta de salida, el script guardará el documento en la misma ruta del origen cambiando la extensión a `.docx`.*
3. **Validación**: Verifica que el archivo `.docx` se haya creado exitosamente en la ubicación de destino.

## 📂 Archivos Requeridos por el Skill
- **`SKILL.md`**: Este archivo de directivas y metadatos.
- **`scripts/convert_md_to_docx.py`**: El motor de conversión en Python (copia exacta de `convert_md_to_docx.py`).
- **`resources/config.json`**: El archivo de configuración con fuentes y colores corporativos por defecto.
