/* eslint-disable no-restricted-globals */

// Importar scripts de Workbox desde la CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-core.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-precaching.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-routing.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-strategies.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-expiration.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-cacheable-response.min.js');

// Configuración inicial de las versiones de caché
const CACHE_VERSIONS = {
  static: 'static-v1',
  dynamic: 'dynamic-v1',
  images: 'images-v1',
};

// Precarga de recursos definidos en el manifiesto de Workbox
if (workbox) {
  console.log('[SW] Workbox cargado exitosamente.');
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
} else {
  console.error('[SW] Workbox no se pudo cargar.');
}

// Claim y Skip Waiting para control inmediato
workbox.core.clientsClaim();
workbox.core.skipWaiting();

// Estrategias de caché
const pageStrategy = new workbox.strategies.NetworkFirst({
  cacheName: CACHE_VERSIONS.static,
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
    new workbox.expiration.ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
    }),
  ],
});

const imageStrategy = new workbox.strategies.CacheFirst({
  cacheName: CACHE_VERSIONS.images,
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
    new workbox.expiration.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
    }),
  ],
});

const apiStrategy = new workbox.strategies.StaleWhileRevalidate({
  cacheName: CACHE_VERSIONS.dynamic,
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
    new workbox.expiration.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 24 * 60 * 60, // 1 día
    }),
  ],
});

// Registro de rutas
workbox.routing.registerRoute(({ request }) => request.destination === 'document', pageStrategy);
workbox.routing.registerRoute(({ request }) => request.destination === 'image', imageStrategy);
workbox.routing.registerRoute(({ url }) => url.pathname.startsWith('/api/'), apiStrategy);

// Manejo de modo offline
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return await caches.match('/offline.html');
  }
  return Response.error();
});

// Evento de instalación
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(self.skipWaiting());
});

// Evento de activación: limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!Object.values(CACHE_VERSIONS).includes(cacheName)) {
            console.log('[SW] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Registro de errores
self.addEventListener('error', (event) => {
  console.error('[SW] Error detectado:', event);
});
