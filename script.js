// ==========================================
// کۆگای ڕاستی - v9 (Mobile Thermal Pass)
// ==========================================
 
(function hideLoaderSafe() {
    const loader = document.getElementById('loader');
    if (!loader || window.getComputedStyle(loader).display === 'none') return;
    let didHide = false;
    function doHide() {
        if (didHide) return;
        didHide = true;
        loader.classList.add('hidden');
        setTimeout(function () { loader.style.display = 'none'; }, 260);
    }
    document.addEventListener('DOMContentLoaded', function () { setTimeout(doHide, 160); }, { once: true });
    setTimeout(doHide, 340);
    window.addEventListener('load', function () { setTimeout(doHide, 80); }, { once: true });
})();

const connectionInfo = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
const reducedMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
const ICON_SVG_MAP = {
    'fa-store': '<path d="M4 10h16"/><path d="M5 10v9h14v-9"/><path d="M4 6h16l1 4H3Z" fill="currentColor" opacity=".16"/><path d="M9 19v-5h6v5"/>',
    'fa-search': '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    'fa-shopping-cart': '<circle cx="10" cy="19" r="1.25"/><circle cx="17" cy="19" r="1.25"/><path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2"/>',
    'fa-shopping-bag': '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 1 1 6 0"/>',
    'fa-moon': '<path fill="currentColor" stroke="none" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    'fa-sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
    'fa-wifi-slash': '<path d="M2 8a16 16 0 0 1 20 0"/><path d="M5 12a11 11 0 0 1 11.2-1.8"/><path d="M8.5 15.5a5 5 0 0 1 4.1-.7"/><path d="m2 2 20 20"/>',
    'fa-star': '<path fill="currentColor" stroke="none" d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L3 9.4l6.2-.9Z"/>',
    'fa-cake-candles': '<path d="M6 11h12v7H6Z"/><path d="M6 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2"/><path d="M9 7v4M12 5v6M15 7v4"/>',
    'fa-cookie-bite': '<path d="M12 4a8 8 0 1 0 8 8 4 4 0 0 1-4-4 4 4 0 0 1 0-4A8 8 0 0 0 12 4Z"/><circle cx="9" cy="10" r="1"/><circle cx="12.5" cy="13.5" r=".9"/><circle cx="10" cy="15" r=".8"/>',
    'fa-bowl-food': '<path d="M4 12h16a8 8 0 0 1-16 0Z"/><path d="M7 8c.8-.4 1.5-.4 2.3 0M11 6.5c.8-.4 1.5-.4 2.3 0M15 8c.8-.4 1.5-.4 2.3 0"/>',
    'fa-border-all': '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16M4 12h16"/>',
    'fa-heart': {
        solid: '<path fill="currentColor" stroke="none" d="m12 20-1.3-1.1C5.7 14.6 3 12.1 3 9a4 4 0 0 1 7-2.6A4 4 0 0 1 21 9c0 3.1-2.7 5.6-7.7 9.9L12 20Z"/>',
        regular: '<path d="m12 20-1.3-1.1C5.7 14.6 3 12.1 3 9a4 4 0 0 1 7-2.6A4 4 0 0 1 21 9c0 3.1-2.7 5.6-7.7 9.9L12 20Z"/>'
    },
    'fa-glass-water': '<path d="M6 4h12v3.5c0 5.5-3 10.5-6 12-3-1.5-6-6.5-6-12Z"/><path d="M6 9c2.5.9 4 1.1 6 0 2-.9 3.5-.9 6 0"/>',
    'fa-baby': '<circle cx="12" cy="8.5" r="4"/><circle cx="12" cy="15" r="2.2"/><path d="M9.5 15a2.5 2.5 0 0 0 5 0"/>',
    'fa-users': '<circle cx="12" cy="9" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/><path d="M18 8.5a2.5 2.5 0 1 1 0 5"/><path d="M5.5 13.5a2.5 2.5 0 1 0 0-5"/>',
    'fa-box-open': '<path d="M3 9.5 12 5l9 4.5-9 4.5Z"/><path d="M3 9.5V17l9 4 9-4V9.5"/><path d="M12 14v7"/>',
    'fa-box': '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5Z"/><path d="M12 3v18"/><path d="M3.5 7.5 12 12l8.5-4.5"/>',
    'fa-code': '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 5-4 14"/>',
    'fa-user': '<circle cx="12" cy="8" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
    'fa-facebook': '<path fill="currentColor" stroke="none" d="M13.4 20v-6.1h2.1l.4-2.5h-2.5V9.8c0-.7.2-1.3 1.3-1.3H16V6.2c-.3 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.2v1.8H9v2.5h2.1V20z"/>',
    'fa-whatsapp': '<path d="M20 11.5A8 8 0 0 1 8.3 18.6L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9.2 8.8c.3-.6.6-.6.8-.6h.6c.2 0 .4 0 .6.5.2.4.8 1.6.9 1.7.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.4.4c-.1.1-.2.3-.1.5.1.2.6 1 1.2 1.5.8.7 1.5 1 1.7 1.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.3.6-.2l1.7.8c.2.1.4.2.4.4 0 .2 0 1-.7 1.4-.4.3-.8.4-1.3.3-.6-.1-1.4-.3-2.7-1.2-1.6-1.1-2.6-2.5-3-3.1-.4-.6-.9-1.6-.9-2.6 0-.5.2-1.1.5-1.5Z"/>',
    'fa-phone': '<path d="m6.8 4.8 2.2 2.2c.4.4.5 1 0 1.4L7.8 9.6c.8 1.6 2.1 2.9 3.7 3.7l1.2-1.2c.4-.4 1-.4 1.4 0l2.2 2.2c.4.4.4 1 0 1.4l-1.1 1.1c-.5.5-1.3.7-2 .5-2.6-.8-5.9-4.1-6.7-6.7-.2-.7 0-1.5.5-2l1.1-1.1c.4-.4 1-.4 1.4 0Z"/>',
    'fa-times': '<path d="M6 6 18 18M18 6 6 18"/>',
    'fa-download': '<path d="M12 4v10"/><path d="m8 10 4 4 4-4"/><path d="M5 20h14"/>',
    'fa-arrow-up': '<path d="m12 6-5 5"/><path d="m12 6 5 5"/><path d="M12 6v12"/>',
    'fa-cart-plus': '<circle cx="10" cy="19" r="1.25"/><circle cx="17" cy="19" r="1.25"/><path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2"/><path d="M19 2v6M16 5h6"/>',
    'fa-magnifying-glass-plus': '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/><path d="M11 8v6M8 11h6"/>',
    'fa-trash': '<path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M7 7l1 12h8l1-12"/><path d="M10 11v5M14 11v5"/>',
    'fa-check': '<path d="m5 12 4 4 10-10"/>',
    'fa-info': '<circle cx="12" cy="12" r="9"/><path d="M12 10v6"/><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/>',
    'fa-cloud-bolt': '<path d="M7 18h10a4 4 0 1 0-.9-7.9A5.5 5.5 0 0 0 5.2 12.2 3.3 3.3 0 0 0 7 18Z"/><path d="m12.5 10-2 4h2l-1 4 4-6h-2l1-2Z" fill="currentColor" stroke="none"/>'
};

function shouldUseLiteMode() {
    return document.documentElement.classList.contains('lite-mode');
}

function isMobileViewport() {
    return window.innerWidth < 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
}

function shouldAnimateUI() {
    return !shouldUseLiteMode() && !isMobileViewport() && !reducedMotionQuery.matches;
}

function canPreloadNonCritical() {
    const effectiveType = connectionInfo?.effectiveType || '';
    return !shouldUseLiteMode() && !isMobileViewport() && !connectionInfo?.saveData && !/2g|3g/i.test(effectiveType) && !document.hidden;
}

function getPreferredScrollBehavior() {
    return shouldUseLiteMode() || reducedMotionQuery.matches ? 'auto' : 'smooth';
}

function getPriorityImageCount() {
    if (shouldUseLiteMode()) return 0;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1200) return 2;
    return 4;
}

function getRequestedSkeletonCount() {
    return shouldUseLiteMode() ? Math.min(getSkeletonCount(), 4) : getSkeletonCount();
}

function scheduleNonCriticalTask(task, timeout = 1200) {
    if (typeof task !== 'function') return null;
    if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(() => task(), { timeout });
    }
    return window.setTimeout(task, timeout);
}

function buildInlineIcon(iconName, classList) {
    const icon = ICON_SVG_MAP[iconName];
    if (!icon) return '';
    const variant = classList && classList.contains('far') ? 'regular' : 'solid';
    const markup = typeof icon === 'string' ? icon : (icon[variant] || icon.solid || icon.regular || '');
    if (!markup) return '';
    return `<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">${markup}</svg>`;
}

function hydrateIcons(root = document) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('i[class*="fa-"]').forEach(node => {
        const iconName = Array.from(node.classList).find(token => token.startsWith('fa-'));
        if (!iconName) return;
        const svg = buildInlineIcon(iconName, node.classList);
        if (!svg) return;
        if (node.dataset.iconName === iconName && node.innerHTML === svg) return;
        node.dataset.iconName = iconName;
        node.classList.add('app-icon');
        node.innerHTML = svg;
    });
}

function initInlineIcons() {
    hydrateIcons(document);
}

initInlineIcons();
 
const categories = {
    cake: { name: 'کێک', icon: 'fa-cake-candles', count: 0 },
    gaz: { name: 'گەز و بسکیت', icon: 'fa-cookie-bite', count: 0 },
    drink: { name: 'خواردنەوە', icon: 'fa-glass-water', count: 0 },
    chips: { name: 'چیپس', icon: 'fa-bowl-food', count: 0 },
    baby: { name: 'مناڵان', icon: 'fa-baby', count: 0 },
    family: { name: 'عایلەی', icon: 'fa-users', count: 0 }
};
 
