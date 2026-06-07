(function githubProxyBootstrap() {
    const DEFAULT_GH_OWNER = 'mhamadrebae-pixel';
    const DEFAULT_GH_REPO = 'kogay-rasty';
    const DEFAULT_GH_BRANCH = 'main';
    const PRODUCT_CATEGORY_FILES = {
        cake: 'products-cake.json',
        gaz: 'products-gaz.json',
        drink: 'products-drink.json',
        chips: 'products-chips.json',
        baby: 'products-baby.json',
        family: 'products-family.json'
    };

    function encodeStringToBase64(text) {
        const bytes = new TextEncoder().encode(String(text || ''));
        let binary = '';
        const chunkSize = 0x8000;
        for (let index = 0; index < bytes.length; index += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
        }
        return btoa(binary);
    }

    function getGitHubAuthHeaders(token, contentType = '') {
        const cleanToken = String(token || '').trim();
        if (!cleanToken) {
            throw new Error('GitHub token is missing.');
        }
        const headers = {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${cleanToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
        };
        if (contentType) headers['Content-Type'] = contentType;
        return headers;
    }

    function sanitizeConfig(config = {}) {
        return {
            username: String(config.username || DEFAULT_GH_OWNER || '').trim(),
            repo: String(config.repo || DEFAULT_GH_REPO || '').trim(),
            branch: String(config.branch || DEFAULT_GH_BRANCH || 'main').trim() || 'main',
            token: String(config.token || '').trim()
        };
    }

    function buildGitHubContentsApiUrl(path, config) {
        const cleanPath = String(path || '')
            .replace(/^\/+/, '')
            .split('/')
            .map(segment => encodeURIComponent(segment))
            .join('/');
        return `https://api.github.com/repos/${encodeURIComponent(config.username)}/${encodeURIComponent(config.repo)}/contents/${cleanPath}`;
    }

    async function readGitHubApiError(response) {
        let detail = '';
        try {
            const data = await response.json();
            detail = String(data?.message || '').trim();
        } catch (error) {
        }
        return detail || response.statusText || 'Unknown GitHub error';
    }

    function formatGitHubApiError(status, path, detail, operation = 'publish') {
        const cleanDetail = String(detail || '').trim();
        if (status === 401) {
            return `GitHub returned 401 for ${path}. The token is invalid, expired, or missing.${cleanDetail ? ` ${cleanDetail}` : ''}`;
        }
        if (status === 403) {
            return `GitHub returned 403 for ${path}. The token lacks repository contents permission or the API rate limit was reached.${cleanDetail ? ` ${cleanDetail}` : ''}`;
        }
        if (status === 404) {
            return `GitHub returned 404 for ${path}. Check the owner, repository, branch, and file path.${cleanDetail ? ` ${cleanDetail}` : ''}`;
        }
        return `GitHub could not ${operation} ${path} (${status}).${cleanDetail ? ` ${cleanDetail}` : ''}`;
    }

    function normalizeProductRecord(product = {}) {
        const source = product && typeof product === 'object' ? product : {};
        const price = Number(source.price);
        return {
            ...source,
            id: String(source.id || '').trim(),
            name: String(source.name || '').trim(),
            name_en: String(source.name_en || '').trim(),
            description: String(source.description || '').trim(),
            description_en: String(source.description_en || '').trim(),
            image: String(source.image || '').trim(),
            image_webp: String(source.image_webp || '').trim(),
            category: String(source.category || '').trim(),
            price: Number.isFinite(price) && price >= 0 ? price : 0,
            hidden: Boolean(source.hidden)
        };
    }

    function buildProductFiles(products) {
        const normalized = Array.isArray(products)
            ? products.map(product => normalizeProductRecord(product)).filter(product => product.id && (product.name || product.name_en))
            : [];
        const files = {
            'products.json': normalized
        };
        Object.entries(PRODUCT_CATEGORY_FILES).forEach(([category, fileName]) => {
            files[fileName] = normalized.filter(product => product.category === category);
        });
        return files;
    }

    async function putJsonFileToGitHub(path, data, config) {
        const cleanPath = String(path || '').replace(/^\/+/, '');
        const url = buildGitHubContentsApiUrl(cleanPath, config);
        let sha = null;

        const getRes = await fetch(`${url}?ref=${encodeURIComponent(config.branch)}`, {
            method: 'GET',
            headers: getGitHubAuthHeaders(config.token),
            cache: 'no-store'
        });

        if (getRes.ok) {
            const currentFile = await getRes.json();
            sha = currentFile?.sha || null;
        } else if (getRes.status !== 404) {
            const detail = await readGitHubApiError(getRes);
            throw new Error(formatGitHubApiError(getRes.status, cleanPath, detail, 'read'));
        }

        const body = {
            message: `Update ${cleanPath}`,
            content: encodeStringToBase64(JSON.stringify(data, null, 2) + '\n'),
            branch: config.branch
        };

        if (sha) body.sha = sha;

        const putRes = await fetch(url, {
            method: 'PUT',
            headers: getGitHubAuthHeaders(config.token, 'application/json'),
            body: JSON.stringify(body)
        });

        if (!putRes.ok) {
            const detail = await readGitHubApiError(putRes);
            throw new Error(formatGitHubApiError(putRes.status, cleanPath, detail, 'publish'));
        }

        return putRes.json();
    }

    async function publishProducts(data, config) {
        const cleanConfig = sanitizeConfig(config);
        if (!cleanConfig.username || !cleanConfig.repo || !cleanConfig.branch) {
            throw new Error('GitHub owner, repository, and branch are required.');
        }
        if (!cleanConfig.token) {
            throw new Error('GitHub token is required.');
        }

        const files = buildProductFiles(data);
        const results = [];
        for (const [path, fileData] of Object.entries(files)) {
            results.push(await putJsonFileToGitHub(path, fileData, cleanConfig));
        }

        return {
            ok: true,
            fileCount: results.length,
            files: Object.keys(files),
            publishedAt: new Date().toISOString()
        };
    }

    function getQueuedPublishPayload() {
        return null;
    }

    window.publishProducts = publishProducts;
    window.buildProductFilesForPublish = buildProductFiles;
    window.getQueuedPublishPayload = getQueuedPublishPayload;
})();
