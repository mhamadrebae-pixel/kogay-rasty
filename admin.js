// ========================================================
// کۆنترۆڵەری ئەدمینی مۆبایل — کۆگای ڕاستی (Cloud Admin)
// تەواو بێبەرامبەر ($0) — بەستراوە بە سێرڤەری گووگڵ و ImgBB
// ========================================================

const FIREBASE_URL = (window.APP_CONFIG && window.APP_CONFIG.firebaseConfig && window.APP_CONFIG.firebaseConfig.databaseURL)
  || "https://kogay-raste-default-rtdb.firebaseio.com";

let liveProducts = [];
let selectedBlob = null;
let activeFilter = 'all';

// ==========================================
// 1. PIN Security
// ==========================================
const pinScreen = document.getElementById('pinScreen');
const appLayout = document.getElementById('appLayout');
const pinInput = document.getElementById('pinInput');
const btnPinSubmit = document.getElementById('btnPinSubmit');
const pinError = document.getElementById('pinError');

function checkAuth() {
  if (sessionStorage.getItem('kogayAdminAuth') === 'true') {
    pinScreen.style.display = 'none';
    appLayout.style.display = 'block';
    fetchProductsFromFirebase();
  } else {
    pinScreen.style.display = 'flex';
    appLayout.style.display = 'none';
  }
}

btnPinSubmit.addEventListener('click', () => {
  const enteredPin = pinInput.value.trim();
  const validPin = (window.APP_CONFIG && window.APP_CONFIG.adminPin) || '1234';

  if (enteredPin === validPin) {
    sessionStorage.setItem('kogayAdminAuth', 'true');
    pinError.style.display = 'none';
    pinScreen.style.display = 'none';
    appLayout.style.display = 'block';
    fetchProductsFromFirebase();
  } else {
    pinError.style.display = 'block';
    pinInput.value = '';
    pinInput.focus();
  }
});

pinInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') btnPinSubmit.click();
});

document.getElementById('btnLogout').addEventListener('click', () => {
  sessionStorage.removeItem('kogayAdminAuth');
  location.reload();
});

// ==========================================
// 2. Fetch Products From Google Firebase
// ==========================================
async function fetchProductsFromFirebase() {
  const syncBadge = document.getElementById('syncBadge');
  const syncStatusText = document.getElementById('syncStatusText');
  syncStatusText.textContent = 'بەستراوەتەوە بە گووگڵ';
  syncBadge.style.background = 'rgba(16, 185, 129, 0.15)';

  try {
    const res = await fetch(`${FIREBASE_URL}/products.json`);
    const data = await res.json();
    if (data) {
      liveProducts = Object.entries(data).map(([key, item]) => ({
        ...item,
        id: item.id || key
      }));
    } else {
      liveProducts = [];
    }
    updateBadge();
    renderProductsList();
  } catch (err) {
    console.error('Fetch error:', err);
    syncStatusText.textContent = 'کێشە لە پەیوەندی';
    syncBadge.style.background = 'rgba(239, 68, 68, 0.15)';
  }
}

function updateBadge() {
  const badge = document.getElementById('totalBadgeTop');
  if (badge) badge.textContent = `${liveProducts.length} کاڵا`;
}

// ==========================================
// 3. Navigation
// ==========================================
document.querySelectorAll('.bar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    document.querySelectorAll('.bar-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));

    btn.classList.add('active');
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    if (tabId === 'tab-list') {
      renderProductsList();
    }
  });
});

// ==========================================
// 4. Camera & WebP Compression
// ==========================================
const cameraZone = document.getElementById('cameraZone');
const cameraInput = document.getElementById('cameraInput');
const zoneIdle = document.getElementById('zoneIdle');
const zonePreview = document.getElementById('zonePreview');
const previewImg = document.getElementById('previewImg');
const btnClearImg = document.getElementById('btnClearImg');
const compTag = document.getElementById('compTag');

cameraZone.addEventListener('click', (e) => {
  if (e.target.closest('#btnClearImg')) return;
  cameraInput.click();
});

cameraInput.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    compTag.textContent = 'فشاردن لە مۆبایل...';
    const { blob, origKb, compKb } = await compressToWebp(file);
    selectedBlob = blob;

    previewImg.src = URL.createObjectURL(blob);
    zoneIdle.style.display = 'none';
    zonePreview.style.display = 'block';

    compTag.textContent = `WebP: ${origKb}KB ➔ ${compKb}KB`;
    showToast(`وێنەکە بە سەرکەوتوویی فشرێندرا (${compKb} KB)`, 'success');
  } catch (err) {
    showToast('هەڵە لە وێنەدا', 'error');
  }
});

btnClearImg.addEventListener('click', (e) => {
  e.stopPropagation();
  selectedBlob = null;
  cameraInput.value = '';
  previewImg.src = '';
  zonePreview.style.display = 'none';
  zoneIdle.style.display = 'flex';
});

