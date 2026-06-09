const CACHE = 'meshcompact-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './swap_rules.txt',
  './i18n/ru.txt',
  './i18n/en.txt',
  './src/icon/icon.svg',
  './src/ios_share.svg',
  './src/icon/icon-192.png',
  './src/icon/icon-512.png',
  './src/icon/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
