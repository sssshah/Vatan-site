self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Reservations must always come from the network, so this worker deliberately
// does not cache or intercept requests. Its only purpose is app installation
// support for older Android Chrome versions.
self.addEventListener('fetch', () => {});