function compressToWebp(file, maxDim = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Compression error'));
          resolve({
            blob,
            origKb: Math.round(file.size / 1024),
            compKb: Math.round(blob.size / 1024)
          });
        }, 'image/webp', quality);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ==========================================
// 5. Cloud Upload to ImgBB
// ==========================================
async function uploadToImgBB(blob) {
  const apiKey = window.APP_CONFIG?.imgbbApiKey;
  if (!apiKey) throw new Error('ImgBB API Key دانەنراوە');

  const formData = new FormData();
  formData.append('image', blob, 'product.webp');

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (data.success && data.data && data.data.url) {
    return data.data.url;
  }
  throw new Error(data.error?.message || 'کێشە لە بارکردنی وێنە لە سێرڤەر');
}

// ==========================================
// 6. Category Selection & Price Formatting
// ==========================================
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('selectedCat').value = btn.dataset.cat;
  });
});

const prodPrice = document.getElementById('prodPrice');
const priceWords = document.getElementById('priceWords');
prodPrice.addEventListener('input', () => {
  const val = Number(prodPrice.value) || 0;
  priceWords.textContent = `${val.toLocaleString('en-US')} دیناری عێراقی`;
});

// ==========================================
// 7. Add Product to Firebase
// ==========================================
const addForm = document.getElementById('addForm');
const btnSubmit = document.getElementById('btnSubmit');
const btnSubmitText = document.getElementById('btnSubmitText');
const uploadProgressBar = document.getElementById('uploadProgressBar');
const progressFill = document.getElementById('progressFill');

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('prodName').value.trim();
  const category = document.getElementById('selectedCat').value;
  const price = Number(prodPrice.value) || 0;
  const desc = document.getElementById('prodDesc').value.trim();

  if (!name) {
    showToast('تکایە ناوی کاڵا بنووسە', 'error');
    return;
  }

  btnSubmit.disabled = true;
  btnSubmitText.textContent = 'بارکردنی وێنە بۆ سێرڤەری هەور...';
  uploadProgressBar.style.display = 'block';
  progressFill.style.width = '35%';

  try {
    let imageUrl = '';
    if (selectedBlob) {
      imageUrl = await uploadToImgBB(selectedBlob);
    }
    progressFill.style.width = '75%';
    btnSubmitText.textContent = 'پاشەکەوتکردن لە سێرڤەری گووگڵ...';

    const timestamp = Date.now();
    const id = `${category.slice(0, 3)}_${timestamp.toString().slice(-6)}`;
    const newProduct = {
      id,
      name,
      category,
      price,
      description: desc,
      image: imageUrl || '../icon-192.png',
      image_webp: imageUrl || '',
      created_at: new Date().toISOString()
    };

    // Save directly to Firebase Database via REST
    const putRes = await fetch(`${FIREBASE_URL}/products/${encodeURIComponent(id)}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });

    if (!putRes.ok) {
      throw new Error('نەتوانرا لە سێرڤەری گووگڵ پاشەکەوت بکرێت');
    }

    progressFill.style.width = '100%';
    showToast('🎉 کاڵاکە بۆ سێرڤەری گووگڵ زیادکرا!', 'success');

    // Add to local list and update view
    liveProducts.unshift(newProduct);
    updateBadge();
    renderProductsList();

    // Reset Form
    document.getElementById('prodName').value = '';
    prodPrice.value = '';
    priceWords.textContent = '0 دیناری عێراقی';
    document.getElementById('prodDesc').value = '';
    btnClearImg.click();
  } catch (err) {
    console.error(err);
    showToast(err.message || 'هەڵە لە زیادکردندا', 'error');
  } finally {
    btnSubmit.disabled = false;
    btnSubmitText.textContent = '➕ زیادکردن بۆ فرۆشگا';
    uploadProgressBar.style.display = 'none';
    progressFill.style.width = '0%';
  }
});

// ==========================================
// 8. Products List & Search
// ==========================================
const prodCardsContainer = document.getElementById('prodCardsContainer');
const searchInput = document.getElementById('searchInput');

function renderProductsList() {
  const query = searchInput.value.trim().toLowerCase();
  let filtered = liveProducts;

  if (activeFilter !== 'all') {
    filtered = filtered.filter(p => String(p.category || '').toLowerCase() === activeFilter.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(p =>
      String(p.name || '').toLowerCase().includes(query) ||
      String(p.description || '').toLowerCase().includes(query) ||
      String(p.id || '').toLowerCase().includes(query)
    );
  }

  if (filtered.length === 0) {
    prodCardsContainer.innerHTML = '<div class="status-msg">هیچ کاڵایەک نەدۆزرایەوە</div>';
    return;
  }

  prodCardsContainer.innerHTML = filtered.map(p => {
    let imgSrc = p.image || '../icon-192.png';
    if (!imgSrc.startsWith('http') && !imgSrc.startsWith('../') && !imgSrc.startsWith('data:')) {
      imgSrc = `../${imgSrc}`;
    }

    return `
      <div class="card-item" data-id="${p.id}">
        <img src="${escapeAttr(imgSrc)}" class="card-thumb" alt="" onerror="this.src='../icon-192.png'">
        <div class="card-info">
          <div class="card-title">${escapeHtml(p.name)}</div>
          <div class="card-price">${Number(p.price || 0).toLocaleString()} IQD</div>
          <div class="card-desc">${escapeHtml(p.category || '')} • ${escapeHtml(p.description || '')}</div>
        </div>
        <div class="card-actions">
          <button type="button" class="btn-icon-action" onclick="openEdit('${escapeAttr(p.id)}')" title="دەستکاری">✏️</button>
          <button type="button" class="btn-icon-action" onclick="deleteProd('${escapeAttr(p.id)}')" title="سڕینەوە">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

searchInput.addEventListener('input', renderProductsList);

document.querySelectorAll('.chip').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    activeFilter = c.dataset.filter;
    renderProductsList();
  });
});

