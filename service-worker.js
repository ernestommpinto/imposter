const CACHE_NAME = "impostor-local-pt-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "img/logo.png",
  "img/fundo.png",
  
  "img/apresentacao.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key === CACHE_NAME ? null : caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