let products = [];
let cart = [];
let currentCategory = 'cake';
let currentPage = 1;
// Returns the right page size for the current viewport so mobile gets lighter pages.
function getItemsPerPage() {
    if (window.innerWidth < 600) return 8;
    if (window.innerWidth < 1024) return 12;
    return 20;
}
let wishlist = [];
let showingWishlist = false;
let deferredInstallPrompt = null;
let currentSearchQuery = '';
let isLoadingProducts = false;
let lastProductLoadSource = 'network';
let isOffline = !navigator.onLine;
let activeImageProductId = null;
let scrollLockDepth = 0;
let scrollLockY = 0;
let preloadQueued = false;
let preloadingCategories = false;
let searchCatalogLoadState = 'idle';
// Search is pre-indexed once products are loaded so typing stays responsive.
let searchIndex = [];
// Track which category files have already been fetched from the split JSON payloads.
const loadedCategories = new Set();
const pendingCategoryLoads = new Map();

const PRODUCT_CACHE_KEY = 'kogayProductsCache';
const PRODUCT_CACHE_META_KEY = 'kogayProductsCacheMeta';
const INSTALL_DISMISS_KEY = 'installDismissedAt';
const INSTALL_DISMISS_MS = 7 * 24 * 60 * 60 * 1000;
const VALID_CATEGORIES = new Set(Object.keys(categories));
// Each storefront category now maps to its own lightweight JSON file.
const PRODUCT_DATA_FALLBACK = 'products.json';
const PRODUCT_CATEGORY_FILES = Object.fromEntries(
    Object.keys(categories).map(category => [category, `products-${category}.json`])
);
 
// ==========================================
// ★ Multi Language — KU / AR / EN
// ==========================================
const LANG = {
    ku: {
        dir: 'rtl',
        search: 'گەڕان...',
        searchMobile: 'گەڕان لە کاڵاکان...',
        cart: 'سەبەتە',
        cartEmpty: 'سەبەتە بەتاڵە',
        cartEmptySub: 'کاڵای دڵخوازت زیاد بکە',
        send: 'ناردن بە WhatsApp',
        namePh: 'ناوت بنووسە...',
        phonePh: 'ژمارە تەلەفۆن...',
        heroSub: 'باشترین کاڵاکان هەڵبژێرە و داواکاریەکەت بنێرە',
        heroBadge: 'باشترین کوالیتی',
        heroTitle1: 'کۆگای',
        heroTitle2: 'ڕاستی',
        sections: 'بەشەکان',
        nameLbl: 'زانیاری کڕیار',
        priceAsk: 'پرسیار بکە',
        priceLabel: 'نرخ',
        addedToCart: ' زیادکرا ✓',
        removed: 'کاڵا لابرا',
        cartEmptyErr: 'سەبەتە بەتاڵە!',
        fillInfo: 'ناو و ژمارە بنووسە',
        invalidPhone: 'ژمارە تەلەفۆنەکە دەبێت 10 بۆ 15 ژمارە بێت',
        cartTitle: 'سەبەتە',
        totalItems: 'کۆی کاڵاکان:',
        totalPrice: 'کۆی گشتی:',
        footerText: `© ${new Date().getFullYear()} کۆگای ڕاستی — هەموو مافەکان پارێزراون`,
        statProducts: 'بەرهەم',
        statSections: 'بەش',
        statService: 'خزمەت',
        brandName: 'کۆگای ڕاستی',
        brandSubtitle: 'فرۆشگای تایبەت',
        developerLabel: 'دیزاین و گەشەپێدراوە لەلایەن',
        developerCredit: 'دیزاین و گەشەپێدراوە لەلایەن Mhamad',
        profileBtn: 'بینینی پڕۆفایل',
        itemWord: 'کاڵا',
        loadingProducts: 'بارکردنی بەرهەمەکان...',
        searchResults: 'ئەنجامی گەڕان',
        searchAllProducts: 'گەڕان لە هەموو کاڵاکان',
        searchLoadingMore: 'بەرهەمەکانی تر بار دەکرێن...',
        wishlistTitle: 'دڵخوازەکان',
        wishlistAdded: 'زیادکرا بۆ دڵخوازەکان ❤️',
        wishlistRemoved: 'لە دڵخوازەکان لابرا',
        wishlistEmpty: 'هیچ کاڵایەکی دڵخواز نیە',
        wishlistEmptySub: 'دوگمەی ❤️ لە سەر کاڵاکان بکە',
        offlineBanner: 'ئۆفلاینیت، بەرهەمە هەڵگیراوەکان نیشان دەدرێن',
        retry: 'هەوڵدانەوە',
        offlineUnavailableTitle: 'ئۆفلاینیت و بەرهەمێکی هەڵگیراو نیە',
        offlineUnavailableSub: 'کاتێک ئینتەرنێت هەبوو سەردانی ماڵپەڕەکە بکە بۆ هەڵگرتنی بەرهەمەکان.',
        loadFailedTitle: 'نەتوانرا بەرهەمەکان بار بکرێن',
        loadFailedSub: 'تکایە دواتر هەوڵ بدەوە.',
        successTitle: 'سوپاس! 🎉',
        successText: 'داواکاریەکەت بە سەرکەوتوویی نێردرا<br>بەم زووانەیە پەیوەندیت پێوە دەکرێت',
        successButton: 'باشە، سوپاس!',
        paginationPrev: 'پێشوو',
        paginationNext: 'دواتر',
        paginationHint: 'پەڕە',
        paginationStatus: (current, total) => `${current} لە ${total}`,
        installTitle: 'ئەپەکە دامەزرێنە',
        installSub: 'خێراتر و ئاسانتر بەکاربێنە',
        noResultsSug: 'بەشی دیکەش ببینە؟',
        reminderTitle: 'کاڵات لە سەبەتەدایە!',
        reminderSub: 'داواکاریەکەت تەواو بکە',
        reminderView: 'بینین',
        waTitle: 'داواکاری نوێ',
        waName: 'ناو',
        waPhone: 'تەلەفۆن',
        waItems: 'کاڵاکان',
        waTotal: 'کۆی گشتی',
        cats: { cake:'کێک', gaz:'گەز و بسکیت', drink:'خواردنەوە', chips:'چیپس', baby:'مناڵان', family:'عایلەی' },
    },
    en: {
        dir: 'ltr',
        search: 'Search...',
        searchMobile: 'Search products...',
        cart: 'Cart',
        cartEmpty: 'Cart is empty',
        cartEmptySub: 'Add your favorite items',
        send: 'Send via WhatsApp',
        namePh: 'Your name...',
        phonePh: 'Phone number...',
        heroSub: 'Choose the best products and send your order',
        heroBadge: 'Best Quality',
        heroTitle1: 'Kogay',
        heroTitle2: 'Rasti',
        sections: 'Categories',
        nameLbl: 'Customer Info',
        priceAsk: 'Ask for price',
        priceLabel: 'Price',
        addedToCart: ' added ✓',
        removed: 'Item removed',
        cartEmptyErr: 'Cart is empty!',
        fillInfo: 'Enter name and phone',
        invalidPhone: 'Phone number must contain 10 to 15 digits',
        cartTitle: 'Cart',
        totalItems: 'Total items:',
        totalPrice: 'Grand total:',
        footerText: `© ${new Date().getFullYear()} Kogay Rasty — All rights reserved`,
        statProducts: 'Products',
        statSections: 'Sections',
        statService: 'Service',
        brandName: 'Kogay Rasti',
        brandSubtitle: 'Premium Store',
        developerLabel: 'Designed & developed by',
        developerCredit: 'Designed & developed by Mhamad',
        profileBtn: 'View profile',
        itemWord: 'items',
        loadingProducts: 'Loading products...',
        searchResults: 'Search results',
        searchAllProducts: 'Search all products',
        searchLoadingMore: 'More products are loading...',
        wishlistTitle: 'Favorites',
        wishlistAdded: 'Added to favorites ❤️',
        wishlistRemoved: 'Removed from favorites',
        wishlistEmpty: 'No favorite items yet',
        wishlistEmptySub: 'Tap ❤️ on any product',
        offlineBanner: 'You are offline, showing saved products',
        retry: 'Retry',
        offlineUnavailableTitle: 'You are offline and no saved products are available',
        offlineUnavailableSub: 'Visit the storefront once while online to save products for offline browsing.',
        loadFailedTitle: 'Unable to load products',
        loadFailedSub: 'Please try again in a moment.',
        successTitle: 'Thank you! 🎉',
        successText: 'Your order was sent successfully<br>We will contact you very soon',
        successButton: 'Great, thanks!',
        paginationPrev: 'Previous',
        paginationNext: 'Next',
        paginationHint: 'Page',
        paginationStatus: (current, total) => `${current} of ${total}`,
        installTitle: 'Install App',
        installSub: 'Faster and easier to use',
        noResultsSug: 'Try another category?',
        reminderTitle: 'Items in your cart!',
        reminderSub: 'Complete your order',
        reminderView: 'View',
        waTitle: 'New Order',
        waName: 'Name',
        waPhone: 'Phone',
        waItems: 'Items',
        waTotal: 'Grand Total',
        cats: { cake:'Cake', gaz:'Biscuits', drink:'Drinks', chips:'Chips', baby:'Kids', family:'Family' },
    }
};
let currentLang = localStorage.getItem('shopLang') || 'ku';
 
