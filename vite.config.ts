import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    postcss: {}, // <-- Esta línea apaga la búsqueda externa de PostCSS
  },
});