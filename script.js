// ==========================================
// کۆگای ڕاستی - v7 (True Lazy Loading)
// ==========================================
 
(function hideLoaderSafe() {
    function doHide() {
        var loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(function () { loader.style.display = 'none'; }, 400);
        }
    }
    setTimeout(doHide, 800); /* ★ 3000→800 */
    window.addEventListener('load', function () { setTimeout(doHide, 500); });
})();
 
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
        cartTitle: 'سەبەتە',
        totalItems: 'کۆی کاڵاکان:',
        totalPrice: 'کۆی گشتی:',
        footerText: '© 2025 فرۆشگای ئێمە — هەموو مافەکان پارێزراون',
        statProducts: 'بەرهەم',
        statSections: 'بەش',
        statService: 'خزمەت',
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
        cartTitle: 'Cart',
        totalItems: 'Total items:',
        totalPrice: 'Grand total:',
        footerText: '© 2025 Our Store — All rights reserved',
        statProducts: 'Products',
        statSections: 'Sections',
        statService: 'Service',
        cats: { cake:'Cake', gaz:'Biscuits', drink:'Drinks', chips:'Chips', baby:'Kids', family:'Family' },
    }
};
let currentLang = localStorage.getItem('shopLang') || 'ku';
 
function setLang(l) {
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
    const secTitle = document.querySelector('.categories-section .section-title');
    if (secTitle) secTitle.innerHTML = `<i class="fas fa-grid-2"></i> ${t.sections}`;
    // Category names
    document.querySelectorAll('.category-card').forEach(card => {
        const m = (card.getAttribute('onclick') || '').match(/showCategory\('(\w+)'/);
        if (m && t.cats[m[1]]) {
            const nm = card.querySelector('.category-name');
            if (nm) nm.textContent = t.cats[m[1]];
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
    const ft = document.querySelector('.footer-text'); if (ft) ft.textContent = t.footerText;
    // دوگمەکانی زمان
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === l);
    });
    // نوێکردنەوەی products (بۆ price label)
    if (typeof renderProducts === 'function' && !isGlobalSearch) renderProducts();
    updateCartUI();
}
let isGlobalSearch = false;
 
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
            img.removeAttribute('data-lazy-src');
            const tmp = new Image();
            tmp.onload = () => { img.src = realSrc; img.style.opacity = '1'; };
            tmp.onerror = () => { img.style.opacity = '0.3'; };
            tmp.src = realSrc;
            lazyObserver.unobserve(img);
        });
    }, { rootMargin: '300px 0px', threshold: 0 });
}
 
function observeNewImages() {
    if (!lazyObserver) {
        // Fallback: بار بکە هەموویان
        document.querySelectorAll('img[data-lazy-src]').forEach(img => {
            const src = img.getAttribute('data-lazy-src');
            if (src) { img.src = src; img.removeAttribute('data-lazy-src'); }
        });
        return;
    }
    document.querySelectorAll('img[data-lazy-src]').forEach(img => {
        lazyObserver.observe(img);
    });
}
 
// ==========================================
// بارکردنی کاڵاکان
// ==========================================
async function loadProducts() {
    try {
        const res = await fetch('products.json?v=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            products = Array.isArray(data)
                ? data.filter(p =>
                    !p.hidden &&
                    p.price > 0 &&
                    p.name &&
                    !p.name.match(/^IMG_\d+$/)
                )
                : [];
            return;
        }
    } catch (e) { console.warn('products.json کێشە:', e); }
    products = [];
}
 
