@echo off
:: =============================================================================
:: dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
:: Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
:: Licensed under the MIT License. See LICENSE for details.
:: Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
:: =============================================================================

echo Iniciando aplicacion dbv-md2word...

if not exist venv (
    echo [CONFIGURACION] Es la primera vez que ejecutas la aplicacion.
    echo Creando entorno virtual venv...
    python -m venv venv
    
    echo Activando venv...
    call venv\Scripts\activate.bat
    
    echo Instalando/Actualizando dependencias (este proceso solo ocurre la primera vez)...
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt
) else (
    echo Activando venv...
    call venv\Scripts\activate.bat
)

echo Iniciando servidor local...
python server.py

pause