function setLang(l, options = {}) {
    const { skipRender = false } = options;
    if (!LANG[l]) return;
    currentLang = l;
    localStorage.setItem('shopLang', l);
    const t = LANG[l];
    // dir و lang
    document.documentElement.dir = t.dir;
    document.documentElement.lang = l;
    const $ = id => document.getElementById(id);
    // Search
    const si = $('searchInput');       if (si) si.placeholder = t.search;
    const sm = $('searchInputMobile'); if (sm) sm.placeholder = t.searchMobile;
    // Navbar
    const ct = document.querySelector('.cart-text'); if (ct) ct.textContent = t.cart;
    const logoTitle = $('logoTitle'); if (logoTitle) logoTitle.textContent = t.brandName;
    const logoSubtitle = $('logoSubtitle'); if (logoSubtitle) logoSubtitle.textContent = t.brandSubtitle;
    // Hero
    const hs = document.querySelector('.hero-subtitle'); if (hs) hs.textContent = t.heroSub;
    const hb = document.querySelector('.hero-badge span'); if (hb) hb.textContent = t.heroBadge;
    const tl1 = document.querySelector('.title-line'); if (tl1) tl1.textContent = t.heroTitle1;
    const tl2 = document.querySelector('.title-highlight'); if (tl2) tl2.textContent = t.heroTitle2;
    // Stats
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.statProducts;
    if (statLabels[1]) statLabels[1].textContent = t.statSections;
    if (statLabels[2]) statLabels[2].textContent = t.statService;
    // Sections title
    const secTitle = document.querySelector('#sectionCatsTitle');
    if (secTitle) secTitle.textContent = t.sections;
    const secTitleEl = document.querySelector('.categories-section .section-title');
    if (secTitleEl) secTitleEl.innerHTML = `<i class="fas fa-border-all"></i> <span id="sectionCatsTitle">${t.sections}</span>`;
    // Category names
    document.querySelectorAll('.category-card').forEach(card => {
        const categoryKey = card.dataset.category;
        if (categoryKey && t.cats[categoryKey]) {
            const nm = card.querySelector('.category-name');
            if (nm) nm.textContent = t.cats[categoryKey];
            const cc = card.querySelector('.category-count');
            if (cc && categories[categoryKey]) cc.textContent = formatItemCount(categories[categoryKey].count || 0);
        }
    });
    // Cart sidebar
    const cartH = document.querySelector('.cart-title h3'); if (cartH) cartH.textContent = t.cartTitle;
    // Customer form
    const cn = $('customerName');  if (cn) cn.placeholder = t.namePh;
    const cp = $('customerPhone'); if (cp) cp.placeholder = t.phonePh;
    const cb = document.querySelector('.checkout-btn span'); if (cb) cb.textContent = t.send;
    const cf = document.querySelector('.customer-form h4');
    if (cf) cf.innerHTML = `<i class="fas fa-user"></i> ${t.nameLbl}`;
    // Summary labels
    const sumRows = document.querySelectorAll('.summary-row span:first-child');
    if (sumRows[0]) sumRows[0].textContent = t.totalItems;
    if (sumRows[1]) sumRows[1].textContent = t.totalPrice;
    // Footer
    const ft = document.getElementById('footerText'); if (ft) ft.textContent = t.footerText;
    const footerBrand = document.getElementById('footerBrand'); if (footerBrand) footerBrand.textContent = t.brandName;
    applyFooterTranslations();
    const wishlistBtn = document.getElementById('wishlistFilterBtn');
    if (wishlistBtn) wishlistBtn.title = t.wishlistTitle || wishlistBtn.title;
    const offlineBannerText = document.getElementById('offlineBannerText');
    if (offlineBannerText) offlineBannerText.textContent = t.offlineBanner || offlineBannerText.textContent;
    const retryBtn = document.querySelector('.offline-retry-btn');
    if (retryBtn) retryBtn.textContent = t.retry || retryBtn.textContent;
    updateInstallBannerCopy();
    updateSuccessModalCopy();
    prepareOrderInputs();
    // دوگمەکانی زمان
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === l);
    });
    if (typeof updateOfflineBanner === 'function') updateOfflineBanner();
    if (!skipRender && typeof renderCurrentView === 'function') renderCurrentView({ resetPage: false });
    if (typeof updateImageModalCopy === 'function') updateImageModalCopy();
    updateCartUI();
    updateCartButtonAccessibility();
    hydrateIcons(document);
}
let isGlobalSearch = false;

function itemWord() {
    return LANG[currentLang]?.itemWord || 'items';
}

function formatItemCount(count = 0) {
    return `${count} ${itemWord()}`;
}

function getCategoryCard(category) {
    return document.querySelector(`.category-card[data-category="${category}"]`);
}

function applyFooterTranslations() {
    const ft = document.getElementById('footerText'); if (ft) ft.textContent = LANG[currentLang]?.footerText || ft.textContent;
    const dc = document.getElementById('developerCredit'); if (dc) dc.textContent = LANG[currentLang]?.developerCredit || dc.textContent;
    const dl = document.getElementById('developerLabel'); if (dl) dl.textContent = LANG[currentLang]?.developerLabel || dl.textContent;
    const footerBrand = document.getElementById('footerBrand'); if (footerBrand) footerBrand.textContent = LANG[currentLang]?.brandName || footerBrand.textContent;
    const pb = document.getElementById('profileBtn'); if (pb) {
        const span = pb.querySelector('span');
        if (span) span.textContent = LANG[currentLang]?.profileBtn || span.textContent;
    }
    const floating = document.querySelectorAll('.floating-card span');
    const keys = ['cake', 'gaz', 'chips'];
    floating.forEach((el, idx) => {
        const key = keys[idx];
        if (key && LANG[currentLang]?.cats?.[key]) el.textContent = LANG[currentLang].cats[key];
    });
}

function updateInstallBannerCopy() {
    const t = LANG[currentLang];
    const title = document.getElementById('installBannerTitle');
    const sub = document.getElementById('installBannerSub');
    if (title) title.textContent = t?.installTitle || title.textContent;
    if (sub) sub.textContent = t?.installSub || sub.textContent;
}

function updateSuccessModalCopy() {
    const t = LANG[currentLang];
    const title = document.getElementById('successModalTitle');
    const text = document.getElementById('successModalText');
    const button = document.getElementById('successModalCloseBtn');
    if (title) title.textContent = t?.successTitle || title.textContent;
    if (text) text.innerHTML = t?.successText || text.innerHTML;
    if (button) button.textContent = t?.successButton || button.textContent;
}

function lockBodyScroll() {
    scrollLockDepth += 1;
    if (scrollLockDepth > 1) return;
    scrollLockY = window.scrollY || window.pageYOffset || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollLockY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function unlockBodyScroll() {
    if (scrollLockDepth === 0) return;
    scrollLockDepth -= 1;
    if (scrollLockDepth > 0) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, scrollLockY);
}

function isStandaloneMode() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function isInstallDismissed() {
    const dismissedAt = Number(localStorage.getItem(INSTALL_DISMISS_KEY) || '0');
    return dismissedAt > 0 && (Date.now() - dismissedAt) < INSTALL_DISMISS_MS;
}

function getSkeletonCount() {
    if (window.innerWidth >= 1024) return 12;
    if (window.innerWidth >= 768) return 8;
    return shouldUseLiteMode() ? 4 : 6;
}
 