// ==========================================
// Image Modal
// ==========================================
function createImageModal() {
    if (document.getElementById('imageModal')) return;
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.93);display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all 0.3s ease;padding:20px;';
    modal.innerHTML = `
        <button id="imageModalClose" style="position:absolute;top:20px;left:20px;width:44px;height:44px;background:rgba(255,255,255,0.1);border:none;border-radius:50%;color:white;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:1;"><i class="fas fa-times"></i></button>
        <img id="imageModalImg" src="${PLACEHOLDER}" alt="" style="max-width:100%;max-height:85vh;border-radius:16px;object-fit:contain;transform:scale(0.8);transition:transform 0.3s ease;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
        <div id="imageModalInfo" style="position:absolute;bottom:30px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);padding:12px 24px;border-radius:50px;color:white;text-align:center;white-space:nowrap;">
            <div style="font-weight:700;font-size:16px;" id="imageModalName"></div>
            <div style="color:#f97316;font-size:14px;margin-top:4px;" id="imageModalPrice"></div>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeImageModal(); });
    document.getElementById('imageModalClose').addEventListener('click', closeImageModal);
}
 
function openImageModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    img.src = PLACEHOLDER;
    img.style.transform = 'scale(0.8)';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    document.body.style.overflow = 'hidden';
    document.getElementById('imageModalName').textContent = product.name + ' — ' + product.description;
    document.getElementById('imageModalPrice').textContent = product.price > 0 ? product.price.toLocaleString() + ' IQD' : 'پرسیار بکە';
    const tmp = new Image();
    tmp.onload = () => { img.src = product.image; setTimeout(() => { img.style.transform = 'scale(1)'; }, 10); };
    tmp.onerror = () => { img.style.transform = 'scale(1)'; };
    tmp.src = product.image;
}
 
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    if (!modal) return;
    img.style.transform = 'scale(0.8)';
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.visibility = 'hidden'; img.src = PLACEHOLDER; document.body.style.overflow = ''; }, 300);
}
 
// ==========================================
// دەستپێکردن
// ==========================================
document.addEventListener('DOMContentLoaded', async function () {
    try {
        initLazyObserver();
        createImageModal();
        await loadProducts();
        createGlobalSearchBtn();
        // initParticles(); ← ★ لابرا — CPU خۆڵ بێت
        initScrollEffects();
        syncSearchInputs();
        loadCart();
        loadTheme(); // ★ theme
        setLang(currentLang); // ★ زمانی ذەخیرەکراو بکەرەوە
        updateCategoryCounts();
        showCategory('cake', document.querySelector('.category-card'));
        initCartReminder();
        trackPageView(); // ★ Analytics
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
    function handleSearch(val) {
        if (desktop) desktop.value = val;
        if (mobile) mobile.value = val;
        if (val.trim().length > 0) { isGlobalSearch = true; renderGlobalSearch(val.trim()); }
        else { isGlobalSearch = false; renderProducts(); updateCategoryTitle(); }
    }
    if (desktop) desktop.addEventListener('input', () => handleSearch(desktop.value));
    if (mobile) mobile.addEventListener('input', () => handleSearch(mobile.value));
}
 
function updateCategoryTitle() {
    const titleEl = document.getElementById('categoryTitle');
    if (titleEl && categories[currentCategory])
        titleEl.innerHTML = `<i class="fas ${categories[currentCategory].icon}"></i> ${categories[currentCategory].name}`;
}
 
function updateCategoryCounts() {
    const countMap = {};
    products.forEach(p => { countMap[p.category] = (countMap[p.category] || 0) + 1; });
    Object.keys(categories).forEach(cat => { categories[cat].count = countMap[cat] || 0; });
    document.querySelectorAll('.category-card').forEach(card => {
        const m = (card.getAttribute('onclick') || '').match(/showCategory\('(\w+)'/);
        if (m && categories[m[1]]) {
            const el = card.querySelector('.category-count');
            if (el) el.textContent = categories[m[1]].count + ' کاڵا';
        }
    });
}
 
 
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);
        scrollTop?.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
}
 
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
 
// ==========================================
// ★ Dark / Light Mode
// ==========================================
function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('shopTheme', isLight ? 'light' : 'dark');
    const icon = document.querySelector('.theme-btn i');
    if (icon) icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
}
function loadTheme() {
    const saved = localStorage.getItem('shopTheme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        const icon = document.querySelector('.theme-btn i');
        if (icon) icon.className = 'fas fa-sun';
    }
}
 
function showCategory(category, element) {
    currentCategory = category;
    isGlobalSearch = false;
    document.getElementById('searchInput') && (document.getElementById('searchInput').value = '');
    document.getElementById('searchInputMobile') && (document.getElementById('searchInputMobile').value = '');
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');
    updateCategoryTitle();
    renderProducts();
}
 
// ==========================================
// ★ کارتی کاڵا — با data-lazy-src ★
// ==========================================
function buildProductCard(product, index) {
    const priceText = product.price > 0 ? product.price.toLocaleString() + ' IQD' : 'پرسیار بکە';
    return `<div class="product-card" style="animation-delay:${Math.min(index, 15) * 0.04}s">
        <div class="product-image" onclick="openImageModal('${product.id}')" style="cursor:zoom-in;">
            <img
                src="${PLACEHOLDER}"
                data-lazy-src="${product.image}"
                alt="${product.name}"
                style="width:100%;height:100%;object-fit:cover;transition:opacity 0.3s,transform 0.4s;opacity:0.6;"
                width="400" height="280"
            >
            <div class="product-overlay">
                <div style="color:white;font-size:28px;"><i class="fas fa-magnifying-glass-plus"></i></div>
            </div>
        </div>
        <div class="product-content">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
                <div class="product-price">
                    <span class="price-label">نرخ</span>
                    <span class="price-value">${priceText}</span>
                </div>
                <button class="add-btn" onclick="addToCart('${product.id}')">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    </div>`;
}
 
function renderProducts() {
    if (isGlobalSearch) return;
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    if (!grid) return;
    const filtered = products.filter(p => p.category === currentCategory);
    const countEl = document.getElementById('productsCount');
    if (countEl) countEl.textContent = filtered.length + ' کاڵا';
    if (filtered.length === 0) { grid.innerHTML = ''; if (emptyState) emptyState.style.display = 'block'; return; }
    if (emptyState) emptyState.style.display = 'none';
    grid.innerHTML = filtered.map((p, i) => buildProductCard(p, i)).join('');
    observeNewImages(); // ★ تەنها دوای render
}
 
function renderGlobalSearch(query) {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const titleEl = document.getElementById('categoryTitle');
    const countEl = document.getElementById('productsCount');
    if (!grid) return;
    const q = query.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    if (titleEl) titleEl.innerHTML = `<i class="fas fa-search"></i> ئەنجامی گەڕان: "${query}"`;
    if (countEl) countEl.textContent = filtered.length + ' کاڵا';
    if (filtered.length === 0) { grid.innerHTML = ''; if (emptyState) emptyState.style.display = 'block'; return; }
    if (emptyState) emptyState.style.display = 'none';
    const grouped = {};
    filtered.forEach(p => { if (!grouped[p.category]) grouped[p.category] = []; grouped[p.category].push(p); });
    let html = '';
    Object.keys(grouped).forEach(cat => {
        const c = categories[cat] || { name: cat, icon: 'fa-box' };
        html += `<div style="grid-column:1/-1;margin-top:12px;"><div style="display:flex;align-items:center;gap:8px;padding:8px 4px;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:8px;"><div style="width:32px;height:32px;background:rgba(249,115,22,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f97316;font-size:14px;"><i class="fas ${c.icon}"></i></div><span style="color:white;font-weight:700;font-size:15px;">${c.name}</span><span style="color:rgba(255,255,255,0.4);font-size:12px;">${grouped[cat].length} کاڵا</span></div></div>`;
        grouped[cat].forEach((p, i) => { html += buildProductCard(p, i); });
    });
    grid.innerHTML = html;
    observeNewImages();
}
 
// ==========================================
// یادەرکردنی سەبەتە
// ==========================================
function initCartReminder() {
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
    rem.innerHTML = `<style>@keyframes reminderSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style><div style="display:flex;align-items:center;gap:12px;flex:1;"><div style="width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🛒</div><div><div style="color:white;font-weight:700;font-size:14px;">${n} کاڵات لە سەبەتەدایە!</div><div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:2px;">داواکاریەکەت تەواو بکە</div></div></div><div style="display:flex;gap:8px;flex-shrink:0;"><button onclick="toggleCart();document.getElementById('cartReminder')?.remove();" style="padding:8px 16px;background:white;color:#f97316;border:none;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;">بینین</button><button onclick="document.getElementById('cartReminder')?.remove();" style="width:34px;height:34px;background:rgba(255,255,255,0.15);border:none;border-radius:50%;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button></div>`;
    document.body.appendChild(rem);
    setTimeout(() => { if (rem.parentNode) { rem.style.opacity = '0'; rem.style.transform = 'translateY(20px)'; rem.style.transition = 'all 0.3s ease'; setTimeout(() => rem.remove(), 300); } }, 12000);
}
 
