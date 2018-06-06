var cacheName = 'tidesCache';
var filesToCache = [
    'index.html',
    'scripts/index.js',
    'styles/index.css',
    'assets/images/Sea.png'
];

this.addEventListener ('install', (event) => {
    console.log ('Installing Service worker');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(filesToCache);
        }).then (function () { console.log('[Service Worker] Cached app shell');})
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
});