// ==========================================
// ★ PLACEHOLDER — وێنەی تێچووە
// ==========================================
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='280'%3E%3Crect fill='%231a1a2e' width='400' height='280'/%3E%3Ccircle cx='200' cy='120' r='35' fill='rgba(249%2C115%2C22%2C0.12)' /%3E%3Cpath d='M185 108 L215 108 L215 132 L185 132 Z' fill='none' stroke='rgba(249%2C115%2C22%2C0.3)' stroke-width='2'/%3E%3C/svg%3E`;
 
// ==========================================
// ★ TRUE LAZY LOADING — تەنها بار بکە کاتێک نیشان دەبێت
// ==========================================
let lazyObserver = null;
 
function initLazyObserver() {
    if (!('IntersectionObserver' in window)) {
        // Fallback بۆ براوزەری کۆن
        return;
    }
    lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            const realSrc = img.getAttribute('data-lazy-src');
            if (!realSrc) return;
            img.closest('picture')?.querySelectorAll('source[data-lazy-srcset]').forEach(source => {
                source.srcset = source.getAttribute('data-lazy-srcset') || '';
                source.removeAttribute('data-lazy-srcset');
            });
            img.removeAttribute('data-lazy-src');
            img.loading = 'lazy';
            img.decoding = 'async';
            img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
            img.addEventListener('error', () => { img.style.opacity = '0.3'; }, { once: true });
            img.src = realSrc;
            lazyObserver.unobserve(img);
            img.setAttribute('data-lazy-bound', 'loaded');
        });
    }, { rootMargin: shouldUseLiteMode() ? '180px 0px' : '320px 0px', threshold: 0 });
}
 
function observeNewImages(root = document) {
    const scope = root && root.querySelectorAll ? root : document;
    if (!lazyObserver) {
        // Fallback: بار بکە هەموویان
        scope.querySelectorAll('img[data-lazy-src]').forEach(img => {
            const src = img.getAttribute('data-lazy-src');
            if (src) { img.src = src; img.removeAttribute('data-lazy-src'); }
        });
        scope.querySelectorAll('source[data-lazy-srcset]').forEach(source => {
            source.srcset = source.getAttribute('data-lazy-srcset') || '';
            source.removeAttribute('data-lazy-srcset');
        });
        return;
    }
    scope.querySelectorAll('img[data-lazy-src]:not([data-lazy-bound])').forEach(img => {
        img.setAttribute('data-lazy-bound', 'pending');
        lazyObserver.observe(img);
    });
}
 
// ==========================================
// بارکردنی کاڵاکان
// ==========================================
function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
}

function encodeInlineArg(value) {
    return encodeURIComponent(String(value ?? ''));
}

function normalizeProducts(data) {
    if (!Array.isArray(data)) return [];
    const seenIds = new Set();
    return data
        .map((product, index) => ({
            ...product,
            id: String(product?.id || `product-${index + 1}`),
            name: String(product?.name || product?.name_en || '').trim(),
            name_en: String(product?.name_en || '').trim(),
            description: String(product?.description || product?.description_en || '').trim(),
            description_en: String(product?.description_en || '').trim(),
            image: String(product?.image || PLACEHOLDER).trim() || PLACEHOLDER,
            image_webp: String(product?.image_webp || '').trim(),
            price: Number(product?.price) || 0,
            category: String(product?.category || '').trim(),
            hidden: Boolean(product?.hidden),
            views: Number(window.getProductViewCount?.(String(product?.id || '')) || product?.views || 0)
        }))
        .filter(product =>
            !product.hidden &&
            VALID_CATEGORIES.has(product.category) &&
            (product.name || product.name_en) &&
            !String(product.name || product.name_en).match(/^IMG_\d+$/i) &&
            !seenIds.has(product.id) &&
            seenIds.add(product.id)
        );
}

function readStoredProducts() {
    try {
        const raw = localStorage.getItem(PRODUCT_CACHE_KEY);
        if (!raw) return [];
        return normalizeProducts(JSON.parse(raw));
    } catch (e) {
        try {
            localStorage.removeItem(PRODUCT_CACHE_KEY);
            localStorage.removeItem(PRODUCT_CACHE_META_KEY);
        } catch (err) { }
        return [];
    }
}

function storeProducts(productsList) {
    try {
        localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(productsList));
        localStorage.setItem(PRODUCT_CACHE_META_KEY, JSON.stringify({ savedAt: Date.now(), count: productsList.length }));
    } catch (e) { }
}

function markLoadedCategories(categoriesToMark = []) {
    categoriesToMark.forEach(category => {
        if (VALID_CATEGORIES.has(category)) loadedCategories.add(category);
    });
}

function hasUnloadedCategories() {
    return Object.keys(categories).some(category => !loadedCategories.has(category));
}

function shouldShowSearchLoadNotice() {
    return isGlobalSearch &&
        isMobileViewport() &&
        currentSearchQuery.trim().length >= 2 &&
        hasUnloadedCategories();
}

function buildSearchLoadNoticeMarkup() {
    if (!shouldShowSearchLoadNotice()) return '';
    const isLoading = searchCatalogLoadState === 'loading';
    return `<div class="search-status-banner">
        <span class="search-status-icon"><i class="fas fa-cloud-bolt"></i></span>
        <div class="search-status-copy">
            ${isLoading
                ? `<span>${escapeHtml(LANG[currentLang]?.searchLoadingMore || 'More products are loading...')}</span>`
                : `<button class="search-status-action" type="button" onclick="triggerSearchCatalogLoad()">${escapeHtml(LANG[currentLang]?.searchAllProducts || 'Search all products')}</button>`
            }
        </div>
    </div>`;
}

async function triggerSearchCatalogLoad() {
    if (searchCatalogLoadState === 'loading' || !isGlobalSearch || !isMobileViewport() || currentSearchQuery.trim().length < 2 || !hasUnloadedCategories()) {
        searchCatalogLoadState = hasUnloadedCategories() ? 'idle' : 'done';
        return;
    }

    searchCatalogLoadState = 'loading';
    renderCurrentView({ resetPage: false });

    try {
        await ensureAllProductsLoaded();
        updateCategoryCounts();
        updateHeroStats();
    } catch (error) {
        console.warn('On-demand search catalog load failed.', error);
    } finally {
        searchCatalogLoadState = hasUnloadedCategories() ? 'idle' : 'done';
        renderCurrentView({ resetPage: false });
    }
}

// Flatten product names/descriptions into a small lookup table for debounced search.
function buildSearchIndex(items = products) {
    searchIndex = items.map(product => ({
        id: product.id,
        text: getProductSearchText(product)
    }));
}

// Merge newly loaded category data into the existing product cache without duplicating IDs.
function mergeProducts(items = []) {
    const merged = new Map(products.map(product => [product.id, product]));
    items.forEach(product => {
        merged.set(product.id, {
            ...(merged.get(product.id) || {}),
            ...product,
            views: Number(window.getProductViewCount?.(product.id) || product.views || 0)
        });
    });
    products = Array.from(merged.values());
    buildSearchIndex(products);
    storeProducts(products);
    return products;
}

// Resolve the split JSON filename for a category.
function getCategoryDataUrl(category) {
    return PRODUCT_CATEGORY_FILES[category] || PRODUCT_DATA_FALLBACK;
}

// Use cached products as an offline fallback when a category request fails.
function getCachedCategoryProducts(category) {
    return readStoredProducts().filter(product => product.category === category);
}

// Load a single category file from the network and merge it into the in-memory store.
async function loadCategoryProducts(category, { showSkeleton = false, allowFullCatalogFallback = !isMobileViewport() && !shouldUseLiteMode() } = {}) {
    if (!VALID_CATEGORIES.has(category)) return false;
    if (showSkeleton && products.length === 0) showProductSkeletons();

    const candidates = [{ url: getCategoryDataUrl(category), categoryOnly: true }];
    if (allowFullCatalogFallback) {
        candidates.push({ url: PRODUCT_DATA_FALLBACK, categoryOnly: false });
    }
    try {
        for (const candidate of candidates) {
            try {
                const res = await fetch(candidate.url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const normalized = normalizeProducts(await res.json());
                const nextProducts = candidate.categoryOnly
                    ? normalized.filter(product => product.category === category)
                    : normalized;
                mergeProducts(nextProducts);
                if (candidate.categoryOnly) markLoadedCategories([category]);
                else markLoadedCategories(Object.keys(categories));
                lastProductLoadSource = 'network';
                return true;
            } catch (candidateError) {
                if (candidate.url === PRODUCT_DATA_FALLBACK) throw candidateError;
            }
        }
    } catch (error) {
        console.warn(`${category} products load failed:`, error);
        const cachedProducts = getCachedCategoryProducts(category);
        if (cachedProducts.length > 0) {
            mergeProducts(cachedProducts);
            markLoadedCategories([category]);
            lastProductLoadSource = 'cache';
            return true;
        }
        lastProductLoadSource = 'unavailable';
        return false;
    }
}

// Deduplicate concurrent fetches so repeated taps on the same category do not race.
async function ensureCategoryLoaded(category, { showSkeleton = false, force = false, allowFullCatalogFallback = !isMobileViewport() && !shouldUseLiteMode() } = {}) {
    if (!VALID_CATEGORIES.has(category)) return false;
    if (!force && loadedCategories.has(category)) return true;
    if (!force && pendingCategoryLoads.has(category)) return pendingCategoryLoads.get(category);

    const request = loadCategoryProducts(category, { showSkeleton, allowFullCatalogFallback }).finally(() => {
        pendingCategoryLoads.delete(category);
    });
    pendingCategoryLoads.set(category, request);
    return request;
}

// Load every category file before global search/wishlist views need the full catalog.
async function ensureAllProductsLoaded({ showSkeleton = false } = {}) {
    const missing = Object.keys(categories).filter(category => !loadedCategories.has(category));
    if (missing.length === 0) return true;
    if (showSkeleton && products.length === 0) showProductSkeletons();
    if (isMobileViewport() || shouldUseLiteMode()) {
        let allLoaded = true;
        for (let index = 0; index < missing.length; index++) {
            const loaded = await ensureCategoryLoaded(missing[index], { allowFullCatalogFallback: false });
            allLoaded = allLoaded && loaded;
            if (index < missing.length - 1) {
                await new Promise(resolve => window.setTimeout(resolve, 80));
            }
        }
        return allLoaded;
    }
    const results = await Promise.all(missing.map(category => ensureCategoryLoaded(category)));
    return results.every(Boolean);
}

// Background-prefetch the rest of the catalog after the active category is ready.
function preloadRemainingCategories() {
    if (!canPreloadNonCritical()) return;
    if (preloadingCategories || preloadQueued) return;
    const queue = Object.keys(categories).filter(category =>
        category !== currentCategory &&
        !loadedCategories.has(category) &&
        !pendingCategoryLoads.has(category)
    );
    if (queue.length === 0) return;

    const schedule = window.requestIdleCallback
        ? callback => window.requestIdleCallback(callback, { timeout: 1500 })
        : callback => window.setTimeout(callback, 1200);

    preloadQueued = true;
    schedule(async () => {
        preloadQueued = false;
        if (preloadingCategories) return;
        preloadingCategories = true;
        try {
            for (const category of queue) {
                const loaded = await ensureCategoryLoaded(category);
                if (!loaded) continue;
                updateCategoryCounts();
                updateHeroStats();
                if (isGlobalSearch || showingWishlist) renderCurrentView({ resetPage: false });
                await new Promise(resolve => window.setTimeout(resolve, shouldUseLiteMode() ? 220 : 140));
            }
        } finally {
            preloadingCategories = false;
        }
    });
}

function getProductName(product) {
    if (!product) return '';
    return currentLang === 'en'
        ? (product.name_en || product.name || '')
        : (product.name || product.name_en || '');
}

function getProductDescription(product) {
    if (!product) return '';
    return currentLang === 'en'
        ? (product.description_en || product.description || '')
        : (product.description || product.description_en || '');
}

function getProductPriceText(product) {
    return product.price > 0
        ? product.price.toLocaleString() + ' IQD'
        : (LANG[currentLang]?.priceAsk || 'پرسیار بکە');
}

function handleProductImageError(img) {
    if (!img) return;
    img.onerror = null;
    img.src = PLACEHOLDER;
    img.style.opacity = '0.55';
}

function getProductSearchText(product) {
    return [
        product?.name,
        product?.description,
        product?.name_en,
        product?.description_en
    ].filter(Boolean).join(' ').toLowerCase();
}

// Search the prebuilt index first, then map the matched IDs back to product objects.
function findProductsByQuery(query) {
    const normalizedQuery = String(query || '').trim().toLowerCase();
    if (!normalizedQuery) return [];
    const ids = new Set(
        searchIndex
            .filter(entry => entry.text.includes(normalizedQuery))
            .map(entry => entry.id)
    );
    return products.filter(product => ids.has(product.id));
}

// Central pagination helper used by category, wishlist, and search views.
function paginate(items) {
    const ipp = getItemsPerPage();
    const start = (currentPage - 1) * ipp;
    return items.slice(start, start + ipp);
}

// Restrict WhatsApp orders to a clean 10-15 digit phone number.
function validatePhone(phone) {
    return /^\d{10,15}$/.test(String(phone || '').trim());
}

// Simple retry hook for the offline banner.
function retryLoad() {
    location.reload();
}

// Give quick visual feedback whenever an item is added to the cart.
function animateCart() {
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn || !shouldAnimateUI()) return;
    cartBtn.classList.remove('shake');
    void cartBtn.offsetWidth;
    cartBtn.classList.add('shake');
    setTimeout(() => cartBtn.classList.remove('shake'), 420);
}

// Keep wishlist UI in sync across tabs now, and ready for future backend sync later.
function syncWishlistAcrossDevices() {
    window.addEventListener('storage', event => {
        if (event.key !== 'kogayWishlist') return;
        loadWishlist();
        updateWishlistFilterBtn();
        renderCurrentView({ resetPage: false });
    });
}

// Forward product view tracking to analytics and mirror the count into the live product object.
function trackProductPopularity(productId) {
    if (!productId) return 0;
    const product = products.find(item => item.id === productId);
    const views = Number(window.trackProductView?.(productId) || 0);
    if (product) product.views = views;
    return views;
}

// Inject the retry button from JS so the existing HTML structure stays stable.
function ensureOfflineRetryButton() {
    const bannerInner = document.querySelector('.offline-banner-inner');
    if (!bannerInner || bannerInner.querySelector('.offline-retry-btn')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'offline-retry-btn';
    button.textContent = LANG[currentLang]?.retry || 'Retry';
    button.addEventListener('click', retryLoad);
    bannerInner.appendChild(button);
}

// Add stronger mobile/input attributes without hardcoding them into the template.
function prepareOrderInputs() {
    const nameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    if (nameInput) nameInput.setAttribute('autocomplete', 'name');
    if (phoneInput) {
        phoneInput.setAttribute('autocomplete', 'tel');
        phoneInput.setAttribute('inputmode', 'numeric');
        phoneInput.setAttribute('pattern', '\\d{10,15}');
    }
}

function updateCartButtonAccessibility() {
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn) return;
    cartBtn.setAttribute('aria-label', LANG[currentLang]?.cart || 'Cart');
    cartBtn.setAttribute('title', LANG[currentLang]?.cart || 'Cart');
}

// Only use a WebP source when the product data explicitly provides one.
function getWebpImagePath(product) {
    const explicit = String(product?.image_webp || '').trim();
    if (explicit) return explicit;
    const original = String(product?.image || '').trim();
    return /\.webp$/i.test(original) ? original : '';
}

// Render product media inside <picture> so future WebP assets can slot in safely.
function buildProductPicture(product, productName, priority = 'low') {
    const imageSrc = escapeHtml(product.image || PLACEHOLDER);
    const webpSrc = getWebpImagePath(product);
    const eager = priority === 'high';
    const sourceMarkup = webpSrc
        ? eager
            ? `<source srcset="${escapeHtml(webpSrc)}" type="image/webp">`
            : `<source data-lazy-srcset="${escapeHtml(webpSrc)}" type="image/webp">`
        : '';

    return `<picture>
        ${sourceMarkup}
        <img
            src="${eager ? imageSrc : PLACEHOLDER}"
            ${eager ? '' : `data-lazy-src="${imageSrc}"`}
            alt="${escapeHtml(productName)}"
            loading="${eager ? 'eager' : 'lazy'}"
            decoding="async"
            fetchpriority="${priority}"
            onerror="handleProductImageError(this)"
            width="400" height="280"
            style="opacity:${eager ? '1' : '0.56'}"
        >
    </picture>`;
}

function getCartItemName(item) {
    const product = products.find(p => p.id === item.id);
    if (product) return getProductName(product);
    return currentLang === 'en'
        ? (item.name_en || item.name || '')
        : (item.name || item.name_en || '');
}

function buildSkeletonCard() {
    return `<div class="product-card skeleton-card" aria-hidden="true">
        <div class="product-image">
            <div class="skeleton-block skeleton-image"></div>
        </div>
        <div class="product-content">
            <div class="skeleton-block skeleton-title"></div>
            <div class="skeleton-block skeleton-desc"></div>
            <div class="skeleton-footer">
                <div class="skeleton-block skeleton-price"></div>
                <div class="skeleton-block skeleton-action"></div>
            </div>
        </div>
    </div>`;
}

function showProductSkeletons(count = getRequestedSkeletonCount()) {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const paginationWrap = document.getElementById('paginationWrap');
    const countEl = document.getElementById('productsCount');
    if (!grid) return;
    if (countEl) countEl.textContent = LANG[currentLang]?.loadingProducts || 'Loading products...';
    if (emptyState) emptyState.style.display = 'none';
    if (paginationWrap) {
        paginationWrap.style.display = 'none';
        paginationWrap.innerHTML = '';
    }
    grid.innerHTML = Array.from({ length: count }, buildSkeletonCard).join('');
}

async function loadProducts({ showSkeleton = true } = {}) {
    isLoadingProducts = true;
    if (showSkeleton && products.length === 0) showProductSkeletons();
    try {
        const loaded = await ensureCategoryLoaded(currentCategory, {
            showSkeleton: false,
            force: !isOffline && !isMobileViewport() && !shouldUseLiteMode()
        });
        if (loaded) preloadRemainingCategories();
        return loaded;
    } finally {
        isLoadingProducts = false;
    }
}
 
// ==========================================
// Image Modal
// ==========================================
function createImageModal() {
    if (document.getElementById('imageModal')) return;
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="image-modal-dialog" role="dialog" aria-modal="true" aria-label="Product image">
            <button class="image-modal-close" id="imageModalClose" type="button" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            <div class="image-modal-stage">
                <div class="image-modal-frame">
                    <img id="imageModalImg" class="image-modal-img" src="${PLACEHOLDER}" alt="">
                </div>
            </div>
            <div class="image-modal-info">
                <div class="image-modal-name" id="imageModalName"></div>
                <div class="image-modal-desc" id="imageModalDesc"></div>
                <div class="image-modal-price" id="imageModalPrice"></div>
            </div>
        </div>`;
    document.body.appendChild(modal);
    hydrateIcons(modal);
    modal.addEventListener('click', event => { if (event.target === modal) closeImageModal(); });
    document.getElementById('imageModalClose').addEventListener('click', closeImageModal);
}

