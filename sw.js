const CACHE_NAME = 'ojas-cache-v5';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './quiz.js',
  './result.js',
  './food-db.js',
  './food-checker.js',
  './icons.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => {
        console.warn('Service Worker: Failed to open cache (ignoring for Live Server/Incognito):', error);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName).catch(err => console.warn('Service Worker: Cache delete error:', err));
          }
        })
      );
    }).then(() => self.clients.claim())
    .catch(error => console.warn('Service Worker: Failed to activate:', error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(error => fetch(event.request))
  );
});
