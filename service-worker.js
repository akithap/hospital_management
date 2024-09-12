const CACHE_NAME = "my-site-cache-v1"; // Name of the cache
const urlsToCache = [
  "/", // Cache the root page
  "/index.html",
  "/styles.css",
  "/script.js",
  "/images/logo.png"
];

// Install the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache); // Add the files to the cache
      })
  );
});

// Fetch files from the cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // If the request is in the cache, return it
        }
        return fetch(event.request); // Otherwise, fetch from the network
      })
  );
});

// Update the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Delete outdated caches
          }
        })
      );
    })
  );
});