function updateImageModalCopy() {
    if (!activeImageProductId) return;
    const product = products.find(item => item.id === activeImageProductId);
    if (!product) return;
    const nameEl = document.getElementById('imageModalName');
    const descEl = document.getElementById('imageModalDesc');
    const priceEl = document.getElementById('imageModalPrice');
    const img = document.getElementById('imageModalImg');
    const productName = getProductName(product);
    if (nameEl) nameEl.textContent = productName;
    if (descEl) descEl.textContent = getProductDescription(product);
    if (priceEl) priceEl.textContent = `${LANG[currentLang]?.priceLabel || 'نرخ'}: ${getProductPriceText(product)}`;
    if (img) img.alt = productName;
}
 
function openImageModal(productId) {
    createImageModal();
    const product = products.find(item => item.id === productId);
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    if (!product || !modal || !img) return;

    activeImageProductId = productId;
    trackProductPopularity(productId);
    updateImageModalCopy();
    img.src = PLACEHOLDER;
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    lockBodyScroll();
    requestAnimationFrame(() => modal.classList.add('is-open'));

    modal.classList.remove('has-image');
    img.onload = () => {
        if (activeImageProductId !== productId) return;
        modal.classList.add('has-image');
        img.onload = null;
    };
    img.onerror = () => {
        if (activeImageProductId !== productId) return;
        modal.classList.add('has-image');
        img.onerror = null;
    };
    img.src = product.image;
}
 
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    if (!modal || !img || !modal.classList.contains('is-visible')) return;
    modal.classList.remove('is-open', 'has-image');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
        if (!modal.classList.contains('is-open')) {
            modal.classList.remove('is-visible');
            img.onload = null;
            img.onerror = null;
            img.src = PLACEHOLDER;
            unlockBodyScroll();
            activeImageProductId = null;
        }
    }, 220);
}
 
function updateOfflineBanner() {
    const banner = document.getElementById('offlineBanner');
    const text = document.getElementById('offlineBannerText');
    if (!banner || !text) return;
    ensureOfflineRetryButton();
    text.textContent = LANG[currentLang]?.offlineBanner || text.textContent;
    banner.classList.toggle('visible', isOffline);
    banner.setAttribute('aria-hidden', String(!isOffline));
}

function getCurrentViewState() {
    const query = currentSearchQuery.trim();
    if (isGlobalSearch && query) {
        return {
            mode: 'search',
            title: `<i class="fas fa-search"></i> ${escapeHtml(LANG[currentLang]?.searchResults || 'ئەنجامی گەڕان')}: "${escapeHtml(query)}"`,
            items: findProductsByQuery(query)
        };
    }

    if (showingWishlist) {
        return {
            mode: 'wishlist',
            title: `<i class="fas fa-heart" style="color:#f43f5e"></i> ${escapeHtml(LANG[currentLang]?.wishlistTitle || 'دڵخوازەکان')}`,
            items: products.filter(product => wishlist.includes(product.id))
        };
    }

    const category = categories[currentCategory] || { name: currentCategory, icon: 'fa-box' };
    return {
        mode: 'category',
        title: `<i class="fas ${category.icon}"></i> ${escapeHtml(LANG[currentLang]?.cats?.[currentCategory] || category.name)}`,
        items: products.filter(product => product.category === currentCategory)
    };
}

function buildCategorySuggestionButtons() {
    return Object.keys(categories)
        .filter(category => category !== currentCategory && categories[category].count > 0)
        .map(category => `
            <button onclick="showCategory('${category}', getCategoryCard('${category}'))" style="padding:8px 16px;background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.3);border-radius:50px;color:#f97316;font-family:inherit;font-size:13px;cursor:pointer;">
                <i class="fas ${categories[category].icon}"></i> ${escapeHtml(LANG[currentLang]?.cats?.[category] || categories[category].name)}
            </button>
        `).join('');
}

