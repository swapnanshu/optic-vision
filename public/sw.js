const CACHE_NAME = 'optic-vision-cache-v1';
const OFFLINE_URL = '/offline';

const ASSETS_TO_CACHE = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/logo-192.png',
  '/icons/logo-512.png',
  '/icons/apple-touch-icon.png'
];

// Install Event - Pre-cache shell assets and offline fallback page
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up stale cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Handle caching strategy based on asset types
self.addEventListener('fetch', (event) => {
  // Only handle GET requests, let other methods bypass directly
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Exclude Firebase Auth and dynamic Firestore transactions from caching
  if (url.hostname.includes('firebase') || url.pathname.includes('/auth') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Cloudinary images, Next static images and assets (fonts, icons) - Cache First
  const isCloudinary = url.hostname.includes('res.cloudinary.com');
  const isStatic = url.origin === self.location.origin && 
    (url.pathname.startsWith('/icons/') || 
     url.pathname.endsWith('.svg') || 
     url.pathname.endsWith('.woff2') || 
     url.pathname.endsWith('.png') ||
     url.pathname.endsWith('.jpg') ||
     url.pathname.endsWith('.jpeg'));

  if (isCloudinary || isStatic) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => null);
        });
      })
    );
    return;
  }

  // Default: Stale While Revalidate for JS/CSS & Catalog HTML Pages
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // If network fails, return cached page or offline shell fallback
          return cachedResponse || caches.match(OFFLINE_URL);
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
