const cacheName = 'v1';

const cacheAssets = [
    '/index.html',
    '../models/transaction.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.js',
    '/style.css',
    'service_worker.js'
]


//Call Install Event
self.addEventListener('install', (e) => {
    console.log("Service Worker: Installed");

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

//Call Active Event
self.addEventListener('activate', (e) => {
    console.log("Service Worker: Activated");
});

