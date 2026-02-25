// ==========================================
// کۆگای ڕاستی - v5
// products.json لە GitHub دەخوێنێتەوە
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
    setTimeout(doHide, 3000);
    window.addEventListener('load', function () { setTimeout(doHide, 500); });
})();

// ==========================================
// بەشەکان
// ==========================================
const categories = {
    cake: { name: 'کێک', icon: 'fa-cake-candles', count: 0 },
    gaz: { name: 'گەز و بسکیت', icon: 'fa-cookie-bite', count: 0 },
    drink: { name: 'خواردنەوە', icon: 'fa-glass-water', count: 0 },
    chips: { name: 'چیپس', icon: 'fa-bowl-food', count: 0 },
    baby: { name: 'مناڵان', icon: 'fa-baby', count: 0 },
    family: { name: 'عایلەی', icon: 'fa-users', count: 0 }
};

// ==========================================
// داتای بنچینەی کاڵاکان — بۆ کاتی نەتووانین JSON بخوێنینەوە
// ==========================================
const fallbackProducts = [
    { id: 'cake-001', name: 'نەزەری دووقول', description: '24 عەدەد', price: 5250, image: 'kek/IMG_0214.jpeg', category: 'cake' },
    { id: 'cake-002', name: 'کولیچەی دوانی', description: '60 عەدەد', price: 5500, image: 'kek/IMG_0211.jpeg', category: 'cake' },
    { id: 'cake-003', name: 'کێکی ئادرین', description: '24 عەدەد', price: 5000, image: 'kek/IMG_0212.jpeg', category: 'cake' },
    { id: 'cake-004', name: 'لۆپۆچۆکۆ', description: '24 عەدەد', price: 5250, image: 'kek/IMG_0213.jpeg', category: 'cake' },
    { id: 'cake-005', name: 'کێکی دوانی قاوە', description: '24 عەدەد', price: 2500, image: 'kek/photo_1_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-006', name: 'موفید شلیک', description: '24 عەدەد', price: 4750, image: 'kek/photo_2_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-007', name: 'مەفید پرتەقاڵ', description: '24 عەدەد', price: 4750, image: 'kek/photo_3_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-008', name: 'موفید پەنیر', description: '24 عەدەد', price: 4750, image: 'kek/photo_7_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-009', name: 'موفید پڵەس کەرەمێڵ', description: '24 عەدەد', price: 4750, image: 'kek/photo_5_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-010', name: 'کێکی جەلی', description: '24 عەدەد', price: 5000, image: 'kek/photo_4_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'gaz-001', name: 'ویتان', description: '24 عەدەد', price: 5250, image: 'gaz/IMG_0215.jpeg', category: 'gaz' },
    { id: 'gaz-002', name: 'تایکۆی شەسی', description: '24 عەدەد', price: 4500, image: 'gaz/IMG_0216.jpeg', category: 'gaz' },
    { id: 'gaz-003', name: 'دایجستۆ', description: '24 عەدەد', price: 5000, image: 'gaz/IMG_0217.jpeg', category: 'gaz' },
    { id: 'drink-001', name: 'ئاوی دەبە', description: '12 عەدەد', price: 750, image: 'sardy/IMG_0188.jpeg', category: 'drink' },
    { id: 'drink-002', name: 'ئاوی کارتۆن', description: '60 عەدەد', price: 1500, image: 'sardy/IMG_0189.jpeg', category: 'drink' },
    { id: 'chips-001', name: 'کیش تەماتە 500', description: '24 عەدەد', price: 9250, image: 'jbs/IMG_0223.jpeg', category: 'chips' },
    { id: 'baby-001', name: 'تەمەرندی پاکان', description: '24 عەدەد', price: 1000, image: 'mnalan/photo_1_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'family-001', name: 'جکلیتی پۆپۆ', description: '8 عەدەد', price: 12000, image: 'aylay/photo_1_2026-02-20_22-54-38.jpg', category: 'family' },
];

// ==========================================
// دۆخی گشتی
// ==========================================
let products = [];
let cart = [];
let currentCategory = 'cake';
let isGlobalSearch = false;

// ==========================================
// بارکردنی کاڵاکان لە products.json
// ==========================================
async function loadProducts() {
    try {
        // ئەگەر ئەدمین گۆڕانکارییەکی کردبوو لە localStorage
        const adminSaved = localStorage.getItem('adminProducts_v1');
        if (adminSaved) {
            const adminList = JSON.parse(adminSaved);
            products = adminList.filter(p => !p.hidden);
            console.log('✅ کاڵاکان لە localStorage بارکران:', products.length);
            return;
        }
    } catch (e) { }

    try {
        // بارکردن لە products.json لە GitHub (بە cache بڕیانی)
        const url = 'products.json?v=' + Date.now();
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            products = Array.isArray(data) ? data.filter(p => !p.hidden) : data;
            console.log('✅ کاڵاکان لە products.json بارکران:', products.length);
            return;
        }
    } catch (e) {
        console.warn('products.json نەتووانرا بخوێنرێتەوە:', e);
    }

    // fallback: داتای بنچینەی
    products = fallbackProducts;
    console.log('⚠️ داتای بنچینەی بەکاردێت:', products.length);
}

// ==========================================
// Image Modal
// ==========================================
function createImageModal() {
    if (document.getElementById('imageModal')) return;
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = `position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all 0.3s ease;padding:20px;`;
    modal.innerHTML = `
        <button id="imageModalClose" style="position:absolute;top:20px;left:20px;width:44px;height:44px;background:rgba(255,255,255,0.1);border:none;border-radius:50%;color:white;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="fas fa-times"></i></button>
        <img id="imageModalImg" src="" alt="" style="max-width:100%;max-height:85vh;border-radius:16px;object-fit:contain;transform:scale(0.8);transition:transform 0.3s ease;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
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
    img.src = product.image;
    img.alt = product.name;
    document.getElementById('imageModalName').textContent = product.name + ' — ' + product.description;
    document.getElementById('imageModalPrice').textContent = product.price > 0 ? product.price.toLocaleString() + ' IQD' : 'پرسیار بکە';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    setTimeout(() => { img.style.transform = 'scale(1)'; }, 10);
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    img.style.transform = 'scale(0.8)';
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.visibility = 'hidden'; document.body.style.overflow = ''; }, 300);
}

// ==========================================
// دەستپێکردن
// ==========================================
document.addEventListener('DOMContentLoaded', async function () {
    try {
        createImageModal();
        await loadProducts();  // بارکردنی کاڵاکان پێش هەموو شتێک
        createGlobalSearchBtn();
        initParticles();
        initScrollEffects();
        syncSearchInputs();
        loadCart();
        updateCategoryCounts();
        showCategory('cake', document.querySelector('.category-card'));
        initCartReminder();
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
    if (titleEl && categories[currentCategory]) {
        titleEl.innerHTML = `<i class="fas ${categories[currentCategory].icon}"></i> ${categories[currentCategory].name}`;
    }
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

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(p);
    }
}

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);
        scrollTop?.classList.toggle('visible', window.scrollY > 300);
    });
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function showCategory(category, element) {
    currentCategory = category;
    isGlobalSearch = false;
    const s1 = document.getElementById('searchInput');
    const s2 = document.getElementById('searchInputMobile');
    if (s1) s1.value = '';
    if (s2) s2.value = '';
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');
    updateCategoryTitle();
    renderProducts();
}

const imgObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) { img.src = src; delete img.dataset.src; }
            imgObserver.unobserve(img);
        }
    });
}, { rootMargin: '150px' }) : null;

const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='280'%3E%3Crect fill='%23f97316' opacity='.1' width='400' height='280'/%3E%3C/svg%3E`;

function buildProductCard(product, index) {
    const isEager = index < 4;
    const imgAttr = isEager
        ? `src="${product.image}" loading="eager"`
        : `src="${PLACEHOLDER}" data-src="${product.image}" loading="lazy"`;
    const priceText = product.price > 0 ? product.price.toLocaleString() + ' IQD' : 'پرسیار بکە';
    return `
    <div class="product-card" style="animation-delay:${index * 0.04}s">
        <div class="product-image" onclick="openImageModal('${product.id}')" style="cursor:zoom-in;">
            <img ${imgAttr} alt="${product.name}" decoding="async" onerror="this.src='${PLACEHOLDER}'">
            <div class="product-overlay">
                <div style="color:white;font-size:28px;opacity:0.9;"><i class="fas fa-magnifying-glass-plus"></i></div>
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
    const filtered = products.filter(p => p.category === currentCategory);
    const countEl = document.getElementById('productsCount');
    if (countEl) countEl.textContent = filtered.length + ' کاڵا';
    if (filtered.length === 0) { grid.innerHTML = ''; if (emptyState) emptyState.style.display = 'block'; return; }
    if (emptyState) emptyState.style.display = 'none';
    grid.innerHTML = filtered.map((product, index) => buildProductCard(product, index)).join('');
    if (imgObserver) grid.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

function renderGlobalSearch(query) {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const titleEl = document.getElementById('categoryTitle');
    const countEl = document.getElementById('productsCount');
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
        const catData = categories[cat];
        html += `<div style="grid-column:1/-1;margin-top:12px;margin-bottom:4px;">
            <div style="display:flex;align-items:center;gap:8px;padding:8px 4px;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:8px;">
                <div style="width:32px;height:32px;background:rgba(249,115,22,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f97316;font-size:14px;"><i class="fas ${catData.icon}"></i></div>
                <span style="color:white;font-weight:700;font-size:15px;">${catData.name}</span>
                <span style="color:rgba(255,255,255,0.4);font-size:12px;">${grouped[cat].length} کاڵا</span>
            </div></div>`;
        grouped[cat].forEach((product, index) => { html += buildProductCard(product, index); });
    });
    grid.innerHTML = html;
    if (imgObserver) grid.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ==========================================
// یادەرکردنی سەبەتە
// ==========================================
function initCartReminder() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { if (cart.length > 0) localStorage.setItem('cartReminderPending', '1'); }
        else {
            const pending = localStorage.getItem('cartReminderPending');
            if (pending && cart.length > 0) { localStorage.removeItem('cartReminderPending'); setTimeout(() => showCartReminder(), 1500); }
        }
    });
    window.addEventListener('beforeunload', () => { if (cart.length > 0) localStorage.setItem('cartReminderPending', '1'); });
    setTimeout(() => {
        const pending = localStorage.getItem('cartReminderPending');
        if (pending && cart.length > 0) { localStorage.removeItem('cartReminderPending'); showCartReminder(); }
    }, 2000);
}

function showCartReminder() {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    if (totalItems === 0) return;
    const existing = document.getElementById('cartReminder');
    if (existing) existing.remove();
    const reminder = document.createElement('div');
    reminder.id = 'cartReminder';
    reminder.style.cssText = `position:fixed;bottom:80px;left:16px;right:16px;z-index:2500;background:linear-gradient(135deg,rgba(249,115,22,0.95),rgba(244,63,94,0.95));backdrop-filter:blur(20px);border-radius:20px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 8px 32px rgba(249,115,22,0.4);animation:reminderSlideUp 0.4s ease forwards;border:1px solid rgba(255,255,255,0.2);`;
    reminder.innerHTML = `<style>@keyframes reminderSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style>
        <div style="display:flex;align-items:center;gap:12px;flex:1;">
            <div style="width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🛒</div>
            <div><div style="color:white;font-weight:700;font-size:14px;">${totalItems} کاڵات لە سەبەتەدایە!</div><div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:2px;">داواکاریەکەت تەواو بکە</div></div>
        </div>
        <div style="display:flex;gap:8px;flex-shrink:0;">
            <button onclick="toggleCart();document.getElementById('cartReminder')?.remove();" style="padding:8px 16px;background:white;color:#f97316;border:none;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;">بینین</button>
            <button onclick="document.getElementById('cartReminder')?.remove();" style="width:34px;height:34px;background:rgba(255,255,255,0.15);border:none;border-radius:50%;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
        </div>`;
    document.body.appendChild(reminder);
    setTimeout(() => {
        if (reminder.parentNode) { reminder.style.opacity = '0'; reminder.style.transform = 'translateY(20px)'; reminder.style.transition = 'all 0.3s ease'; setTimeout(() => reminder.remove(), 300); }
    }, 12000);
}

function createGlobalSearchBtn() {
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn || document.getElementById('globalSearchBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'globalSearchBtn'; btn.className = 'cart-btn';
    btn.style.cssText = 'background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);';
    btn.innerHTML = `<i class="fas fa-search"></i>`;
    btn.onclick = () => {
        const input = document.getElementById('searchInputMobile') || document.getElementById('searchInput');
        if (input) { input.focus(); window.scrollTo({ top: 100, behavior: 'smooth' }); }
    };
    cartBtn.parentNode.insertBefore(btn, cartBtn);
}

// ==========================================
// سەبەتە
// ==========================================
function loadCart() {
    try { cart = JSON.parse(localStorage.getItem('myShopCart')) || []; } catch (e) { cart = []; }
    updateCartUI();
}

function saveCart() {
    try { localStorage.setItem('myShopCart', JSON.stringify(cart)); } catch (e) { }
}

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
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<div class="cart-empty"><div class="empty-cart-icon"><i class="fas fa-shopping-cart"></i></div><h4>سەبەتە بەتاڵە</h4><p>کاڵای دڵخوازت زیاد بکە</p></div>`;
        return;
    }
    cartItemsEl.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            <div class="cart-item-header">
                <span class="cart-item-name">${item.name}</span>
                <button class="cart-item-remove" onclick="removeFromCart(${i})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="cart-item-controls">
                <div class="qty-controls">
                    <button class="qty-btn" onclick="decreaseQty(${i})">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQty(${i})">+</button>
                </div>
                <span class="cart-item-price">${item.price > 0 ? (item.price * item.quantity).toLocaleString() + ' IQD' : 'پرسیار بکە'}</span>
            </div>
        </div>`).join('');
}

function increaseQty(i) { cart[i].quantity++; saveCart(); updateCartUI(); }
function decreaseQty(i) { if (cart[i].quantity > 1) cart[i].quantity--; else cart.splice(i, 1); saveCart(); updateCartUI(); }
function removeFromCart(i) { cart.splice(i, 1); saveCart(); updateCartUI(); showToast('کاڵا لابرا', 'info'); }

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

function sendWhatsApp() {
    if (cart.length === 0) { showToast('سەبەتە بەتاڵە!', 'error'); return; }
    const name = (document.getElementById('customerName')?.value || '').trim();
    const phone = (document.getElementById('customerPhone')?.value || '').trim();
    if (!name || !phone) { showToast('ناو و ژمارە بنووسە', 'error'); return; }
    const now = new Date();
    let msg = `🛒 *داواکاری نوێ*\n━━━━━━━━━━━━━━━\n`;
    msg += `👤 *ناو:* ${name}\n📱 *تەلەفۆن:* ${phone}\n`;
    msg += `━━━━━━━━━━━━━━━\n📦 *کاڵاکان:*\n━━━━━━━━━━━━━━━\n`;
    cart.forEach((item, i) => {
        if (item.price > 0) msg += `${i + 1}. ${item.name}\n   ${item.quantity} × ${item.price.toLocaleString()} = ${(item.price * item.quantity).toLocaleString()} IQD\n`;
        else msg += `${i + 1}. ${item.name} × ${item.quantity}\n`;
    });
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    msg += `━━━━━━━━━━━━━━━\n`;
    if (total > 0) msg += `💰 *کۆی گشتی:* ${total.toLocaleString()} IQD\n`;
    msg += `━━━━━━━━━━━━━━━\n⏰ ${now.toLocaleString('ar-IQ')}\n✅ تەنیا داواکاریەکەم بنێرە`;
    window.open('https://wa.me/9647518959614?text=' + encodeURIComponent(msg), '_blank');
    cart = []; saveCart(); updateCartUI(); toggleCart();
    setTimeout(showSuccessModal, 400);
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

