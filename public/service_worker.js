// // Make sure sw are supported
// if("serviceWorker" in navigator) {
//     window.addEventListener("load", () => {
//         navigator.serviceWorker
//         .register("../sw_cached_pages.js")
//         .then(reg => console.log('Servcie Worker Registered'))
//         .catch(err => console.log(`Service Worker : Error: ${err}`));
//     })
// }
const cacheName = 'v1';

const cacheAssets = [
    '/index.html',
    '../models/transaction.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.js',
    '/style.css',
    'service_worker.js',
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
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