function createGlobalSearchBtn() {
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn || document.getElementById('globalSearchBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'globalSearchBtn'; btn.className = 'cart-btn';
    btn.style.cssText = 'background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);';
    btn.innerHTML = '<i class="fas fa-search"></i>';
    btn.onclick = () => { const inp = document.getElementById('searchInputMobile') || document.getElementById('searchInput'); if (inp) { inp.focus(); window.scrollTo({ top: 100, behavior: 'smooth' }); } };
    cartBtn.parentNode.insertBefore(btn, cartBtn);
}
 
// ==========================================
// سەبەتە
// ==========================================
function loadCart() {
    try { cart = JSON.parse(localStorage.getItem('myShopCart')) || []; } catch (e) { cart = []; }
    updateCartUI();
}
function saveCart() { try { localStorage.setItem('myShopCart', JSON.stringify(cart)); } catch (e) { } }
 
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.quantity++;
    else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    saveCart(); updateCartUI();
    showToast(product.name + ' زیادکرا ✓', 'success');
    const btn = document.querySelector('.cart-btn');
    if (btn) { btn.style.transform = 'scale(1.15)'; setTimeout(() => btn.style.transform = '', 200); }
}
 
function updateCartUI() {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const g = id => document.getElementById(id);
    if (g('cartCount')) g('cartCount').textContent = totalItems;
    if (g('cartItemsCount')) g('cartItemsCount').textContent = totalItems + ' کاڵا';
    if (g('totalItems')) g('totalItems').textContent = totalItems;
    if (g('totalPrice')) g('totalPrice').textContent = totalPrice.toLocaleString() + ' IQD';
    const cartItemsEl = g('cartItems');
    if (!cartItemsEl) return;
    if (cart.length === 0) { cartItemsEl.innerHTML = '<div class="cart-empty"><div class="empty-cart-icon"><i class="fas fa-shopping-cart"></i></div><h4>سەبەتە بەتاڵە</h4><p>کاڵای دڵخوازت زیاد بکە</p></div>'; return; }
    cartItemsEl.innerHTML = cart.map((item, i) => `<div class="cart-item"><div class="cart-item-header"><span class="cart-item-name">${item.name}</span><button class="cart-item-remove" onclick="removeFromCart(${i})"><i class="fas fa-trash"></i></button></div><div class="cart-item-controls"><div class="qty-controls"><button class="qty-btn" onclick="decreaseQty(${i})">-</button><span class="cart-item-qty">${item.quantity}</span><button class="qty-btn" onclick="increaseQty(${i})">+</button></div><span class="cart-item-price">${item.price > 0 ? (item.price * item.quantity).toLocaleString() + ' IQD' : 'پرسیار بکە'}</span></div></div>`).join('');
}
 
