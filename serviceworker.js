var BASE_PATH = '/homedemo2/';
var CACHE_NAME = 'gih-cache-v9';
var TEMP_IMAGE_CACHE_NAME = 'temp-cache-v1';






var CACHED_URLS = [
    // HTML
    BASE_PATH + 'feedback.html',
    BASE_PATH + 'shows.html',
	
    
    // Images for favicons
    BASE_PATH + 'images/icons/android-icon-36x36.png',
    BASE_PATH + 'images/icons/android-icon-48x48.png',
    BASE_PATH + 'images/icons/android-icon-72x72.png',
    BASE_PATH + 'images/icons/android-icon-96x96.png',
    BASE_PATH + 'images/icons/android-icon-144x144.png',
    BASE_PATH + 'images/icons/android-icon-192x192.png',
    BASE_PATH + 'images/icons/favicon-32x32.png',

    //Images for page
   
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
    // Manifest
    BASE_PATH + 'manifest.json',
  // CSS and fonts
    'https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    BASE_PATH + 'styles.css',
BASE_PATH + 'scripts.js',
BASE_PATH + 'events.json',


];

self.addEventListener('install', function(event) {
	var offlineRequest = new Request('offline.html');
  event.waitUntil(
    fetch(offlineRequest).then(function(response) {
      return caches.open('offline').then(function(cache) {
        console.log('[oninstall] Cached offline page', response.url);
        return cache.put(offlineRequest, response);
      });
    })
  );
});

self.addEventListener('fetch', function(event) {
	var request = event.request;
	if (request.method === 'GET') {
		event.respondWith(
      fetch(request).catch(function(error) {
		  console.error(
          '[onfetch] Failed. Serving cached offline fallback ' +
          error
        );
        return caches.open('offline').then(function(cache) {
          return cache.match('offline.html');
        });
      })
    );
  }
  });

