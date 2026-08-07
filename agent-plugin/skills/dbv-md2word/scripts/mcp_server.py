# =============================================================================
# dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
# Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
# Licensed under the MIT License. See LICENSE for details.
# Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
# =============================================================================

import os
import tempfile
from fastmcp import FastMCP
from convert_md_to_docx import load_default_config, parse_markdown, create_docx

# Inicializar servidor MCP
mcp = FastMCP("dbv-md2word")

@mcp.tool()
def convert_markdown_to_docx(
    markdown_content: str,
    output_path: str = None,
    heading_font: str = None,
    body_font: str = None,
    code_font: str = None,
    emoji_font: str = None,
    body_align: str = None,
    primary_color: str = None,
    toc_enabled: bool = None,
    numbering_enabled: bool = None,
    shift_headings: bool = None
) -> str:
    """Converts markdown content to a styled Word document (.docx).

    Args:
        markdown_content: The markdown formatted text to convert.
        output_path: Optional path where the output .docx file will be saved. Defaults to 'document.docx' in the current working directory.
        heading_font: Optional font name for headings (e.g. 'Aptos Display', 'Arial', 'Georgia').
        body_font: Optional font name for body text (e.g. 'Aptos', 'Calibri', 'Arial').
        code_font: Optional font name for code blocks and inline code (e.g. 'Consolas', 'Courier New').
        emoji_font: Optional font name for emojis (e.g. 'Segoe UI Emoji', 'Apple Color Emoji').
        body_align: Optional body text alignment ('justify' or 'left').
        primary_color: Optional primary color hex code (e.g. '#1F4E79').
        toc_enabled: Optional flag to enable or disable the Table of Contents at the beginning.
        numbering_enabled: Optional flag to enable or disable sequential numbering for figures/tables.
        shift_headings: Optional flag to shift heading levels (e.g., H1 becomes the main document title and H2 becomes Heading 1).
    """
    # 1. Cargar configuración por defecto
    config = load_default_config()

    # 2. Sobrescribir con los parámetros recibidos si no son None
    if heading_font is not None:
        config['heading_font'] = heading_font
    if body_font is not None:
        config['body_font'] = body_font
    if code_font is not None:
        config['code_font'] = code_font
    if emoji_font is not None:
        config['emoji_font'] = emoji_font
    if body_align is not None:
        config['body_align'] = body_align
    if primary_color is not None:
        config['primary_color'] = primary_color
    if toc_enabled is not None:
        config['toc_enabled'] = toc_enabled
    if numbering_enabled is not None:
        config['numbering_enabled'] = numbering_enabled
    if shift_headings is not None:
        config['shift_headings'] = shift_headings

    # 3. Establecer ruta de salida por defecto
    if not output_path:
        output_path = os.path.abspath("document.docx")
    else:
        output_path = os.path.abspath(output_path)

    # Asegurar que el directorio de salida existe
    out_dir = os.path.dirname(output_path)
    if out_dir and not os.path.exists(out_dir):
        os.makedirs(out_dir, exist_ok=True)

    # 4. Crear archivo temporal en la carpeta de destino para que las rutas relativas
    # a imágenes locales (si las hay) tengan mayor probabilidad de resolverse.
    temp_md_fd, temp_md_path = tempfile.mkstemp(suffix=".md", dir=out_dir)
    
    try:
        # Escribir el contenido markdown
        with os.fdopen(temp_md_fd, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        # Parsea y convierte a docx
        blocks = parse_markdown(temp_md_path)
        create_docx(blocks, output_path, config=config, base_dir=out_dir)
        
        return f"Success: Word document successfully generated at '{output_path}'."
    
    except Exception as e:
        return f"Error during conversion: {str(e)}"
        
    finally:
        # Eliminar archivo temporal
        try:
            os.remove(temp_md_path)
        except Exception:
            pass

def run_mcp():
    mcp.run()

if __name__ == "__main__":
    run_mcp()
