const staticCacheName = 'mws-restaurant-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(staticCacheName)
    .then((cache) => {
      return cache.addAll(['./',
        './js/main.js', './js/dbhelper.js', './js/ServiceWorkerController.js', './js/restaurant_info.js',
        './img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg', './img/6.jpg', './img/7.jpg', './img/8.jpg', './img/9.jpg', './img/10.jpg',
        './data/restaurants.json',
        './css/styles.css', './css/bootstrap.min.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
      ])
    }))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then((response) => {
      return response ||
        caches.open(staticCacheName)
          .then((cache) => {
            return fetch(event.request)
              .then((response) => {
                if (response.status === 404) {
                  return new Response('page not found')
                }
                if (event.request.url.indexOf('restaurant.html') !== -1 || event.request.url.indexOf('leaflet') !== -1) {
                  cache.put(event.request, response.clone())
                }
                return response
              })
          })
    })
    .catch(() => {
      return new Response('You seems completely offline')
    }))
})
