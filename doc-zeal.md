# Zeal
## Minimum
- index.html
- manifest in json
- service worker in js
- script js chargé par html

## index
- code html
- link vers manifest in head avec `rel="manifest"`
- link vers script js
- `<meta name="theme-color" content="#B12A34">` dans head
- `<link rel="icon" href="/favicon.ico">` dans head

## manifest
- rien trouvé dans Zeal, hélas
- objet json minimum :

`{
    "name":"demo par Pierre",
    "short_name": "demo",
    "description": "Progressive Web App for demostration.",
    "icons": [
        {
            "src": "icons/icon-32.png",
            "sizes": "32x32",
            "type": "image/png"
        },
        {
            "src": "icons/icon-64.png",
            "sizes": "64x64",
            "type": "image/png"
        },
        {
            "src": "icons/icon-96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "icons/icon-128.png",
            "sizes": "128x128",
            "type": "image/png"
        },
        {
            "src": "icons/icon-168.png",
            "sizes": "168x168",
            "type": "image/png"
        },
        {
            "src": "icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/icon-256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "icons/hd_hi.svg",
            "sizes": "any",
			"purpose": "maskable"
        }
    ],
    "start_url": "index.html",
    "display": "fullscreen",
    "theme_color": "#B12A34",
    "background_color": "#B12A34"
}`
- display peut être sur fullscreen, standalone, browser
- purpose au moins maskable sur une icône pour éviter une notice dans Chrome

## javascript
- Zeal => "serviceWorker" => exemple de déclaration
- Zeal => "serviceWorker" => "using service Workers" => autre exemple de déclaration
- Dès que manifest + déclaration du SW, application installable

## fichier service worker (JS)
- nécessaire pour mise en cache
	- Zeal => "serviceWorker" => "using service Workers" => exempe de mise en cache
- nécessaire pour notifications
	- **2 APIs** : Push & Notifications
### Notifications
- Zeal => Notification -> exemple pour demander l'autorisation. **Ne se fait pas dans sw.js**

### Push
- Zeal => "notificationclick/notificationclose" => exemple de gestion d'une notification dans SW
- Zeal => "ServiceWorkerRegistration.show" pour afficher une notification via sw