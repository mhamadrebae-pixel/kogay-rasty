(function authBootstrap() {
    const PASSWORD_SALT = 'kogay_salt_2026';
    const HARDCODED_PASS_HASH = '2672021addda1e88149a5ebcd9f1b05346b5a58af677fcb5b81bcd5d0802c1cd';

    async function hashPass(pass) {
        const encoder = new TextEncoder();
        const data = encoder.encode(String(pass || '') + PASSWORD_SALT);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    async function verifyPassword(input) {
        if (!input) return false;
        const nextHash = await hashPass(input);
        return nextHash === HARDCODED_PASS_HASH;
    }

    window.hashPassword = hashPass;
    window.verifyPassword = verifyPassword;
    window.AdminAuth = {
        PASSWORD_SALT,
        HARDCODED_PASS_HASH,
        hashPass,
        verifyPassword
    };
})();