function renderEmptyState(viewState) {
    const emptyState = document.getElementById('emptyState');
    const grid = document.getElementById('productsGrid');
    const paginationWrap = document.getElementById('paginationWrap');
    const t = LANG[currentLang];
    if (grid) grid.innerHTML = '';
    if (paginationWrap) {
        paginationWrap.style.display = 'none';
        paginationWrap.innerHTML = '';
    }
    if (!emptyState) return;

    if (viewState.mode === 'wishlist') {
        emptyState.innerHTML = `
            <div class="empty-icon"><i class="fas fa-heart"></i></div>
            <h3>${escapeHtml(t?.wishlistEmpty || 'هیچ کاڵایەکی دڵخواز نیە')}</h3>
            <p>${escapeHtml(t?.wishlistEmptySub || 'دوگمەی ❤️ لە سەر کاڵاکان بکە')}</p>
        `;
    } else if (lastProductLoadSource === 'unavailable' && isOffline) {
        emptyState.innerHTML = `
            <div class="empty-icon"><i class="fas fa-wifi-slash"></i></div>
            <h3>${escapeHtml(t?.offlineUnavailableTitle || 'ئۆفلاینیت و بەرهەمێکی هەڵگیراو نیە')}</h3>
            <p>${escapeHtml(t?.offlineUnavailableSub || 'کاتێک ئینتەرنێت هەبوو سەردانی ماڵپەڕەکە بکە بۆ هەڵگرتنی بەرهەمەکان.')}</p>
        `;
    } else if (lastProductLoadSource === 'unavailable') {
        emptyState.innerHTML = `
            <div class="empty-icon"><i class="fas fa-cloud-bolt"></i></div>
            <h3>${escapeHtml(t?.loadFailedTitle || 'نەتوانرا بەرهەمەکان بار بکرێن')}</h3>
            <p>${escapeHtml(t?.loadFailedSub || 'تکایە دواتر هەوڵ بدەوە.')}</p>
        `;
    } else {
        emptyState.innerHTML = `
            <div class="empty-icon"><i class="fas fa-box-open"></i></div>
            <h3>${currentLang === 'en' ? 'No products found' : 'هیچ کاڵایەک نەدۆزرایەوە'}</h3>
            <p style="margin-bottom:14px">${escapeHtml(t?.noResultsSug || 'بەشی دیکەش ببینە؟')}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
                ${buildCategorySuggestionButtons()}
            </div>
        `;
    }

    emptyState.style.display = 'block';
    hydrateIcons(emptyState);
}

function renderPagination(totalItems) {
    const paginationWrap = document.getElementById('paginationWrap');
    if (!paginationWrap) return;
    const ipp = getItemsPerPage();
    if (totalItems <= ipp) {
        paginationWrap.style.display = 'none';
        paginationWrap.innerHTML = '';
        return;
    }

    const totalPages = Math.max(1, Math.ceil(totalItems / ipp));
    currentPage = Math.min(Math.max(currentPage, 1), totalPages);
    paginationWrap.style.display = 'flex';
    paginationWrap.innerHTML = `
        <div class="pagination">
            <button class="pagination-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>${escapeHtml(LANG[currentLang]?.paginationPrev || 'Previous')}</button>
            <div class="pagination-status">
                ${escapeHtml((LANG[currentLang]?.paginationStatus || ((current, total) => `${current} / ${total}`))(currentPage, totalPages))}
                <small>${escapeHtml(LANG[currentLang]?.paginationHint || 'Page')}</small>
            </div>
            <button class="pagination-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>${escapeHtml(LANG[currentLang]?.paginationNext || 'Next')}</button>
        </div>
    `;
}

function scrollProductsIntoView() {
    const section = document.querySelector('.products-section');
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(top, 0), behavior: getPreferredScrollBehavior() });
}

function goToPage(page) {
    const nextPage = Math.max(1, page);
    if (nextPage === currentPage) return;
    currentPage = nextPage;
    renderCurrentView({ resetPage: false });
    scrollProductsIntoView();
}

async function handleConnectionChange() {
    isOffline = !navigator.onLine;
    updateOfflineBanner();
    if (!isOffline && lastProductLoadSource === 'unavailable') {
        await loadProducts({ showSkeleton: products.length === 0 });
        updateCategoryCounts();
        updateHeroStats();
    }
    renderCurrentView({ resetPage: false });
}
 
// ==========================================
// دەستپێکردن
// ==========================================
document.addEventListener('DOMContentLoaded', async function () {
    try {
        initLazyObserver();
        ensureOfflineRetryButton();
        prepareOrderInputs();
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.addEventListener('click', event => {
                if (event.target === successModal) closeSuccessModal();
            });
        }
        loadWishlist();
        initScrollEffects();
        syncSearchInputs();
        loadCart();
        loadTheme();
        updateOfflineBanner();
        const cachedProducts = readStoredProducts();
        if (cachedProducts.length > 0) {
            products = cachedProducts;
            buildSearchIndex(products);
            markLoadedCategories(cachedProducts.map(product => product.category));
            lastProductLoadSource = 'cache';
        }
        updateCategoryCounts();
        updateHeroStats();
        updateWishlistFilterBtn();
        setLang(currentLang, { skipRender: true });
        if (cachedProducts.length > 0) {
            // Reuse the cached grid immediately instead of rendering an empty state first.
            renderCurrentView({ resetPage: false });
        }

        const refreshProducts = async (showSkeleton) => {
            const loaded = await loadProducts({ showSkeleton });
            updateCategoryCounts();
            updateHeroStats();
            renderCurrentView({ resetPage: false });
            return loaded;
        };

        if (cachedProducts.length === 0) {
            await refreshProducts(true);
        } else if (isMobileViewport()) {
            scheduleNonCriticalTask(() => {
                refreshProducts(false).catch(error => console.warn('Deferred product refresh failed.', error));
            }, 1800);
        } else {
            await refreshProducts(false);
        }

        if (!shouldUseLiteMode() && !isMobileViewport()) initCartReminder();
        syncWishlistAcrossDevices();
        trackPageView();
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
    } catch (e) { console.error('Init error:', e); }
});
 
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeImageModal();
        const s = document.getElementById('cartSidebar');
        if (s?.classList.contains('active')) toggleCart();
        closeSuccessModal();
    }
});
 
function syncSearchInputs() {
    const desktop = document.getElementById('searchInput');
    const mobile = document.getElementById('searchInputMobile');
    let debounceTimer = null;
    let requestId = 0;
    // Debounce search input and finish loading any missing category files before global search renders.
    function handleSearch(val) {
        if (desktop && desktop.value !== val) desktop.value = val;
        if (mobile && mobile.value !== val) mobile.value = val;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const pendingId = ++requestId;
            const nextQuery = val.trim();
            currentSearchQuery = nextQuery;
            isGlobalSearch = currentSearchQuery.length > 0;
            if (!isGlobalSearch) {
                searchCatalogLoadState = 'idle';
                renderCurrentView({ resetPage: true });
                return;
            }

            showingWishlist = false;
            updateWishlistFilterBtn();
            searchCatalogLoadState = hasUnloadedCategories() ? 'idle' : 'done';
            renderCurrentView({ resetPage: true });

            const needsMoreCategories = hasUnloadedCategories();
            if (!needsMoreCategories || nextQuery.length < 2) return;

            const completeSearch = async () => {
                searchCatalogLoadState = 'loading';
                await ensureAllProductsLoaded();
                updateCategoryCounts();
                updateHeroStats();
                searchCatalogLoadState = hasUnloadedCategories() ? 'idle' : 'done';
                if (pendingId !== requestId || currentSearchQuery !== nextQuery) return;
                renderCurrentView({ resetPage: true });
            };

            if (isMobileViewport()) {
                return;
            }

            completeSearch().catch(error => console.warn('Search catalog load failed.', error));
        }, 250);
    }
    if (desktop) desktop.addEventListener('input', () => handleSearch(desktop.value));
    if (mobile) mobile.addEventListener('input', () => handleSearch(mobile.value));
}
 
function updateCategoryTitle() {
    const titleEl = document.getElementById('categoryTitle');
    if (titleEl) titleEl.innerHTML = getCurrentViewState().title;
}
 
function updateCategoryCounts() {
    const countMap = {};
    products.forEach(product => { countMap[product.category] = (countMap[product.category] || 0) + 1; });
    Object.keys(categories).forEach(cat => { categories[cat].count = countMap[cat] || 0; });
    document.querySelectorAll('.category-card').forEach(card => {
        const categoryKey = card.dataset.category;
        if (categoryKey && categories[categoryKey]) {
            const el = card.querySelector('.category-count');
            if (el) el.textContent = formatItemCount(categories[categoryKey].count || 0);
        }
    });
}
 
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    let scheduled = false;
    const updateScrollState = () => {
        scheduled = false;
        const y = window.scrollY;
        navbar?.classList.toggle('scrolled', y > 50);
        scrollTop?.classList.toggle('visible', y > 300);
    };
    updateScrollState();
    window.addEventListener('scroll', () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(updateScrollState);
    }, { passive: true });
}
 
function scrollToTop() { window.scrollTo({ top: 0, behavior: getPreferredScrollBehavior() }); }
 
// ==========================================
// ★ Dark / Light Mode
// ==========================================
function syncThemeMeta() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', document.body.classList.contains('light-mode') ? '#fff4ec' : '#f97316');
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('shopTheme', isLight ? 'light' : 'dark');
    const icon = document.querySelector('.theme-btn i');
    if (icon) {
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        hydrateIcons(icon.parentElement || document);
    }
    syncThemeMeta();
}

function loadTheme() {
    const saved = localStorage.getItem('shopTheme');
    const isLight = saved === 'light';
    document.body.classList.toggle('light-mode', isLight);
    const icon = document.querySelector('.theme-btn i');
    if (icon) {
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        hydrateIcons(icon.parentElement || document);
    }
    syncThemeMeta();
}
 
async function showCategory(category, element) {
    currentCategory = category;
    currentPage = 1;
    currentSearchQuery = '';
    isGlobalSearch = false;
    searchCatalogLoadState = 'idle';
    showingWishlist = false;
    updateWishlistFilterBtn();
    document.getElementById('searchInput') && (document.getElementById('searchInput').value = '');
    document.getElementById('searchInputMobile') && (document.getElementById('searchInputMobile').value = '');
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    const targetCard = element || getCategoryCard(category);
    if (targetCard) targetCard.classList.add('active');
    // Lazy-load the category file on first visit, then reuse the cached results.
    if (!loadedCategories.has(category)) {
        showProductSkeletons();
        await ensureCategoryLoaded(category, { showSkeleton: false });
        updateCategoryCounts();
        updateHeroStats();
    }
    renderCurrentView({ resetPage: true });
    preloadRemainingCategories();
}
 
