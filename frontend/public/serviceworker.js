const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this; //Self is service worker itself
//Install service worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

//Listen for request
self.addEventListener("fetch", (event) => {
    const request = event.request;

    // Cache-First Strategy for GET requests (Static assets)
    if (request.method === "GET") {
        event.respondWith(
            caches.match(request).then((response) => {
                if (response) {
                    return response;
                }

                return fetch(request).then((response) => {
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }

                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });

                    return response;
                });
            })
        );
    } else {
        // Handle other types of requests (e.g., POST, PUT, DELETE)
        // You can customize this part based on your specific needs
        event.respondWith(
            fetch(event.request).then(function (networkResponse) {
                return networkResponse;
            })
        );
    }
});
//Activate the service worker
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) return caches.delete(cacheName);
                })
            );
        })
    );
});
