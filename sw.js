const cacheName = 'demo-v1';
const appShellFiles = [
  '/',
  'sw.js',
  '/index.html',
  '/manifest.json',
  '/main.js',
  '/favicon.ico',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png',
  '/icons/favicon-96x96.png',
  '/icons/favicon-256x256.png'
];
//mise en cache
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache(appShellFiles)
  );
});

//mise en cache et priorité au cache
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});