// ==========================================
// ★ کارتی کاڵا — با data-lazy-src ★
// ==========================================
function buildProductCard(product, index) {
    const priceText = getProductPriceText(product);
    const isWishlisted = wishlist.includes(product.id);
    const productName = getProductName(product);
    const productDescription = getProductDescription(product);
    const productIdArg = encodeInlineArg(product.id);
    const imagePriority = index < getPriorityImageCount() ? 'high' : 'low';
    const showImageOverlay = shouldAnimateUI();
    const entryDelay = shouldAnimateUI() ? ` style="animation-delay:${Math.min(index, 15) * 0.04}s"` : '';
    return `<div class="product-card"${entryDelay}>
        <div class="product-image" onclick="openImageModal(decodeURIComponent('${productIdArg}'))">
            ${buildProductPicture(product, productName, imagePriority)}
            ${showImageOverlay ? `<div class="product-overlay">
                <div style="color:white;font-size:28px;"><i class="fas fa-magnifying-glass-plus"></i></div>
            </div>` : ''}
            <button class="wishlist-btn${isWishlisted ? ' active' : ''}" onclick="event.stopPropagation();toggleWishlist(decodeURIComponent('${productIdArg}'),this)" title="${escapeHtml(LANG[currentLang]?.wishlistTitle || 'دڵخواز')}">
                <i class="fa${isWishlisted ? 's' : 'r'} fa-heart"></i>
            </button>
        </div>
        <div class="product-content">
            <h3 class="product-name">${escapeHtml(productName)}</h3>
            <p class="product-desc">${escapeHtml(productDescription)}</p>
            <div class="product-footer">
                <div class="product-price">
                    <span class="price-label">${escapeHtml(LANG[currentLang]?.priceLabel || 'نرخ')}</span>
                    <span class="price-value">${escapeHtml(priceText)}</span>
                </div>
                <button class="add-btn" onclick="addToCart(decodeURIComponent('${productIdArg}'))">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    </div>`;
}
 
function buildSearchResultsMarkup(productsPage) {
    let html = buildSearchLoadNoticeMarkup();
    const grouped = new Map();
    productsPage.forEach(product => {
        if (!grouped.has(product.category)) grouped.set(product.category, []);
        grouped.get(product.category).push(product);
    });

    let index = 0;
    grouped.forEach((groupProducts, categoryKey) => {
        const category = categories[categoryKey] || { name: categoryKey, icon: 'fa-box' };
        html += `
            <div class="search-group">
                <div class="search-group-header">
                    <div class="search-group-title">
                        <span class="search-group-icon"><i class="fas ${category.icon}"></i></span>
                        <span class="search-group-name">${escapeHtml(LANG[currentLang]?.cats?.[categoryKey] || category.name)}</span>
                    </div>
                    <span class="search-group-count">${escapeHtml(formatItemCount(groupProducts.length))}</span>
                </div>
            </div>
        `;
        html += groupProducts.map(product => buildProductCard(product, index++)).join('');
    });
    return html;
}

function renderCurrentView({ resetPage = false } = {}) {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const countEl = document.getElementById('productsCount');
    const titleEl = document.getElementById('categoryTitle');
    if (!grid) return;
    if (resetPage) currentPage = 1;

    if (isLoadingProducts && products.length === 0) {
        showProductSkeletons();
        return;
    }

    const viewState = getCurrentViewState();
    const filtered = viewState.items;
    const totalPages = Math.max(1, Math.ceil(filtered.length / getItemsPerPage()));
    currentPage = Math.min(Math.max(currentPage, 1), totalPages);

    if (titleEl) titleEl.innerHTML = viewState.title;
    if (countEl) countEl.textContent = formatItemCount(filtered.length);

    if (filtered.length === 0 && viewState.mode === 'search' && shouldShowSearchLoadNotice()) {
        if (emptyState) emptyState.style.display = 'none';
        grid.innerHTML = buildSearchLoadNoticeMarkup();
        hydrateIcons(titleEl || document);
        hydrateIcons(grid);
        renderPagination(0);
        return;
    }

    if (filtered.length === 0) {
        hydrateIcons(titleEl || document);
        renderEmptyState(viewState);
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const visible = paginate(filtered);
    grid.innerHTML = viewState.mode === 'search'
        ? buildSearchResultsMarkup(visible)
        : visible.map((p, i) => buildProductCard(p, i)).join('');

    hydrateIcons(titleEl || document);
    hydrateIcons(grid);
    observeNewImages(grid);
    renderPagination(filtered.length);
}

function loadMoreProducts() {
    goToPage(currentPage + 1);
}
 
function renderGlobalSearch(query) {
    currentSearchQuery = query.trim();
    isGlobalSearch = currentSearchQuery.length > 0;
    renderCurrentView({ resetPage: true });
}
 
// ==========================================
// یادەرکردنی سەبەتە
// ==========================================
function initCartReminder() {
    if (shouldUseLiteMode() || isMobileViewport()) return;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { if (cart.length > 0) localStorage.setItem('cartReminderPending', '1'); }
        else { const p = localStorage.getItem('cartReminderPending'); if (p && cart.length > 0) { localStorage.removeItem('cartReminderPending'); setTimeout(() => showCartReminder(), 1500); } }
    });
    window.addEventListener('beforeunload', () => { if (cart.length > 0) localStorage.setItem('cartReminderPending', '1'); });
    setTimeout(() => { const p = localStorage.getItem('cartReminderPending'); if (p && cart.length > 0) { localStorage.removeItem('cartReminderPending'); showCartReminder(); } }, 2000);
}
 
function showCartReminder() {
    const n = cart.reduce((s, i) => s + i.quantity, 0);
    if (n === 0) return;
    const ex = document.getElementById('cartReminder');
    if (ex) ex.remove();
    const rem = document.createElement('div');
    rem.id = 'cartReminder';
    rem.style.cssText = 'position:fixed;bottom:80px;left:16px;right:16px;z-index:2500;background:linear-gradient(135deg,rgba(249,115,22,0.95),rgba(244,63,94,0.95));backdrop-filter:blur(20px);border-radius:20px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 8px 32px rgba(249,115,22,0.4);animation:reminderSlideUp 0.4s ease forwards;border:1px solid rgba(255,255,255,0.2);';
    const t = LANG[currentLang];
    const style = document.createElement('style');
    style.textContent = '@keyframes reminderSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';

    const content = document.createElement('div');
    content.style.cssText = 'display:flex;align-items:center;gap:12px;flex:1;';

    const icon = document.createElement('div');
    icon.style.cssText = 'width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;';
    icon.textContent = '🛒';

    const textWrap = document.createElement('div');
    const title = document.createElement('div');
    title.style.cssText = 'color:white;font-weight:700;font-size:14px;';
    title.textContent = `${n} ${t?.reminderTitle || 'کاڵات لە سەبەتەدایە!'}`;
    const sub = document.createElement('div');
    sub.style.cssText = 'color:rgba(255,255,255,0.8);font-size:12px;margin-top:2px;';
    sub.textContent = t?.reminderSub || 'داواکاریەکەت تەواو بکە';
    textWrap.append(title, sub);
    content.append(icon, textWrap);

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:8px;flex-shrink:0;';

    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.style.cssText = 'padding:8px 16px;background:white;color:#f97316;border:none;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;';
    viewBtn.textContent = t?.reminderView || 'بینین';
    viewBtn.addEventListener('click', () => {
        toggleCart();
        rem.remove();
    });

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.style.cssText = 'width:34px;height:34px;background:rgba(255,255,255,0.15);border:none;border-radius:50%;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
    closeBtn.setAttribute('aria-label', LANG[currentLang]?.close || 'Close');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => rem.remove());

    actions.append(viewBtn, closeBtn);
    rem.append(style, content, actions);
    document.body.appendChild(rem);
    setTimeout(() => { if (rem.parentNode) { rem.style.opacity = '0'; rem.style.transform = 'translateY(20px)'; rem.style.transition = 'all 0.3s ease'; setTimeout(() => rem.remove(), 300); } }, 12000);
}
 
// ==========================================
// سەبەتە
// ==========================================
function loadCart() {
    try { cart = JSON.parse(localStorage.getItem('myShopCart')) || []; } catch (e) { cart = []; }
    updateCartUI();
}
function saveCart() { try { localStorage.setItem('myShopCart', JSON.stringify(cart)); } catch (e) { } }
 
// Store a cart item locally, then refresh the cart sidebar and button badge.
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.quantity++;
    else {
        cart.push({
            id: product.id,
            name: product.name,
            name_en: product.name_en || '',
            price: product.price,
            quantity: 1
        });
    }
    saveCart(); updateCartUI();
    showToast(getProductName(product) + (LANG[currentLang]?.addedToCart || ' زیادکرا ✓'), 'success');
    animateCart();
}
 
function updateCartUI() {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const g = id => document.getElementById(id);
    if (g('cartCount')) g('cartCount').textContent = totalItems;
    if (g('cartItemsCount')) g('cartItemsCount').textContent = formatItemCount(totalItems);
    if (g('totalItems')) g('totalItems').textContent = totalItems;
    if (g('totalPrice')) g('totalPrice').textContent = totalPrice.toLocaleString() + ' IQD';
    const cartItemsEl = g('cartItems');
    if (!cartItemsEl) return;
    if (cart.length === 0) { 
        cartItemsEl.innerHTML = `<div class="cart-empty"><div class="empty-cart-icon"><i class="fas fa-shopping-cart"></i></div><h4>${LANG[currentLang]?.cartEmpty || 'سەبەتە بەتاڵە'}</h4><p>${LANG[currentLang]?.cartEmptySub || 'کاڵای دڵخوازت زیاد بکە'}</p></div>`; 
        hydrateIcons(cartItemsEl);
        updateCartButtonAccessibility();
        return; 
    }
    cartItemsEl.innerHTML = cart.map((item, i) => `<div class="cart-item"><div class="cart-item-header"><span class="cart-item-name">${escapeHtml(getCartItemName(item))}</span><button class="cart-item-remove" onclick="removeFromCart(${i})"><i class="fas fa-trash"></i></button></div><div class="cart-item-controls"><div class="qty-controls"><button class="qty-btn" onclick="decreaseQty(${i})">-</button><span class="cart-item-qty">${item.quantity}</span><button class="qty-btn" onclick="increaseQty(${i})">+</button></div><span class="cart-item-price">${item.price > 0 ? (item.price * item.quantity).toLocaleString() + ' IQD' : (LANG[currentLang]?.priceAsk || 'پرسیار بکە')}</span></div></div>`).join('');
    hydrateIcons(cartItemsEl);
    updateCartButtonAccessibility();
}
 
