/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setDefaultHandler } from 'workbox-routing';
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim, skipWaiting } from 'workbox-core';

// Configuración Inicial de Versiones de Caché
const CACHE_VERSIONS = {
  static: 'static-v1',
  dynamic: 'dynamic-v1',
  images: 'images-v1'
};

// Precarga de recursos definidos en el manifiesto de Workbox
precacheAndRoute(self.__WB_MANIFEST);

// Claim y Skip Waiting para control inmediato
clientsClaim();
skipWaiting();

// Estrategias de Caché

// Estrategia para páginas (Network First)
const pageStrategy = new NetworkFirst({
  cacheName: CACHE_VERSIONS.static,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200]
    }),
    new ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
    })
  ]
});

// Estrategia para imágenes (Cache First)
const imageStrategy = new CacheFirst({
  cacheName: CACHE_VERSIONS.images,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200]
    }),
    new ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
    })
  ]
});

// Estrategia para APIs (Stale While Revalidate)
const apiStrategy = new StaleWhileRevalidate({
  cacheName: CACHE_VERSIONS.dynamic,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200]
    }),
    new ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 24 * 60 * 60 // 1 día
    })
  ]
});

// Registro de Rutas
// Documentos HTML
registerRoute(
  ({ request }) => request.destination === 'document',
  pageStrategy
);

// Imágenes
registerRoute(
  ({ request }) => request.destination === 'image',
  imageStrategy
);

// Solicitudes de API
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  apiStrategy
);

// Estrategia por defecto (Network First)
setDefaultHandler(new NetworkFirst());

// Eventos del Ciclo de Vida

// Evento de Instalación
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalado');
  event.waitUntil(self.skipWaiting());
});

// Evento de Activación (Limpieza de cachés antiguos)
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!Object.values(CACHE_VERSIONS).includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Manejo de modo Offline
self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    const request = event.request;
    if (request.destination === 'document') {
      event.respondWith(
        caches.match('/offline.html') || 
        caches.match('/index.html')
      );
    }
  }
});

// Registro de Errores
self.addEventListener('error', (event) => {
  console.error('Service Worker Error:', event);
});