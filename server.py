# =============================================================================
# dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
# Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
# Licensed under the MIT License. See LICENSE for details.
# Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
# =============================================================================

import os
import sys
import shutil
import tempfile
import socket
import webbrowser
import zipfile
from threading import Timer
from typing import List
from werkzeug.utils import secure_filename

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from starlette.background import BackgroundTasks
import uvicorn

# Importamos nuestro módulo conversor refactorizado
from convert_md_to_docx import parse_markdown, create_docx

app = FastAPI(title="dbv-md2word Local Server")

# Servir archivos estáticos (style.css, app.js)
app.mount("/static", StaticFiles(directory="static"), name="static")

def find_free_port():
    """Busca un puerto libre en localhost para levantar el servidor web."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind(('127.0.0.1', 0))
        port = s.getsockname()[1]
        s.close()
        return port
    except Exception:
        return 8000

@app.get("/", response_class=HTMLResponse)
async def index():
    """Sirve la interfaz gráfica principal."""
    try:
        with open("templates/index.html", "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"No se pudo cargar index.html: {str(e)}")

@app.post("/api/convert")
async def convert_api(
    background_tasks: BackgroundTasks,
    markdown_files: List[UploadFile] = File(...),
    image_files: List[UploadFile] = File(default=[]),
    heading_font: str = Form("Aptos Display"),
    body_font: str = Form("Calibri"),
    code_font: str = Form("Consolas"),
    primary_color: str = Form("#1F4E79"),
    toc_enabled: bool = Form(True),
    numbering_enabled: bool = Form(True),
    shift_headings: bool = Form(False)
):
    """Procesa y convierte archivos Markdown a Word."""
    # Filtrar archivos vacíos (a veces el navegador envía un archivo vacío si no se selecciona nada)
    valid_markdowns = [f for f in markdown_files if f.filename]
    valid_images = [img for img in image_files if img.filename]

    if not valid_markdowns:
        raise HTTPException(status_code=400, detail="No se cargaron archivos Markdown (.md)")

    config = {
        'heading_font': heading_font,
        'body_font': body_font,
        'code_font': code_font,
        'primary_color': primary_color,
        'toc_enabled': toc_enabled,
        'numbering_enabled': numbering_enabled,
        'shift_headings': shift_headings
    }

    # Directorio temporal de trabajo aislado
    temp_dir = tempfile.mkdtemp()

    try:
        # Guardar todas las imágenes de soporte
        for img in valid_images:
            img_name = secure_filename(os.path.basename(img.filename))
            content = await img.read()
            with open(os.path.join(temp_dir, img_name), "wb") as f:
                f.write(content)

        generated_files = []

        # Procesar cada archivo Markdown
        for md_file in valid_markdowns:
            md_name = secure_filename(os.path.basename(md_file.filename))
            md_path = os.path.join(temp_dir, md_name)
            
            content = await md_file.read()
            with open(md_path, "wb") as f:
                f.write(content)

            # Nombre de salida
            base_name = os.path.splitext(md_name)[0]
            docx_name = f"{base_name}.docx"
            docx_path = os.path.join(temp_dir, docx_name)

            # Analizar bloques
            blocks = parse_markdown(md_path)

            # Adaptación de rutas de imagen (resolución en plano)
            for block in blocks:
                if block['type'] == 'image':
                    src = block['src']
                    base_img_name = secure_filename(os.path.basename(src))
                    flat_img_path = os.path.join(temp_dir, base_img_name)
                    if os.path.exists(flat_img_path):
                        block['src'] = base_img_name

            # Generar documento Word
            create_docx(blocks, docx_path, config, temp_dir)
            generated_files.append((docx_path, docx_name))

        if not generated_files:
            raise HTTPException(status_code=400, detail="No se pudo generar ningún documento Word.")

        # Limpieza diferida
        def cleanup_temp_dir():
            try:
                shutil.rmtree(temp_dir)
            except Exception:
                pass

        # Si es un solo documento, lo enviamos directamente
        if len(generated_files) == 1:
            docx_path, docx_name = generated_files[0]
            background_tasks.add_task(cleanup_temp_dir)
            return FileResponse(
                docx_path,
                media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                filename=docx_name
            )

        # Si son varios archivos, creamos un ZIP temporal
        else:
            zip_path = os.path.join(tempfile.gettempdir(), 'documentos_word_convertidos.zip')
            with zipfile.ZipFile(zip_path, 'w') as zf:
                for file_path, file_name in generated_files:
                    zf.write(file_path, file_name)

            def cleanup_all():
                cleanup_temp_dir()
                try:
                    os.remove(zip_path)
                except Exception:
                    pass

            background_tasks.add_task(cleanup_all)
            return FileResponse(
                zip_path,
                media_type='application/zip',
                filename='documentos_convertidos.zip'
            )

    except Exception as e:
        # En caso de error, limpiar de inmediato
        try:
            shutil.rmtree(temp_dir)
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"Error en la conversión: {str(e)}")

if __name__ == '__main__':
    port = find_free_port()
    url = f"http://127.0.0.1:{port}"
    print(f"Iniciando conversor web local (FastAPI/Uvicorn) en: {url}")
    
    # Abrir navegador tras 1 segundo
    Timer(1, lambda: webbrowser.open(url)).start()
    
    # Arrancar Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="info")