function increaseQty(i) { cart[i].quantity++; saveCart(); updateCartUI(); }
function decreaseQty(i) { if (cart[i].quantity > 1) cart[i].quantity--; else cart.splice(i, 1); saveCart(); updateCartUI(); }
function removeFromCart(i) { cart.splice(i, 1); saveCart(); updateCartUI(); showToast('کاڵا لابرا', 'info'); }
 
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar && overlay) { sidebar.classList.toggle('active'); overlay.classList.toggle('active'); document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : ''; }
}
function showSuccessModal() { const m = document.getElementById('successModal'); if (m) { m.classList.add('active'); document.body.style.overflow = 'hidden'; } }
function closeSuccessModal() { const m = document.getElementById('successModal'); if (m) { m.classList.remove('active'); document.body.style.overflow = ''; } }
 
function sendWhatsApp() {
    if (cart.length === 0) { showToast(LANG[currentLang]?.cartEmptyErr || 'سەبەتە بەتاڵە!', 'error'); return; }
    const name = (document.getElementById('customerName')?.value || '').trim();
    const phone = (document.getElementById('customerPhone')?.value || '').trim();
    if (!name || !phone) { showToast(LANG[currentLang]?.fillInfo || 'ناو و ژمارە بنووسە', 'error'); return; }
    let msg = `🛒 *داواکاری نوێ*\n━━━━━━━━━━━━━━━\n👤 *ناو:* ${name}\n📱 *تەلەفۆن:* ${phone}\n━━━━━━━━━━━━━━━\n📦 *کاڵاکان:*\n━━━━━━━━━━━━━━━\n`;
    cart.forEach((item, i) => { msg += item.price > 0 ? `${i + 1}. ${item.name}\n   ${item.quantity} × ${item.price.toLocaleString()} = ${(item.price * item.quantity).toLocaleString()} IQD\n` : `${i + 1}. ${item.name} × ${item.quantity}\n`; });
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    msg += `━━━━━━━━━━━━━━━\n${total > 0 ? '💰 *کۆی گشتی:* ' + total.toLocaleString() + ' IQD\n' : ''}━━━━━━━━━━━━━━━\n⏰ ${new Date().toLocaleString('ar-IQ')}\n✅ تەنیا داواکاریەکەم بنێرە`;
    window.open('https://wa.me/9647518959614?text=' + encodeURIComponent(msg), '_blank');
    cart = []; saveCart(); updateCartUI(); toggleCart();
    setTimeout(showSuccessModal, 400);
}
 
// ==========================================
// ★ Analytics — ژمارەی سەردانکەر
// ==========================================
function trackPageView() {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const key = 'analytics_' + today;
        const data = JSON.parse(localStorage.getItem(key) || '{"views":0,"date":"' + today + '"}');
        data.views++;
        localStorage.setItem(key, JSON.stringify(data));
        // کۆی گشتی
        const total = parseInt(localStorage.getItem('analytics_total') || '0') + 1;
        localStorage.setItem('analytics_total', total);
    } catch (e) { }
}
function getAnalytics() {
    const total = localStorage.getItem('analytics_total') || 0;
    const today = new Date().toISOString().slice(0, 10);
    const todayData = JSON.parse(localStorage.getItem('analytics_' + today) || '{"views":0}');
    return { total: parseInt(total), today: todayData.views };
}
 
// ==========================================
// ★ Invoice System — پسووڵە
// ==========================================
function generateInvoice(name, phone, orderId) {
    const items = cart.map(i => ({ name: i.name, qty: i.quantity, price: i.price, sub: i.price * i.quantity }));
    const total = items.reduce((s, i) => s + i.sub, 0);
    const invoice = { id: orderId, customer: name, phone, items, total, date: new Date().toLocaleString('ar-IQ') };
    try { localStorage.setItem('invoice_' + orderId, JSON.stringify(invoice)); } catch (e) { }
    return invoice;
}
function printInvoice(orderId) {
    const raw = localStorage.getItem('invoice_' + orderId);
    if (!raw) { showToast('پسووڵە نەدۆزرایەوە', 'error'); return; }
    const inv = JSON.parse(raw);
    const rows = inv.items.map(i =>
        `<tr><td>${i.name}</td><td style="text-align:center">${i.qty}</td><td style="text-align:left">${i.price > 0 ? i.sub.toLocaleString() + ' IQD' : '—'}</td></tr>`
    ).join('');
    const win = window.open('', '_blank', 'width=420,height=600');
    win.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>پسووڵە ${inv.id}</title>
    <style>body{font-family:sans-serif;padding:20px;background:#fff;color:#111}h2{color:#f97316;margin-bottom:4px}.meta{color:#666;font-size:13px;margin-bottom:16px}table{width:100%;border-collapse:collapse}th,td{padding:8px 6px;border-bottom:1px solid #eee;font-size:14px}th{background:#f97316;color:white}.total{font-size:18px;font-weight:bold;color:#f97316;text-align:left;padding-top:12px}@media print{button{display:none}}</style>
    </head><body>
    <h2>🧾 کۆگای ڕاستی</h2>
    <div class="meta"><b>داواکاری:</b> ${inv.id}<br><b>ناو:</b> ${inv.customer}<br><b>تەلەفۆن:</b> ${inv.phone}<br><b>بەروار:</b> ${inv.date}</div>
    <table><thead><tr><th>کاڵا</th><th style="text-align:center">ژمارە</th><th style="text-align:left">نرخ</th></tr></thead>
    <tbody>${rows}</tbody></table>
    ${inv.total > 0 ? `<div class="total">کۆی گشتی: ${inv.total.toLocaleString()} IQD</div>` : ''}
    <br><button onclick="window.print()" style="padding:10px 24px;background:#f97316;color:white;border:none;border-radius:8px;cursor:pointer;font-size:15px">🖨️ پرینت</button>
    </body></html>`);
    win.document.close();
}
 
// ==========================================
// ★ Delivery Tracking — شوێنکەوتنی گەیاندن
// ==========================================
const ORDER_STATUSES = {
    ku: ['داواکاری وەرگیرا ✅', 'ئامادەکردن 🍽️', 'لەسەر ڕێگایە 🚗', 'گەیشت! 🎉'],
    en: ['Order received ✅', 'Preparing 🍽️', 'On the way 🚗', 'Delivered! 🎉']
};
function trackOrder(orderId) {
    if (!orderId) { showToast('ژمارەی داواکاری بنووسە', 'error'); return; }
    orderId = orderId.trim();
    const raw = localStorage.getItem(orderId);
    if (!raw) { showToast('داواکاری نەدۆزرایەوە: ' + orderId, 'error'); return; }
    const order = JSON.parse(raw);
    const statuses = ORDER_STATUSES[currentLang] || ORDER_STATUSES.ku;
    // بۆ demo: status لەسەر بنچینەی کاتی داواکاری
    const minsSince = Math.floor((Date.now() - parseInt(orderId.split('-')[1] || 0)) / 60000);
    const step = minsSince < 5 ? 0 : minsSince < 15 ? 1 : minsSince < 30 ? 2 : 3;
    showTrackingModal(order, statuses, step);
}
function showTrackingModal(order, statuses, step) {
    const ex = document.getElementById('trackingModal');
    if (ex) ex.remove();
    const modal = document.createElement('div');
    modal.id = 'trackingModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:6000;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:20px;';
    const steps = statuses.map((s, i) => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;opacity:${i <= step ? 1 : 0.35}">
            <div style="width:32px;height:32px;border-radius:50%;background:${i <= step ? '#f97316' : 'rgba(255,255,255,0.1)'};display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">${i <= step ? '✓' : (i + 1)}</div>
            <span style="color:${i === step ? 'white' : 'rgba(255,255,255,0.6)'};font-weight:${i === step ? 700 : 400};font-size:14px">${s}</span>
        </div>`).join('');
    modal.innerHTML = `<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:24px;max-width:340px;width:100%">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="color:white;font-size:16px">📦 شوێنکەوتنی داواکاری</h3>
            <button onclick="document.getElementById('trackingModal').remove()" style="background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:30px;height:30px;color:white;cursor:pointer;font-size:16px">✕</button>
        </div>
        <div style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);border-radius:12px;padding:12px;margin-bottom:16px;font-size:13px;color:rgba(255,255,255,0.7)">
            🔖 <b style="color:#f97316">${order.id}</b><br>👤 ${order.name} &nbsp; 📱 ${order.phone}
        </div>
        <div>${steps}</div>
    </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
}
 
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const icons = { success: 'fa-check', error: 'fa-times', info: 'fa-info' };
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<div class="toast-icon"><i class="fas ${icons[type] || 'fa-check'}"></i></div><span class="toast-message">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 400); }, 2500);
}