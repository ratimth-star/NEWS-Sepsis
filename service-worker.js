const CACHE_NAME = 'news-pwa-v105-treatment-time-reference';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=20260616-treatment-time-reference',
  './app.js?v=20260616-treatment-time-reference',
  './manifest.json',
  './icons/GJMC_logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icon sepsis/man.svg',
  './icon sepsis/woman.svg',
  './icon sepsis/doctor-notify.svg',
  './icon sepsis/monitoring.svg',
  './image/1 ความหมายของ sepsis และ seotic shock.png',
  './image/2 สาเหตุและปัจจัยเสี่ยงของการติดเชื้อในกระแสเลือด.png',
  './image/3 กลไกการติดเชื้อในกระแสเลือด.png',
  './image/4 แนวทางเวชปฏิบัติสำหรับการวินิจฉัยในประเทศไทย พ.ศ.2569.png',
  './image/5 Surviving Sepsis Campaign 2026.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const acceptsHtml = request.headers.get('accept')?.includes('text/html');
  const isAppShellAsset = request.url.includes('/styles.css') || request.url.includes('/app.js');

  if (request.mode === 'navigate' || acceptsHtml || isAppShellAsset) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request)
        .then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});


