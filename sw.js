const CACHE_NAME = 'teas-cs-v9';
const urlsToCache = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
// Skip API, payment, and cross-origin requests - let browser handle them directly
// (Intercepting these caused "Load failed" on mobile when scanning QR code)
self.addEventListener('fetch', function(event) {
  const url = event.request.url;
  const isApiOrPayment = url.includes('/api/') || url.includes('create-payment-intent') || url.includes('stripe.com') || url.includes('railway.app');
  const isCrossOrigin = !url.startsWith(self.location.origin);
  const isNonGet = event.request.method !== 'GET';

  if (isApiOrPayment || isCrossOrigin || isNonGet) {
    return; // Don't intercept - prevents "FetchEvent.respondWith received an error"
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function() {
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
