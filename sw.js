const CACHE_NAME = 'restaurants_cache';

//Keeps file so that they are available offline
self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(
        [
          '/js/dbhelper.js',
          '/js/restaurant_info.js',
          '/js/main.js',
          '/css/styles.css',
          '/data/restaurants.json',
          '/index.html',
          '/restaurant.html',
          './img/1.jpg',
          './img/2.jpg',
          './img/3.jpg',
          './img/4.jpg',
          './img/5.jpg',
          './img/6.jpg',
          './img/7.jpg',
          './img/8.jpg',
          './img/9.jpg',
          './img/10.jpg'
        ]
      );
    })
  );
});

//Page is rendered even the page is offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

//Updates service worker
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});