document.getElementById('btnReloadList').addEventListener('click', () => {
  fetchProductsFromFirebase();
});

// ==========================================
// 9. Edit & Delete Product
// ==========================================
window.deleteProd = async function(id) {
  if (!confirm('دڵنیایت دەتەوێت ئەم کاڵایە بسڕیتەوە لە سێرڤەری گووگڵ؟')) return;

  try {
    const res = await fetch(`${FIREBASE_URL}/products/${encodeURIComponent(id)}.json`, {
      method: 'DELETE'
    });

    if (res.ok) {
      liveProducts = liveProducts.filter(p => p.id !== id);
      updateBadge();
      renderProductsList();
      showToast('کاڵاکە بە سەرکەوتوویی سڕایەوە', 'success');
    } else {
      throw new Error('نەتوانرا بسڕدرێتەوە');
    }
  } catch (err) {
    showToast('هەڵە لە سڕینەوە', 'error');
  }
};

window.openEdit = function(id) {
  const prod = liveProducts.find(p => p.id === id);
  if (!prod) return;

  document.getElementById('editId').value = prod.id;
  document.getElementById('editName').value = prod.name || '';
  document.getElementById('editPrice').value = prod.price || 0;
  document.getElementById('editDesc').value = prod.description || '';
  document.getElementById('editModal').style.display = 'flex';
};

document.getElementById('btnModalClose').addEventListener('click', () => {
  document.getElementById('editModal').style.display = 'none';
});
document.getElementById('btnModalCancel').addEventListener('click', () => {
  document.getElementById('editModal').style.display = 'none';
});

document.getElementById('editForm').addEventListener('submit', async () => {
  const id = document.getElementById('editId').value;
  const name = document.getElementById('editName').value.trim();
  const price = Number(document.getElementById('editPrice').value) || 0;
  const desc = document.getElementById('editDesc').value.trim();

  try {
    const res = await fetch(`${FIREBASE_URL}/products/${encodeURIComponent(id)}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, description: desc })
    });

    if (res.ok) {
      const p = liveProducts.find(x => x.id === id);
      if (p) {
        p.name = name;
        p.price = price;
        p.description = desc;
        renderProductsList();
      }
      document.getElementById('editModal').style.display = 'none';
      showToast('دەستکارییەکان لە سێرڤەر پاشەکەوت کران', 'success');
    }
  } catch (err) {
    showToast('هەڵە لە پاشەکەوتکردندا', 'error');
  }
});

// ==========================================
// 10. Import 381 Existing Products
// ==========================================
document.getElementById('btnImportExisting').addEventListener('click', async () => {
  const btn = document.getElementById('btnImportExisting');
  const status = document.getElementById('importStatus');
  status.style.display = 'block';
  status.textContent = 'پشکنینی کاڵاکانی پێشوو...';
  btn.disabled = true;

  try {
    const res = await fetch(`${FIREBASE_URL}/products.json?shallow=true`);
    const data = await res.json();
    const count = data ? Object.keys(data).length : 0;
    status.innerHTML = `✅ ئێستا <strong>${count}</strong> کاڵا لەسەر سێرڤەری گووگڵ هەیە و کارایە!`;
  } catch (err) {
    status.innerHTML = `❌ کێشە: ${err.message}`;
  } finally {
    btn.disabled = false;
  }
});

// ==========================================
// Helpers
// ==========================================
function showToast(msg, type = 'success') {
  const box = document.getElementById('toastBox');
  const item = document.createElement('div');
  item.className = `toast-item ${type}`;
  item.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span><span>${escapeHtml(msg)}</span>`;
  box.appendChild(item);

  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transition = 'all 0.3s';
    setTimeout(() => item.remove(), 300);
  }, 3000);
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Start
checkAuth();
