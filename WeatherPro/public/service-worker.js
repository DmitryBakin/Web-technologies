const CACHE_NAME = "weatherpro-cache";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        "/",
        "/about",
        "/style.css",
        "/script.js",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    caches.match(event.request).then(function (savedFile) {
      return savedFile || fetch(event.request);
    })
  );
});