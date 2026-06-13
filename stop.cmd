@echo off
:: =============================================================================
:: dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
:: Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
:: Licensed under the MIT License. See LICENSE for details.
:: Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
:: =============================================================================

echo Deteniendo el servidor de la aplicacion dbv-md2word...
powershell -Command "Get-Process -Name python -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like '*server.py*' } | Stop-Process -Force"
echo Servidor detenido.
pause
