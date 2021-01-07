const CACHE_NAME = 'transactions';
const DATA_CACHE = 'data-cache';

const CACHE_ASSETS = [
    '/index.html',
    '/db.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.js',
    '/styles.css',
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
];


//Call Install Event
self.addEventListener('install', (e) => {
    console.log("Service Worker: Installed");

    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching Files')
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

//Call Active Event
self.addEventListener('activate', (e) => {
    console.log("Service Worker: Activated");
    //Remove unwanted caches
    e.waitUntil(
        caches.keys(DATA_CACHE).then(cacheList => {
            return Promise.all(
                cacheList.map(cacheKey => {
                    if (cacheKey !== CACHE_NAME && cacheKey !== DATA_CACHE) {
                        caches.delete(cacheKey);
                    }
                })
            )
        }
        )
    )
    self.clients.claim();
});

self.addEventListener("fetch", (e) => {
    if (e.request.url.inculdes("/api/")) {
        e.respondWith(
           caches.open(DATA_CACHE)
           .then(cache => {
               return fetch(e.request)
                    .then(response => {
                        //if it is goo it gets cloned and stores it in the cache
                        if (response.status === 200) {
                            cache.put(e.request.url, response.clone());
                        }

                        return response;
                    })
                    .catch(err => {
                        return cache.match(e.request);
                    });
            }).catch(err => console.log(err))
        )
        return;
    }

    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});