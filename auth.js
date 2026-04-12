(function authBootstrap() {
    // Persist keys in localStorage so the admin page can keep credentials client-side
    // without exposing a plain-text password in the HTML/JS bundle.
    const ADMIN_USER_KEY = 'adminUser';
    const ADMIN_HASH_KEY = 'adminHash';
    const ADMIN_SALT_KEY = 'adminSalt';
    const ADMIN_ITERATIONS_KEY = 'adminHashIterations';
    const ADMIN_SCHEME_KEY = 'adminHashScheme';
    const LEGACY_SALT = '_salt_v1';
    const PBKDF2_ITERATIONS = 210000;
    const HASH_SCHEME = 'pbkdf2-sha256';

    function legacyHashPassword(pass) {
        return btoa(String(pass || '') + LEGACY_SALT);
    }

    function bytesToBase64(bytes) {
        let binary = '';
        bytes.forEach(byte => { binary += String.fromCharCode(byte); });
        return btoa(binary);
    }

    function base64ToBytes(value) {
        const binary = atob(String(value || ''));
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) {
            bytes[index] = binary.charCodeAt(index);
        }
        return bytes;
    }

    function createSalt() {
        const salt = new Uint8Array(16);
        window.crypto.getRandomValues(salt);
        return bytesToBase64(salt);
    }

    async function derivePasswordHash(pass, salt, iterations = PBKDF2_ITERATIONS) {
        if (!window.crypto?.subtle) return legacyHashPassword(pass);
        const encoder = new TextEncoder();
        const imported = await window.crypto.subtle.importKey(
            'raw',
            encoder.encode(String(pass || '')),
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        );
        const derivedBits = await window.crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                hash: 'SHA-256',
                salt: base64ToBytes(salt),
                iterations
            },
            imported,
            256
        );
        return bytesToBase64(new Uint8Array(derivedBits));
    }

    // Keep the old sync helper name for compatibility with any older inline code.
    function hashPassword(pass) {
        return legacyHashPassword(pass);
    }

    function getStoredSalt() {
        return localStorage.getItem(ADMIN_SALT_KEY) || '';
    }

    function getStoredIterations() {
        return Number(localStorage.getItem(ADMIN_ITERATIONS_KEY) || PBKDF2_ITERATIONS);
    }

    function isLegacyHash() {
        return !getStoredSalt();
    }

    // Compare user input against the stored hash instead of a raw password.
    async function verifyPassword(input, stored) {
        if (!stored) return false;
        if (isLegacyHash()) return legacyHashPassword(input) === stored;
        try {
            const derived = await derivePasswordHash(input, getStoredSalt(), getStoredIterations());
            return derived === stored;
        } catch (error) {
            console.warn('Unable to verify PBKDF2 hash, falling back to legacy check.', error);
            return legacyHashPassword(input) === stored;
        }
    }

    // Read the saved admin username for login/setup screens.
    function getStoredAdminUser() {
        return localStorage.getItem(ADMIN_USER_KEY) || '';
    }

    // Read the saved admin password hash from localStorage.
    function getStoredAdminHash() {
        return localStorage.getItem(ADMIN_HASH_KEY) || '';
    }

    // Save a username plus hashed password during the one-time setup flow.
    async function saveAdminCredentials(username, password) {
        const cleanUser = String(username || '').trim();
        const cleanPass = String(password || '');
        if (!cleanUser || !cleanPass) return false;
        try {
            const salt = createSalt();
            const hash = await derivePasswordHash(cleanPass, salt, PBKDF2_ITERATIONS);
            localStorage.setItem(ADMIN_USER_KEY, cleanUser);
            localStorage.setItem(ADMIN_HASH_KEY, hash);
            localStorage.setItem(ADMIN_SALT_KEY, salt);
            localStorage.setItem(ADMIN_ITERATIONS_KEY, String(PBKDF2_ITERATIONS));
            localStorage.setItem(ADMIN_SCHEME_KEY, HASH_SCHEME);
            return true;
        } catch (error) {
            console.warn('Unable to save PBKDF2 credentials, falling back to legacy hash.', error);
            localStorage.setItem(ADMIN_USER_KEY, cleanUser);
            localStorage.setItem(ADMIN_HASH_KEY, legacyHashPassword(cleanPass));
            localStorage.removeItem(ADMIN_SALT_KEY);
            localStorage.removeItem(ADMIN_ITERATIONS_KEY);
            localStorage.setItem(ADMIN_SCHEME_KEY, 'legacy-btoa');
            return true;
        }
    }

    async function migrateLegacyCredentials(username, password) {
        if (!isLegacyHash()) return false;
        const cleanUser = String(username || '').trim();
        const storedUser = getStoredAdminUser();
        const storedHash = getStoredAdminHash();
        if (!cleanUser || cleanUser !== storedUser || legacyHashPassword(password) !== storedHash) return false;
        return saveAdminCredentials(cleanUser, password);
    }

    // Expose the helpers globally because admin.html is still an inline-script page.
    window.hashPassword = hashPassword;
    window.verifyPassword = verifyPassword;
    window.AdminAuth = {
        ADMIN_USER_KEY,
        ADMIN_HASH_KEY,
        ADMIN_SALT_KEY,
        ADMIN_ITERATIONS_KEY,
        ADMIN_SCHEME_KEY,
        hashPassword,
        verifyPassword,
        getStoredAdminUser,
        getStoredAdminHash,
        getStoredSalt,
        getStoredIterations,
        saveAdminCredentials,
        migrateLegacyCredentials
    };
})();