function increaseQty(i) { cart[i].quantity++; saveCart(); updateCartUI(); }
function decreaseQty(i) { if (cart[i].quantity > 1) cart[i].quantity--; else cart.splice(i, 1); saveCart(); updateCartUI(); }
function removeFromCart(i) { cart.splice(i, 1); saveCart(); updateCartUI(); showToast(LANG[currentLang]?.removed || 'کاڵا لابرا', 'info'); }

function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (!sidebar || !overlay || sidebar.classList.contains('active')) return;
    sidebar.classList.add('active');
    overlay.classList.add('active');
    lockBodyScroll();
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (!sidebar || !overlay || !sidebar.classList.contains('active')) return;
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    unlockBodyScroll();
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar) return;
    if (sidebar.classList.contains('active')) closeCart();
    else openCart();
}

function showSuccessModal() {
    updateSuccessModalCopy();
    const m = document.getElementById('successModal');
    if (m && !m.classList.contains('active')) { m.classList.add('active'); lockBodyScroll(); }
}
function closeSuccessModal() {
    const m = document.getElementById('successModal');
    if (m && m.classList.contains('active')) { m.classList.remove('active'); unlockBodyScroll(); }
}
 
// Build the WhatsApp order message only after required customer data passes validation.
function sendWhatsApp() {
    if (cart.length === 0) { showToast(LANG[currentLang]?.cartEmptyErr || 'سەبەتە بەتاڵە!', 'error'); return; }
    const name = (document.getElementById('customerName')?.value || '').trim();
    const phone = (document.getElementById('customerPhone')?.value || '').trim();
    const normalizedPhone = phone.replace(/\D/g, '');
    if (!name || !phone) { showToast(LANG[currentLang]?.fillInfo || 'ناو و ژمارە بنووسە', 'error'); return; }
    if (!validatePhone(normalizedPhone)) { showToast(LANG[currentLang]?.invalidPhone || 'Phone number is invalid', 'error'); return; }
    const orderId = generateOrderId();
    const wt = LANG[currentLang];
    let msg = `🛒 *${wt?.waTitle || 'داواکاری نوێ'}* | 🔖 ${orderId}\n━━━━━━━━━━━━━━━\n👤 *${wt?.waName || 'ناو'}:* ${name}\n📱 *${wt?.waPhone || 'تەلەفۆن'}:* ${normalizedPhone}\n━━━━━━━━━━━━━━━\n📦 *${wt?.waItems || 'کاڵاکان'}:*\n━━━━━━━━━━━━━━━\n`;
    cart.forEach((item, i) => {
        const itemName = getCartItemName(item);
        msg += item.price > 0
            ? `${i + 1}. ${itemName}\n   ${item.quantity} × ${item.price.toLocaleString()} = ${(item.price * item.quantity).toLocaleString()} IQD\n`
            : `${i + 1}. ${itemName} × ${item.quantity}\n`;
    });
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    try {
        localStorage.setItem(orderId, JSON.stringify({
            id: orderId,
            name,
            phone: normalizedPhone,
            total,
            createdAt: new Date().toISOString(),
            items: cart.map(item => ({
                id: item.id,
                name: getCartItemName(item),
                quantity: item.quantity,
                price: item.price
            }))
        }));
    } catch (error) {
        console.warn('Unable to persist local order summary.', error);
    }
    msg += `━━━━━━━━━━━━━━━\n${total > 0 ? `💰 *${wt?.waTotal || 'کۆی گشتی'}:* ${total.toLocaleString()} IQD\n` : ''}━━━━━━━━━━━━━━━\n⏰ ${new Date().toLocaleString('ar-IQ')}\n✅ تەنیا داواکاریەکەم بنێرە`;
    window.open('https://wa.me/9647518959614?text=' + encodeURIComponent(msg), '_blank');
    const nameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    cart = []; saveCart(); updateCartUI(); closeCart();
    setTimeout(showSuccessModal, 400);
}
 
// ==========================================
// ★ Analytics — ژمارەی سەردانکەر
// ==========================================
// Keep the old function name for compatibility, but delegate the real work to analytics.js.
function trackPageView() {
    try { return window.trackView?.() || 0; } catch (e) { return 0; }
}
function getAnalytics() {
    const total = Number(window.getTrackedViews?.() || 0);
    return { total, today: total };
}
 
// ==========================================
// ★ Wishlist — دڵخوازەکان
// ==========================================
function loadWishlist() {
    try { wishlist = JSON.parse(localStorage.getItem('kogayWishlist')) || []; } catch(e) { wishlist = []; }
}
function saveWishlist() {
    try { localStorage.setItem('kogayWishlist', JSON.stringify(wishlist)); } catch(e) {}
}
function toggleWishlist(productId, btn) {
    const idx = wishlist.indexOf(productId);
    const t = LANG[currentLang];
    if (idx > -1) {
        wishlist.splice(idx, 1);
        if (btn) {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
            hydrateIcons(btn);
        }
        showToast(t?.wishlistRemoved || 'لە دڵخوازەکان لابرا', 'info');
        if (showingWishlist) renderCurrentView({ resetPage: false });
    } else {
        wishlist.push(productId);
        if (btn) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            hydrateIcons(btn);
        }
        showToast(t?.wishlistAdded || 'زیادکرا بۆ دڵخوازەکان ❤️', 'success');
    }
    saveWishlist();
    updateWishlistFilterBtn();
}
async function toggleWishlistFilter() {
    showingWishlist = !showingWishlist;
    currentPage = 1;
    currentSearchQuery = '';
    isGlobalSearch = false;
    searchCatalogLoadState = 'idle';
    const si = document.getElementById('searchInput');
    const sm = document.getElementById('searchInputMobile');
    if (si) si.value = '';
    if (sm) sm.value = '';
    updateWishlistFilterBtn();
    renderCurrentView({ resetPage: true });

    if (showingWishlist && Object.keys(categories).some(category => !loadedCategories.has(category))) {
        const loadWishlistProducts = async () => {
            await ensureAllProductsLoaded();
            updateCategoryCounts();
            updateHeroStats();
            if (showingWishlist) renderCurrentView({ resetPage: false });
        };

        if (isMobileViewport()) {
            scheduleNonCriticalTask(() => {
                loadWishlistProducts().catch(error => console.warn('Deferred wishlist load failed.', error));
            }, 1200);
            return;
        }

        await loadWishlistProducts();
    }
}
function updateWishlistFilterBtn() {
    const btn = document.getElementById('wishlistFilterBtn');
    if (!btn) return;
    btn.classList.toggle('active', showingWishlist);
    btn.title = LANG[currentLang]?.wishlistTitle || btn.title;
    btn.setAttribute('aria-pressed', String(showingWishlist));
    const count = wishlist.length;
    btn.innerHTML = count > 0
        ? `<i class="fas fa-heart"></i><span class="wishlist-filter-count">${count}</span>`
        : `<i class="fa${showingWishlist?'s':'r'} fa-heart"></i>`;
    hydrateIcons(btn);
}

// ==========================================
// ★ PWA Install Prompt
// ==========================================
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (!isStandaloneMode() && !isInstallDismissed() && !shouldUseLiteMode()) {
        setTimeout(showInstallBanner, 3000);
    }
});
window.addEventListener('appinstalled', () => {
    dismissInstall();
    deferredInstallPrompt = null;
    localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now()));
});
function showInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (!banner || !deferredInstallPrompt || isStandaloneMode() || isInstallDismissed() || shouldUseLiteMode()) return;
    updateInstallBannerCopy();
    banner.style.display = 'block';
    requestAnimationFrame(() => banner.classList.add('visible'));
}
function triggerInstall() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(() => { dismissInstall(); deferredInstallPrompt = null; });
}
function dismissInstall() {
    const banner = document.getElementById('installBanner');
    if (banner) { banner.classList.remove('visible'); setTimeout(() => banner.style.display='none', 400); }
    localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now()));
}

// ==========================================
// ★ Hero Stats — ئۆتۆماتیک لە داتا
// ==========================================
function updateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const total = products.length;
    const activeCats = Object.values(categories).filter(c => c.count > 0).length;
    if (statNumbers[0]) statNumbers[0].textContent = total > 0 ? total + '+' : '400+';
    if (statNumbers[1]) statNumbers[1].textContent = activeCats > 0 ? activeCats : '6';
    // statNumbers[2] = 24/7 — نایگۆڕێت
}

// ==========================================
// ★ Order ID — ژمارەی تایبەت بۆ هەر داواکاری
// ==========================================
function generateOrderId() {
    const now = Date.now();
    const rand = Math.floor(Math.random() * 900 + 100);
    return `ORD-${now}-${rand}`;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const icons = { success: 'fa-check', error: 'fa-times', info: 'fa-info' };
    container.querySelectorAll('.toast').forEach(node => node.remove());
    const toast = document.createElement('div');
    toast.className = shouldAnimateUI() ? 'toast' : 'toast toast-static';
    toast.innerHTML = `<div class="toast-icon"><i class="fas ${icons[type] || 'fa-check'}"></i></div><span class="toast-message"></span>`;
    const messageEl = toast.querySelector('.toast-message');
    if (messageEl) messageEl.textContent = message;
    container.appendChild(toast);
    hydrateIcons(toast);
    if (!shouldAnimateUI()) {
        setTimeout(() => toast.remove(), 1800);
        return;
    }
    setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 400); }, 2200);
}
