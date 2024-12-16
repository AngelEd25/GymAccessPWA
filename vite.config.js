import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto', // Esto inyectará el Service Worker automáticamente
      manifest: {
        name: 'Tu App PWA',
        short_name: 'App',
        description: 'Una aplicación web progresiva',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'path/to/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Aquí puedes personalizar más la configuración de Workbox si lo deseas
      },
    }),
  ],
});
