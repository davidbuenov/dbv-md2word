#!/bin/bash
# =============================================================================
# dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
# Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
# Licensed under the MIT License. See LICENSE for details.
# Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
# =============================================================================

echo "Iniciando aplicación dbv-md2word..."

if [ ! -d "venv" ]; then
    echo "[CONFIGURACIÓN] Es la primera vez que ejecutas la aplicación."
    echo "Creando entorno virtual..."
    python3 -m venv venv
    
    echo "Activando entorno virtual..."
    source venv/bin/activate
    
    echo "Instalando/Actualizando dependencias (este proceso solo ocurre la primera vez)..."
    pip install --upgrade pip
    pip install -r requirements.txt
else
    echo "Activando entorno virtual..."
    source venv/bin/activate
fi

echo "Iniciando servidor local..."
python server.py
