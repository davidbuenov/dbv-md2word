/* =============================================================================
   dbv-md2word — Conversor personalizable de Markdown a Word (.docx) con interfaz visual local
   Copyright (c) 2026 David Bueno Vallejo · https://github.com/davidbuenov
   Licensed under the MIT License. See LICENSE for details.
   Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        markdownFiles: [],
        imageFiles: [],
        theme: 'light'
    };

    // DOM Elements
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const selectFilesBtn = document.querySelector('.select-files-btn');
    const filesListContainer = document.getElementById('files-list-container');
    const mdList = document.getElementById('md-list');
    const imgList = document.getElementById('img-list');
    const mdCount = document.getElementById('md-count');
    const imgCount = document.getElementById('img-count');
    const convertBtn = document.getElementById('convert-btn');
    const resultPanel = document.getElementById('result-panel');
    const downloadList = document.getElementById('download-list');
    const downloadZipBtn = document.getElementById('download-zip-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Style settings elements
    const colorPresets = document.querySelectorAll('.color-preset');
    const primaryColorPicker = document.getElementById('primary-color-picker');
    const primaryColorHex = document.getElementById('primary-color-hex');

    // Theme Toggle Handler
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            state.theme = 'dark';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            state.theme = 'light';
        }
    });

    // Preset Color Selector
    colorPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            colorPresets.forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
            const color = preset.getAttribute('data-color');
            primaryColorPicker.value = color;
            primaryColorHex.value = color;
        });
    });

    // Sync custom hex text and native color picker
    primaryColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        primaryColorHex.value = color.toUpperCase();
        // Deactivate presets if it doesn't match
        colorPresets.forEach(preset => {
            if (preset.getAttribute('data-color').toLowerCase() === color.toLowerCase()) {
                preset.classList.add('active');
            } else {
                preset.classList.remove('active');
            }
        });
    });

    primaryColorHex.addEventListener('input', (e) => {
        let value = e.target.value;
        if (!value.startsWith('#') && value.length > 0) {
            value = '#' + value;
            primaryColorHex.value = value;
        }
        if (value.length === 7 && /^#[0-9A-F]{6}$/i.test(value)) {
            primaryColorPicker.value = value;
            // Sync presets active state
            colorPresets.forEach(preset => {
                if (preset.getAttribute('data-color').toLowerCase() === value.toLowerCase()) {
                    preset.classList.add('active');
                } else {
                    preset.classList.remove('active');
                }
            });
        }
    });

    // Drag and Drop Zone Event Listeners
    dropZone.addEventListener('click', () => fileInput.click());
    selectFilesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    ['dragleave', 'dragend'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    });

    // Handle files uploads and split them by type
    function handleFiles(filesList) {
        Array.from(filesList).forEach(file => {
            const ext = file.name.split('.').pop().toLowerCase();
            
            if (ext === 'md') {
                // Check if file is already added
                if (!state.markdownFiles.some(f => f.name === file.name)) {
                    state.markdownFiles.push(file);
                }
            } else if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
                // Check if image is already added
                if (!state.imageFiles.some(f => f.name === file.name)) {
                    state.imageFiles.push(file);
                }
            }
        });

        updateFilesListUI();
    }

    // Format bytes to readable string
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Update the visual files lists and action buttons
    function updateFilesListUI() {
        // Clear lists
        mdList.innerHTML = '';
        imgList.innerHTML = '';

        mdCount.textContent = state.markdownFiles.length;
        imgCount.textContent = state.imageFiles.length;

        // Render Markdown Files
        state.markdownFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.className = 'file-item';
            li.innerHTML = `
                <div class="file-info">
                    <i class="fa-regular fa-file-word"></i>
                    <span class="file-name" title="${file.name}">${file.name}</span>
                    <span class="file-size">(${formatBytes(file.size)})</span>
                </div>
                <button type="button" class="delete-file-btn" data-type="md" data-index="${index}" aria-label="Eliminar archivo">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            mdList.appendChild(li);
        });

        // Render Image Files
        state.imageFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.className = 'file-item';
            li.innerHTML = `
                <div class="file-info">
                    <i class="fa-regular fa-image"></i>
                    <span class="file-name" title="${file.name}">${file.name}</span>
                    <span class="file-size">(${formatBytes(file.size)})</span>
                </div>
                <button type="button" class="delete-file-btn" data-type="img" data-index="${index}" aria-label="Eliminar archivo">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            imgList.appendChild(li);
        });

        // Event delegation for delete buttons
        document.querySelectorAll('.delete-file-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const type = btn.getAttribute('data-type');
                const index = parseInt(btn.getAttribute('data-index'));
                
                if (type === 'md') {
                    state.markdownFiles.splice(index, 1);
                } else if (type === 'img') {
                    state.imageFiles.splice(index, 1);
                }
                updateFilesListUI();
            };
        });

        // Show/hide files section and enable/disable convert button
        if (state.markdownFiles.length > 0 || state.imageFiles.length > 0) {
            filesListContainer.classList.remove('hidden');
        } else {
            filesListContainer.classList.add('hidden');
        }

        // Must have at least 1 Markdown file to convert
        convertBtn.disabled = state.markdownFiles.length === 0;
    }

    // Convert Button Click Handler
    convertBtn.addEventListener('click', async () => {
        if (state.markdownFiles.length === 0) return;

        // Visual loading state
        convertBtn.disabled = true;
        const originalBtnHTML = convertBtn.innerHTML;
        convertBtn.innerHTML = '<i class="fa-solid fa-spinner spinner"></i> Procesando documentos...';
        
        // Prepare multipart form data
        const formData = new FormData();
        state.markdownFiles.forEach(file => {
            formData.append('markdown_files', file);
        });
        state.imageFiles.forEach(file => {
            formData.append('image_files', file);
        });

        // Styles and preferences
        formData.append('heading_font', document.getElementById('heading-font').value);
        formData.append('body_font', document.getElementById('body-font').value);
        formData.append('code_font', document.getElementById('code-font').value);
        formData.append('primary_color', primaryColorHex.value);
        formData.append('toc_enabled', document.getElementById('toc-enabled').checked);
        formData.append('numbering_enabled', document.getElementById('numbering-enabled').checked);
        formData.append('shift_headings', document.getElementById('shift-headings').checked);

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Error desconocido al procesar la conversión.');
            }

            // Retrieve converted files information (from Custom Headers or JSON or Blob name)
            // The API will return a zip or docx directly.
            // To make the UI interactive, we download the converted blob and display download items
            const blob = await response.blob();
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'documentos_convertidos.docx';
            
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch) {
                    filename = filenameMatch[1];
                }
            }

            const downloadUrl = URL.createObjectURL(blob);
            displayResults(filename, downloadUrl);

        } catch (error) {
            alert(`Error de conversión: ${error.message}`);
            convertBtn.disabled = false;
            convertBtn.innerHTML = originalBtnHTML;
        }
    });

    // Displays the conversion output download items
    function displayResults(filename, downloadUrl) {
        // Reset panels visibility
        filesListContainer.classList.add('hidden');
        convertBtn.classList.add('hidden');
        dropZone.classList.add('hidden');
        resultPanel.classList.remove('hidden');

        downloadList.innerHTML = '';
        
        // Add single download item
        const item = document.createElement('div');
        item.className = 'download-item';
        item.innerHTML = `
            <div class="download-item-info">
                <i class="fa-solid fa-file-word"></i>
                <span>${filename}</span>
            </div>
            <a href="${downloadUrl}" download="${filename}" class="btn download-btn-single">
                <i class="fa-solid fa-download"></i> Descargar
            </a>
        `;
        downloadList.appendChild(item);

        // Configure zip download or main download button
        downloadZipBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        if (filename.endsWith('.zip')) {
            downloadZipBtn.innerHTML = '<i class="fa-solid fa-file-zipper"></i> Descargar Todo (.zip)';
        } else {
            downloadZipBtn.innerHTML = '<i class="fa-solid fa-download"></i> Descargar Word (.docx)';
        }
    }

    // Reset interface back to initial state
    resetBtn.addEventListener('click', () => {
        // Reset file lists
        state.markdownFiles = [];
        state.imageFiles = [];

        // UI restore
        dropZone.classList.remove('hidden');
        convertBtn.classList.remove('hidden');
        convertBtn.disabled = true;
        
        // Reset original button text
        convertBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Convertir a Word (.docx)';

        resultPanel.classList.add('hidden');
        updateFilesListUI();
    });

    // Carga de configuración inicial desde el servidor
    async function loadConfig() {
        try {
            const response = await fetch('/api/config');
            if (response.ok) {
                const config = await response.json();
                
                if (config.heading_font) {
                    const headingFontSelect = document.getElementById('heading-font');
                    if (headingFontSelect) headingFontSelect.value = config.heading_font;
                }
                
                if (config.body_font) {
                    const bodyFontSelect = document.getElementById('body-font');
                    if (bodyFontSelect) bodyFontSelect.value = config.body_font;
                }
                
                if (config.code_font) {
                    const codeFontSelect = document.getElementById('code-font');
                    if (codeFontSelect) codeFontSelect.value = config.code_font;
                }
                
                if (config.primary_color) {
                    primaryColorHex.value = config.primary_color.toUpperCase();
                    primaryColorPicker.value = config.primary_color;
                    
                    // Sincronizar presets
                    colorPresets.forEach(preset => {
                        if (preset.getAttribute('data-color').toLowerCase() === config.primary_color.toLowerCase()) {
                            preset.classList.add('active');
                        } else {
                            preset.classList.remove('active');
                        }
                    });
                }
                
                if (config.hasOwnProperty('toc_enabled')) {
                    const tocCheckbox = document.getElementById('toc-enabled');
                    if (tocCheckbox) tocCheckbox.checked = config.toc_enabled;
                }
                
                if (config.hasOwnProperty('numbering_enabled')) {
                    const numberingCheckbox = document.getElementById('numbering-enabled');
                    if (numberingCheckbox) numberingCheckbox.checked = config.numbering_enabled;
                }
                
                if (config.hasOwnProperty('shift_headings')) {
                    const shiftCheckbox = document.getElementById('shift-headings');
                    if (shiftCheckbox) shiftCheckbox.checked = config.shift_headings;
                }
            }
        } catch (error) {
            console.error('Error al cargar la configuración por defecto:', error);
        }
    }

    loadConfig();
});
