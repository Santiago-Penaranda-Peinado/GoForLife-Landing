// vite.config.js

import { resolve } from 'path';
import { defineConfig } from 'vite';

// Archivo de configuración de Vite

export default defineConfig({
  build: {
    rollupOptions: {
      // Definimos las múltiples páginas (entradas HTML) de tu sitio.
      input: {
        // 'main' es la entrada principal (tu index.html)
        main: resolve(__dirname, 'index.html'),

        // 'gracias' es la nueva página de agradecimiento
        gracias: resolve(__dirname, 'gracias.html'),
        
        // Puedes agregar más páginas aquí si es necesario
        // politica: resolve(__dirname, 'politica-privacidad.html'), 
      },
    },
  },
});
