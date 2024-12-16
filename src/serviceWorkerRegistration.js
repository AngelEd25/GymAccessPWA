export function register(config = {}) {
  // Verificaciones previas
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers not supported');
    return;
  }

  // Solo registrar en producción
  if (import.meta.env.PROD === false) {
    return;
  }

  window.addEventListener('load', () => {
    try {
      const PROD_SW_URL = import.meta.env.VITE_SERVICE_WORKER_URL || '/sw.js';

      // Registro del Service Worker
      navigator.serviceWorker
        .register(PROD_SW_URL)
        .then((registration) => {
          console.log('Service Worker registrado exitosamente', registration);

          // Control de actualizaciones
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // Nueva versión disponible
                    const updatePrompt = confirm('Nueva versión disponible. ¿Deseas actualizar?');
                    if (updatePrompt) {
                      installingWorker.postMessage({ type: 'SKIP_WAITING' });
                    }
                    
                    console.log('Nueva versión de la aplicación disponible');
                    config.onUpdate && config.onUpdate(registration);
                  } else {
                    // Contenido inicial en caché
                    console.log('Service Worker activated for the first time');
                    config.onSuccess && config.onSuccess(registration);
                  }
                }
              };
            }
          };

          // Evento de control
          registration.addEventListener('controllerchange', () => {
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error('Error en registro de Service Worker:', error);
        });

    } catch (error) {
      console.error('Error inicializando Service Worker:', error);
    }
  });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error('Error al desregistrar Service Worker:', error);
      });
  }
}

// Función de utilidad para verificar soporte de Service Worker
export function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator;
}

// Función de utilidad para obtener estado de Service Worker
export function getServiceWorkerStatus() {
  if (!isServiceWorkerSupported()) {
    return 'not_supported';
  }

  const sw = navigator.serviceWorker.controller;
  return sw ? 'active' : 'inactive';
}