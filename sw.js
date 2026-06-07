// ==========================================
// کۆگای ڕاستی - Offline Storefront Cache
// ==========================================

const CACHE_VERSION = 'v25';
const ASSET_VERSION = 'mobile-perf-v24';
const APP_CACHE = `kogay-rasti-app-${CACHE_VERSION}`;
const DATA_CACHE = `kogay-rasti-data-${CACHE_VERSION}`;
const IMAGE_CACHE = `kogay-rasti-images-${CACHE_VERSION}`;
const RUNTIME_CACHE = `kogay-rasti-runtime-${CACHE_VERSION}`;

const OFFLINE_FALLBACK_URL = './index.html';
const PRODUCTS_URL = './products.json';
const CORE_ASSETS = [
    './',
    './index.html',
    `./style.css?v=${ASSET_VERSION}`,
    `./script.js?v=${ASSET_VERSION}`,
    `./analytics.js?v=${ASSET_VERSION}`,
    `./manifest.json?v=${ASSET_VERSION}`,
    `./icon-192.png?v=${ASSET_VERSION}`,
    `./icon-512.png?v=${ASSET_VERSION}`
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(APP_CACHE).then(cache => cache.addAll(CORE_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(
            names
                .filter(name => name.startsWith('kogay-rasti-') && ![
                    APP_CACHE,
                    DATA_CACHE,
                    IMAGE_CACHE,
                    RUNTIME_CACHE
                ].includes(name))
                .map(name => caches.delete(name))
        );
        await self.clients.claim();
    })());
});

function isCacheable(response) {
    return Boolean(response && (response.ok || response.type === 'opaque'));
}

async function getCached(request, fallbackUrl) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (!fallbackUrl) return null;
    return caches.match(fallbackUrl, { ignoreSearch: true });
}

async function putInCache(cacheName, request, response) {
    if (!isCacheable(response)) return response;
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
    return response;
}

async function networkFirst(request, cacheName, fallbackUrl, fetchOptions) {
    try {
        const response = await fetch(request, fetchOptions);
        if (!isCacheable(response)) throw new Error(`Uncacheable response: ${response.status}`);
        return putInCache(cacheName, request, response);
    } catch (error) {
        const cached = await getCached(request, fallbackUrl);
        return cached || Response.error();
    }
}

async function cacheFirst(request, cacheName, fallbackUrl) {
    const cached = await getCached(request, fallbackUrl);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        if (!isCacheable(response)) throw new Error(`Uncacheable response: ${response.status}`);
        return putInCache(cacheName, request, response);
    } catch (error) {
        return Response.error();
    }
}

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET' || !request.url.startsWith('http')) return;

    const url = new URL(request.url);
    const sameOrigin = url.origin === self.location.origin;

    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request, APP_CACHE, OFFLINE_FALLBACK_URL));
        return;
    }

    if (sameOrigin && /\/products-[a-z]+\.json$/i.test(url.pathname)) {
        event.respondWith(networkFirst(request, DATA_CACHE, null, { cache: 'no-store' }));
        return;
    }

    if (sameOrigin && /\/products\.json$/i.test(url.pathname)) {
        event.respondWith(networkFirst(request, DATA_CACHE, PRODUCTS_URL, { cache: 'no-store' }));
        return;
    }

    if (request.destination === 'image') {
        // Never swap missing product photos with the app icon.
        // If a fetch fails, let the page-level <img onerror> handler show its own placeholder.
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
        return;
    }

    if (sameOrigin && (
        url.pathname.endsWith('/index.html') ||
        url.pathname.endsWith('/style.css') ||
        url.pathname.endsWith('/script.js') ||
        url.pathname.endsWith('/analytics.js') ||
        url.pathname.endsWith('/manifest.json') ||
        url.pathname.endsWith('/icon-192.png') ||
        url.pathname.endsWith('/icon-512.png') ||
        url.pathname === '/' ||
        url.pathname.endsWith('/')
    )) {
        // Fallback to the same asset path so versioned CSS/JS requests never resolve to index.html.
        const fallbackAsset = request.mode === 'navigate' ? OFFLINE_FALLBACK_URL : url.pathname;
        event.respondWith(networkFirst(request, APP_CACHE, fallbackAsset));
        return;
    }

    if (request.destination === 'style' || request.destination === 'font' || request.destination === 'script') {
        event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    }
});
