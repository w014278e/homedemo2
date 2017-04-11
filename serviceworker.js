var BASE_PATH = '/homedemo2/';
var CACHE_NAME = 'gih-cache-v12';
var TEMP_IMAGE_CACHE_NAME = 'temp-cache-v1';






var CACHED_URLS = [
    // HTML
    BASE_PATH + 'https://w014278e.github.io/homedemo2/offline.html',
    BASE_PATH + 'feedback.html',
    BASE_PATH + 'search.html',
    
	
    
    // Images for favicons
    BASE_PATH + 'images/icons/android-icon-36x36.png',
    BASE_PATH + 'images/icons/android-icon-48x48.png',
    BASE_PATH + 'images/icons/android-icon-72x72.png',
    BASE_PATH + 'images/icons/android-icon-96x96.png',
    BASE_PATH + 'images/icons/android-icon-144x144.png',
    BASE_PATH + 'images/icons/android-icon-192x192.png',
    BASE_PATH + 'images/icons/favicon-32x32.png',

    //Images for page
   BASE_PATH + 'images/offlinemap.jpg',
    BASE_PATH + 'images/icons/favicon.ico',
    BASE_PATH + 'images/icons/favicon-16x16.png',
    BASE_PATH + 'images/icons/favicon-32x32.png',
    BASE_PATH + 'images/icons/favicon-96x96.png',
    BASE_PATH + 'images/icons/ms-icon-70x70.png',
    BASE_PATH + 'images/icons/ms-icon-144x144.png',
    BASE_PATH + 'images/icons/ms-icon-150x150.png',
    BASE_PATH + 'images/icons/ms-icon-310x310.png',
    BASE_PATH + 'images/icons/favicon.ico',
    BASE_PATH + 'images/bbc1logo.jpg',
    BASE_PATH + 'images/bbc1logo.gif',
    BASE_PATH + 'images/channel4logo.gif',
    BASE_PATH + 'images/itv2logo.gif',
    BASE_PATH + 'images/itvlogo.gif',
    BASE_PATH + 'images/logo.png',
    BASE_PATH + 'images/push-off.png',
    BASE_PATH + 'images/push-on.png',
    BASE_PATH + 'images/sky1logo.gif',
     
    // JavaScript
    
    BASE_PATH + 'material.js',
    BASE_PATH + 'offline-map.js',
    // Manifest
    BASE_PATH + 'manifest.json',
  // CSS and fonts
    'https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    BASE_PATH + 'styles.css',
BASE_PATH + 'scripts.js',
BASE_PATH + 'events.json',


];

var googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAXz09zuqWvBhMN5RPC6JYeUWk7FMiDHP4&callback=initMap';

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation will fail if something fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('offline.html');
        }
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

