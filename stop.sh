#!/bin/bash
# =============================================================================
# dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
# Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
# Licensed under the MIT License. See LICENSE for details.
# Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
# =============================================================================

echo "Deteniendo servidor local dbv-md2word..."
pkill -f "python.*server.py"
echo "Servidor detenido."
