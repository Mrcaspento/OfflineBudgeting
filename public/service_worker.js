// Make sure sw are supported

const CACHE_NAME = 'v1';
const DATA_CACHE = 'data-cache';

const CACHE_ASSETS = [
    '/index.html',
    '/db.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.js',
    '/style.css',
    '/service_worker.js',
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
]


//Call Install Event
self.addEventListener('install', (e) => {
    console.log("Service Worker: Installed");

    e.waitUntil(
      caches
        .open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

//Call Active Event
self.addEventListener('activate', (e) => {
    console.log("Service Worker: Activated");
    //Remove unwanted caches
    e/waitUntil(
        caches.keys().then(CACHE_NAMES => {
            return Promise.all(
                CACHE_NAMES.map(cache => {
                    if(cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                    }
                })
            )
        })
    )
});

