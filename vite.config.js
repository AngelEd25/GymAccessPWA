import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que las rutas relativas estén correctamente configuradas
  build: {
    outDir: 'dist', // Directorio donde se construirá la aplicación
    assetsDir: '',  // Esto asegurará que los archivos como el service-worker.js se sirvan correctamente
  },
});
