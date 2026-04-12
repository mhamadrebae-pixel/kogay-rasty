(function analyticsBootstrap() {
    // Storefront-wide counters live in localStorage because the project is still frontend-first.
    const TOTAL_VIEWS_KEY = 'views';
    const PRODUCT_VIEWS_KEY = 'productViews';

    // Safe JSON reader for analytics blobs.
    function readJson(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
        } catch (error) {
            return fallback;
        }
    }

    // Safe JSON writer so analytics failures never break the UI.
    function writeJson(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('Unable to write analytics key', key, error);
        }
    }

    // Track a storefront page view on each load.
    function trackView() {
        const views = Number(localStorage.getItem(TOTAL_VIEWS_KEY) || 0) + 1;
        localStorage.setItem(TOTAL_VIEWS_KEY, String(views));
        return views;
    }

    // Read the total stored storefront view count.
    function getTrackedViews() {
        return Number(localStorage.getItem(TOTAL_VIEWS_KEY) || 0);
    }

    // Increment a per-product counter for lightweight popularity tracking.
    function trackProductView(productId) {
        if (!productId) return 0;
        const map = readJson(PRODUCT_VIEWS_KEY, {});
        map[productId] = Number(map[productId] || 0) + 1;
        writeJson(PRODUCT_VIEWS_KEY, map);
        return map[productId];
    }

    // Return the saved popularity count for one product.
    function getProductViewCount(productId) {
        const map = readJson(PRODUCT_VIEWS_KEY, {});
        return Number(map[productId] || 0);
    }

    window.trackView = trackView;
    window.getTrackedViews = getTrackedViews;
    window.trackProductView = trackProductView;
    window.getProductViewCount = getProductViewCount;
})();
