const CACHE_NAME = 'mcq-site-cache-v1';
const urlsToCache = [
    '/',
    '/testPWA/index.html',
    '/testPWA/styles.css',
    '/testPWA/utils.css',
    '/testPWA/script.js',
    '/testPWA/android-chrome-192x192.png',
    '/testPWA/android-chrome-512x512.png',
    '/testPWA/favicon.ico',
    '/testPWA/img/sad-emoji.png',
    '/testPWA/img/smile-emoji.webp'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
