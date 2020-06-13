importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '3' },
        { url: '/nav.html', revision: '3' },
        { url: '/index.html', revision: '3' },
        { url: '/pages/home.html', revision: '3' },
        { url: '/pages/allteam.html', revision: '3' },
        { url: '/pages/favorite.html', revision: '3' },
        { url: '/css/materialize.min.css', revision: '3' },
        { url: '/css/style.css', revision: '3' },
        { url: '/js/materialize.min.js', revision: '3' },
        { url: '/manifest.json', revision: '3' },
        { url: '/js/nav.js', revision: '3' },
        { url: '/js/api.js', revision: '3' },
        { url: '/js/db.js', revision: '3' },
        { url: '/js/idb.js', revision: '3' },
        { url: '/js/script.js', revision: '3' },
        { url: '/push.js', revision: '3' },
        { url: '/icon.png', revision: '3' },
        { url: '/icon-192.png', revision: '3' },
        { url: '/img/ban4.jpg', revision: '3' },
        { url: '/img/football.svg', revision: '3' },
        { url: '/img/logo.png', revision: '3' },
        ]);

workbox.routing.registerRoute(
    /.*(?:jpg|jpeg|png|gif|svg|ico)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'cache-images',
        plugins: [
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
        ]
    })
  );


workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate()
)


workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}



self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
} else {
    body = 'Push message no payload';
}
var options = {
    body: body,
    icon: 'icon.png',
    badge: './img/football.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
  }
};
event.waitUntil(
    self.registration.showNotification('Push Notification', options)
    );
});
