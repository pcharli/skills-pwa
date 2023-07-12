const cacheName = 'demo-v1';
const appShellFiles = [
  '/',
  '/sw.js',
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
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installation');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Mise en cache globale: app shell et contenu');
        return cache.addAll(appShellFiles);
      })
    );
  });
//on prend dans le cache si ressource disponible
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Récupération de la ressource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Mise en cache de la nouvelle ressource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });