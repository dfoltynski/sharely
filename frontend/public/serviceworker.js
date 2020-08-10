const CACHE_NAME = "sharely_version_1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log(cache);

            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(() => {
            return fetch(e.request).catch((err) => {
                caches.match("offline.html");
            });
        })
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames.map((cacheName) =>
                        cacheWhitelist.includes(cacheName)
                            ? null
                            : caches.delete(cacheName)
                    )
                )
            )
    );
});
