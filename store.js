// ========================================================
// کۆگای ڕاستی — فرۆشگای ئۆنلاین (Online Store)
// بەستراوەتەوە بە سێرڤەری گووگڵ و داواکاری لە واتسئەپ
// ========================================================

const FIREBASE_URL = (window.APP_CONFIG && window.APP_CONFIG.firebaseConfig && window.APP_CONFIG.firebaseConfig.databaseURL)
  || "https://kogay-raste-default-rtdb.firebaseio.com";

let storeProducts = [];
let cart = [];
let currentCategory = 'all';
let searchQuery = '';

const productsGrid = document.getElementById('productsGrid');
const storeSearch = document.getElementById('storeSearch');
const itemsCountBadge = document.getElementById('itemsCountBadge');
const currentCategoryTitle = document.getElementById('currentCategoryTitle');
const cartModal = document.getElementById('cartModal');
const btnOpenCart = document.getElementById('btnOpenCart');
const btnCloseCart = document.getElementById('btnCloseCart');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCount = document.getElementById('cartCount');
const btnWhatsappOrder = document.getElementById('btnWhatsappOrder');
const storeToast = document.getElementById('storeToast');

// ==========================================
// 1. Fetch Realtime from Google Firebase
// ==========================================
async function initStore() {
  loadSavedCart();

  try {
    const res = await fetch(`${FIREBASE_URL}/products.json`);
    const data = await res.json();
    if (data) {
      storeProducts = Object.values(data);
    } else {
      storeProducts = [];
    }
    renderStore();
  } catch (err) {
    console.warn('Firebase error, loading local fallback:', err);
    fallbackToLocalJson();
  }
}

async function fallbackToLocalJson() {
  try {
    const res = await fetch('../products.json');
    if (res.ok) {
      storeProducts = await res.json();
      renderStore();
    }
  } catch (e) {
    productsGrid.innerHTML = '<div class="store-loading"><p>نەتوانرا کاڵاکان بار بکرێن</p></div>';
  }
}

// ==========================================
// 2. Render Products
// ==========================================
const CAT_NAMES = {
  all: 'هەموو کاڵاکان',
  cake: 'کێک',
  gaz: 'گەز و بسکیت',
  drink: 'خواردنەوە',
  chips: 'چیپس',
  baby: 'مناڵان',
  family: 'عایلەیی'
};

function renderStore() {
  let filtered = storeProducts.filter(p => !p.hidden);

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => String(p.category || '').toLowerCase() === currentCategory.toLowerCase());
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      String(p.name || '').toLowerCase().includes(q) ||
      String(p.description || '').toLowerCase().includes(q)
    );
  }

  itemsCountBadge.textContent = `${filtered.length} کاڵا`;
  currentCategoryTitle.textContent = CAT_NAMES[currentCategory] || currentCategory;

  if (filtered.length === 0) {
    productsGrid.innerHTML = '<div class="store-loading"><p>هیچ کاڵایەک نەدۆزرایەوە</p></div>';
    return;
  }

  productsGrid.innerHTML = filtered.map(p => {
    let imgSrc = p.image || '../icon-192.png';
    if (!imgSrc.startsWith('http') && !imgSrc.startsWith('../') && !imgSrc.startsWith('data:')) {
      imgSrc = `../${imgSrc}`;
    }

    return `
      <div class="prod-card">
        <div class="prod-card-img-wrap">
          <img src="${escapeAttr(imgSrc)}" class="prod-card-img" alt="${escapeAttr(p.name)}" loading="lazy" onerror="this.src='../icon-192.png'">
        </div>
        <div class="prod-card-body">
          <h3 class="prod-card-title">${escapeHtml(p.name)}</h3>
          <div class="prod-card-desc">${escapeHtml(p.description || '')}</div>
          <div class="prod-card-footer">
            <span class="prod-card-price">${Number(p.price || 0).toLocaleString()} IQD</span>
            <button type="button" class="btn-add-cart" onclick="addToCart('${escapeAttr(p.id)}')" title="زیادکردن بۆ سەبەتە">➕</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Category Filter
document.querySelectorAll('.cat-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentCategory = chip.dataset.cat;
    renderStore();
  });
});

// Search
storeSearch.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  renderStore();
});

// ==========================================
// 3. Shopping Cart & WhatsApp Order
// ==========================================
window.addToCart = function(id) {
  const prod = storeProducts.find(p => p.id === id);
  if (!prod) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: Number(prod.price) || 0,
      qty: 1
    });
  }

  saveCart();
  updateCartBadge();
  toast(`«${prod.name}» زیادکرا بۆ سەبەتە`);
};

function saveCart() {
  localStorage.setItem('kogayCart', JSON.stringify(cart));
}

function loadSavedCart() {
  try {
    const saved = localStorage.getItem('kogayCart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {}
  updateCartBadge();
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;
}

btnOpenCart.addEventListener('click', () => {
  renderCartModal();
  cartModal.style.display = 'flex';
});

btnCloseCart.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.style.display = 'none';
});

function renderCartModal() {
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<div class="empty-cart-msg">سەبەتەکەت بەتاڵە</div>';
    cartTotalPrice.textContent = '0 IQD';
    return;
  }

  let total = 0;
  cartItemsList.innerHTML = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-row">
        <div class="cart-row-title">${escapeHtml(item.name)}</div>
        <div class="cart-row-price">${subtotal.toLocaleString()} IQD</div>
        <div class="cart-qty-ctrl">
          <button type="button" class="btn-qty" onclick="changeQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button type="button" class="btn-qty" onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  cartTotalPrice.textContent = `${total.toLocaleString()} IQD`;
}

window.changeQty = function(id, delta) {
  const index = cart.findIndex(x => x.id === id);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  renderCartModal();
};

btnWhatsappOrder.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('سەبەتەکەت هیچ کاڵایەکی تێدا نیە!');
    return;
  }

  const phone = window.APP_CONFIG?.whatsappNumber || '+9647500000000';
  let total = 0;
  let text = `سڵاو، داواکاری نوێم هەیە لە کۆگای ڕاستی:\n\n`;

  cart.forEach((item, i) => {
    const sub = item.price * item.qty;
    total += sub;
    text += `${i + 1}. ${item.name} (${item.qty} دانە) = ${sub.toLocaleString()} IQD\n`;
  });

  text += `\n💰 کۆی گشتی: ${total.toLocaleString()} IQD`;
  text += `\n📍 تکایە شوێن و ناونیشانم پێ بڵێن.`;

  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});

// Toast
function toast(msg) {
  storeToast.textContent = msg;
  storeToast.style.display = 'block';
  setTimeout(() => { storeToast.style.display = 'none'; }, 2200);
}

function escapeHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return String(s || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Start
initStore();
