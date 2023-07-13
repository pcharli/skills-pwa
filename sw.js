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
  '/icons/favicon-256x256.png',
  'https://api.punkapi.com/v2/beers/random'
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
  const responseFromCache = await caches.match(request)
    return responseFromCache
}

const networkFirst = async (request) => {
  const response = await fetch(request).catch(function() {
    return caches.match(request)
})
    return response
}

self.addEventListener("fetch", (event) => {
  if(!event.request.url.includes("/v2/")) {
    event.respondWith(cacheFirst(event.request))
  }
  else {
    event.respondWith(networkFirst(event.request))
  }
});

function update(request) {
  console.log('update')
  return fetch(request.url).then(
    response =>
      caches(request, response) // on peut mettre en cache la réponse
        .then(() => response) // résout la promesse avec l'objet Response
  );
}


// add push
self.addEventListener("push", (event) => {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }
console.log('test')
  const data = event.data?.json() ?? {};
  const title = data.title || "Something Has Happened";
  const url = data.url || "http://formation-cepegra.be"
  const message =
    data.message || "Here's something you might want to check out.";
  const icon = "icons/favicon-16x16.png";

  //erreur dans Zeal qui utilise self.Notification
  const notification = registration.showNotification(title, {
    body: message,
    tag: "simple-push-demo-notification",
    icon,
  });

  //idem zeal affiche l'event quand notification générée par le script du navigateur
  self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Ferme la notification
  
    event.waitUntil(
      clients.openWindow(url) // Redirige vers l'URL spécifiée
    );
  });
  
});