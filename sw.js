// name of static cache
const staticCacheName = 'mws-restaurant-v1'

/**
 * Install service worker and cache all pages and assets required for offline access
 */
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(staticCacheName)
    .then((cache) => {
      return cache.addAll(['./',
        './js/main.js', './js/dbhelper.js', './js/ServiceWorkerController.js', './js/restaurant_info.js',
        './img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg', './img/6.jpg', './img/7.jpg', './img/8.jpg', './img/9.jpg', './img/10.jpg',
        './js/restaurants.json',
        './css/styles.css', './css/bootstrap.min.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
      ])
    }))
})

/**
 * Activate service worker and delete old cache (if any) before add new cache
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName.startsWith('mws-') && cacheName !== staticCacheName
          })
            .map((cacheName) => {
              return caches.delete(cacheName)
            })
        )
      }))
})

/**
 * Intercept all requests and return response from cache if matched againse cache
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then((response) => {
      /**
       * If we have matching response, we return the cache value, otherwise we return
       * the result of call to fetch(), which will make a network request and return the response
       * if anything is retrieved from network
       */
      return response ||
        caches.open(staticCacheName)
          .then((cache) => {
            return fetch(event.request)
              .then((response) => {
                if (response.status === 404) {
                  return new Response('page not found')
                }
                /**
                 * If we want to cache new requests cumulatively , we do so by handling response
                 * of fetch request and then adding it to the cache.
                 */
                if (event.request.url.indexOf('restaurant.html') !== -1 || event.request.url.indexOf('leaflet') !== -1) {
                  cache.put(event.request, response.clone())
                }
                return response
              })
          })
    })
    .catch(() => {
      // if both (cache and n/w) fails, show a generic message
      return new Response('You seems completely offline, and we did not find any cache for URL')
    }))
})
/**
 * listen for the 'message' event, and call
 * 'skipWaiting' if user want to update the page and get the appropriate message
 */
self.addEventListener('message', (event) => {
  if (event.data === 'SWupdate') {
    self.skipWaiting()
  }
})
