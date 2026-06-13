# dbv-md2word

`dbv-md2word` es una herramienta ligera y autónoma en Python diseñada para convertir archivos Markdown (`.md`) a documentos de Microsoft Word (`.docx`) manteniendo un estilo visual premium y profesional de forma nativa (sin depender de Pandoc).

Este conversor ha sido desarrollado por **David Bueno Vallejo** en colaboración con su asistente de IA **Antigravity**, inspirado en la necesidad real de exportar guías técnicas estructuradas y documentación de proyectos.

## Características

- 🚀 **Sin Dependencias de Sistema:** No requiere tener instalado Pandoc u otros convertidores de formatos en el sistema operativo; solo necesita Python y el paquete `python-docx`.
- 🎨 **Estilo Visual Premium:**
  - Encabezados principales en color azul corporativo.
  - Bloques de código formateados en Courier New con fondo gris suave y un borde izquierdo de énfasis de color azul.
  - Tablas estilizadas con cabeceras en azul, texto blanco y sombreado de filas alternas.
  - Soporte para hipervínculos en color azul y subrayados de forma nativa en Word.
  - Listas con viñetas estructuradas por niveles de sangría.
  - Soporte de estilos de texto en línea como negrita, cursiva y código inline.

## Instalación

1. Asegúrate de tener instalado Python 3 (versión 3.8 o superior).
2. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/dbv-md2word.git
   cd dbv-md2word
   ```
3. Instala las dependencias necesarias:
   ```bash
   pip install -r requirements.txt
   ```

## Uso

Para convertir cualquier archivo Markdown, ejecuta el script pasando la ruta del archivo `.md` como argumento:

```bash
python convert_md_to_docx.py <ruta_archivo.md> [ruta_salida.docx]
```

### Ejemplos:

- **Conversión simple (genera `documento.docx` en el mismo directorio):**
  ```bash
  python convert_md_to_docx.py documento.md
  ```

- **Especificando el archivo de salida:**
  ```bash
  python convert_md_to_docx.py manual.md D:\Documentos\ManualDeUsuario.docx
  ```

## Contribuir

¡Las contribuciones son bienvenidas! Siéntete libre de abrir un Pull Request o reportar un Issue para añadir nuevas características (como soporte para listas numeradas avanzadas, imágenes, etc.).

## Licencia

Este proyecto está bajo la Licencia MIT.
