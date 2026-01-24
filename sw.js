// Service Worker for offline functionality

const CACHE_NAME = 'suresh-aesthetics-v78';
const urlsToCache = [
    './',
    './index.html',
    './css/styles.css',
    './js/storage.js',
    './js/googledrive-sync.js',
    './js/food-database.js',
    './js/exercise-library.js',
    './js/workout-templates.js',
    './js/quotes.js',
    './js/app.js',
    './manifest.json',
    './logo.png',
    './icon-192.png',
    './icon-512.png'
];

// Install event - cache files
self.addEventListener('install', event => {
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache:', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.log('Cache install error:', err);
            })
    );
});

// Fetch event - serve from cache when offline, but update cache from network
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Network request successful, update cache
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    // Take control of all pages immediately
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('New service worker activated:', CACHE_NAME);
            return self.clients.claim();
        })
    );
});
