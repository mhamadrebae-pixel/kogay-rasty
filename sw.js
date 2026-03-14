// ==========================================
// Service Worker - کۆگای ڕاستی
// هەر جارێک نسخەکە گۆڕی، CACHE_VERSION گۆڕ
// ==========================================

const CACHE_VERSION = 'v1'; // ← ئەمە گۆڕ هەر جارێک فایلت گۆڕی (v2, v3, ...)
const CACHE_NAME = 'kogay-rasti-' + CACHE_VERSION;

const STATIC_FILES = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './products.json',
    './sw.js',
];

// دامەزراندن - فایلەکان cache بکە
self.addEventListener('install', (event) => {
    console.log('[SW] Install:', CACHE_NAME);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_FILES);
        })
    );
    self.skipWaiting();
});

// چالاکبوون - cache کۆنەکان بسڕەوە
self.addEventListener('activate', (event) => {
    console.log('[SW] Activate:', CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name.startsWith('kogay-rasti-') && name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    self.clients.claim();
});

// داواکاری - Network First بۆ HTML/JS/CSS، Cache First بۆ وێنە
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // products.json هەمیشە لە نێتوەرک بگیرە (بۆ نوێکردنەوەی کاڵاکان)
    if (url.pathname.endsWith('products.json')) {
        event.respondWith(

            fetch(event.request, { cache: 'no-store' }) // ← ئەمە زیاد بکە
                .then((response) => { return response; })
                .catch(() => caches.match('./products.json'))
        );
        return;
    }

    // HTML, CSS, JS → Network First (نوێترین نسخە هەمیشە)
    if (
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js') ||
        url.pathname === '/'
    ) {
        event.respondWith(
            fetch(event.request).then((response) => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            }).catch(() => caches.match(event.request))
        );
        return;
    }

    // وێنەکان → Cache First
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            });
        })
    );
});
