/* eslint-disable no-restricted-globals */

// Importar scripts de Workbox desde la CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-core.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-precaching.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-routing.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-strategies.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-expiration.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-cacheable-response.min.js');

// Configuración Inicial de Versiones de Caché
const CACHE_VERSIONS = {
  static: 'static-v1',
  dynamic: 'dynamic-v1',
  images: 'images-v1',
};

// Precarga de recursos definidos en el manifiesto de Workbox
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Claim y Skip Waiting para control inmediato
workbox.core.clientsClaim();
workbox.core.skipWaiting();

// Estrategias de Caché

// Estrategia para páginas (Network First)
const pageStrategy = new workbox.strategies.NetworkFirst({
  cacheName: CACHE_VERSIONS.static,
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new workbox.expiration.ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
    }),
  ],
});

// Estrategia para imágenes (Cache First)
const imageStrategy = new workbox.strategies.CacheFirst({
  cacheName: CACHE_VERSIONS.images,
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new workbox.expiration.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
    }),
  ],
});

// Estrategia para APIs (Stale While Revalidate)
const apiStrategy = new workbox.strategies.StaleWhileRevalidate({
  cacheName: CACHE_VERSIONS.dynamic,
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new workbox.expiration.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 24 * 60 * 60, // 1 día
    }),
  ],
});

// Registro de Rutas
// Documentos HTML
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'document',
  pageStrategy
);

// Imágenes
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  imageStrategy
);

// Solicitudes de API
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  apiStrategy
);

// Estrategia por defecto (Network First)
workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst());

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
