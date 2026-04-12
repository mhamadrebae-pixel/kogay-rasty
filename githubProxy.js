(function githubProxyBootstrap() {
    // Keep the last publish payload locally so the admin can simulate a secure proxy
    // without sending tokens or direct write requests from the browser.
    const PUBLISH_QUEUE_KEY = 'githubPublishQueue_v1';

    // Queue the current product snapshot as if it were being forwarded to a backend proxy.
    async function publishProducts(data, config) {
        const payload = {
            products: Array.isArray(data) ? data : [],
            files: buildProductFiles(Array.isArray(data) ? data : []),
            repo: {
                username: config?.username || '',
                repo: config?.repo || ''
            },
            queuedAt: new Date().toISOString()
        };

        try {
            localStorage.setItem(PUBLISH_QUEUE_KEY, JSON.stringify(payload));
        } catch (error) {
            console.warn('Unable to cache publish payload', error);
        }

        console.log('Publishing...', payload);
        return {
            ok: true,
            simulated: true,
            queuedAt: payload.queuedAt,
            fileCount: Object.keys(payload.files).length
        };
    }

    // Prepare both the master JSON and split category files for future backend publishing.
    function buildProductFiles(products) {
        const files = {
            'products.json': products
        };

        products.forEach(product => {
            const category = String(product?.category || '').trim();
            if (!category) return;
            const fileName = `products-${category}.json`;
            if (!files[fileName]) files[fileName] = [];
            files[fileName].push(product);
        });

        return files;
    }

    // Small debug helper so the admin panel can inspect the latest queued publish package.
    function getQueuedPublishPayload() {
        try {
            return JSON.parse(localStorage.getItem(PUBLISH_QUEUE_KEY) || 'null');
        } catch (error) {
            return null;
        }
    }

    window.publishProducts = publishProducts;
    window.getQueuedPublishPayload = getQueuedPublishPayload;
})();
