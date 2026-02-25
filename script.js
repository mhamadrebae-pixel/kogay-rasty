// ==========================================
// ÃÂÃÂ±ÃÂÃÂ´ÃÂ¯ÃÂ§ÃÂ ÃÂ¦ÃÂÃÂÃÂ - v4 Global Search + Reminder
// ==========================================
// script.js
(function hideLoaderSafe() {
    function doHide() {
        var loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(function () { loader.style.display = 'none'; }, 400);
        }
    }
    setTimeout(doHide, 1800);
    window.addEventListener('load', function () { setTimeout(doHide, 500); });
})();

// ==========================================
// ÃÂ¨ÃÂÃÂ´ÃÂÃÂ©ÃÂ§ÃÂ
// ==========================================
const categories = {
    cake: { name: 'ÃÂ©ÃÂÃÂ©', icon: 'fa-cake-candles', count: 0 },
    gaz: { name: 'ÃÂ¯ÃÂÃÂ² ÃÂ ÃÂ¨ÃÂ³ÃÂ©ÃÂÃÂª', icon: 'fa-cookie-bite', count: 0 },
    drink: { name: 'ÃÂ®ÃÂÃÂ§ÃÂ±ÃÂ¯ÃÂÃÂÃÂÃÂ', icon: 'fa-glass-water', count: 0 },
    chips: { name: 'ÃÂÃÂÃÂ¾ÃÂ³', icon: 'fa-bowl-food', count: 0 },
    baby: { name: 'ÃÂÃÂÃÂ§ÃÂµÃÂ§ÃÂ', icon: 'fa-baby', count: 0 },
    family: { name: 'ÃÂ¹ÃÂ§ÃÂÃÂÃÂÃÂ', icon: 'fa-users', count: 0 }
};

// ==========================================
// ÃÂ©ÃÂ§ÃÂµÃÂ§ÃÂ©ÃÂ§ÃÂ Ã¢ÂÂ ÃÂ¦ÃÂÃÂ¯ÃÂÃÂÃÂ ÃÂ¾ÃÂ§ÃÂÃÂÃÂ ÃÂ¨ÃÂÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂ ÃÂ¯ÃÂÃÂ¨ÃÂ§ÃÂª
// ==========================================
const _hardcodedProducts = [
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
    { id: 'cake-011', name: 'دوو قول', description: '24 عەدەد', price: 5000, image: 'kek/photo_6_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-012', name: 'فۆڕچن تەخت سور', description: '24 عەدەد', price: 5000, image: 'kek/photo_8_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-013', name: 'کیکی دوبەی فستق', description: '24 عەدەد', price: 5000, image: 'kek/photo_9_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-014', name: 'کێکی روزینا کرێم', description: '24 عەدەد', price: 5000, image: 'kek/photo_10_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-015', name: 'تۆپ کێک سور', description: '24 عەدەد', price: 5000, image: 'kek/photo_11_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-016', name: 'تۆپ کێک ڕەش', description: '24 عەدەد', price: 5000, image: 'kek/photo_12_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-017', name: 'تۆپ کێک گۆڵد', description: '24 عەدەد', price: 5000, image: 'kek/photo_14_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-018', name: 'رۆزینا گوێزی', description: '24 عەدەد', price: 4750, image: 'kek/photo_13_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-019', name: 'فۆڕچن فستق', description: '24 عەدەد', price: 5000, image: 'kek/photo_15_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-020', name: 'فۆڕچن بسکیت', description: '24 عەدەد', price: 5000, image: 'kek/photo_16_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-021', name: 'فۆڕچن شلک', description: '24 عەدەد', price: 5000, image: 'kek/photo_18_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-022', name: 'فۆڕچن پەنیر', description: '24 عەدەد', price: 5000, image: 'kek/photo_19_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-023', name: 'کێکی مۆتۆ ٥٠٠', description: '24 عەدەد', price: 10000, image: 'kek/photo_17_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-024', name: 'دۆماتی ئەڵقە', description: '24 عەدەد', price: 4250, image: 'kek/photo_20_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-025', name: 'نەزەڕی دڵ پەمەی', description: '24 عەدەد', price: 5250, image: 'kek/photo_21_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-026', name: 'نەزەڕی دڵ ڕەش', description: '24 عەدەد', price: 5250, image: 'kek/photo_22_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-027', name: 'پاوەن کێک', description: '24 عەدەد', price: 5000, image: 'kek/photo_24_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-028', name: 'نەزەڕی سەتڵ', description: '24 عەدەد', price: 5250, image: 'kek/photo_25_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-029', name: 'کێکی مهیار', description: '24 عەدەد', price: 5000, image: 'kek/photo_27_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-030', name: 'کێک تایگەر', description: '12 عەدەد', price: 2500, image: 'kek/photo_28_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-031', name: 'کێک رۆز جەلی', description: '24 عەدەد', price: 4750, image: 'kek/photo_29_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'cake-032', name: 'تۆپ کێک', description: '24 عەدەد', price: 4750, image: 'kek/photo_30_2026-02-20_22-41-44.jpg', category: 'cake' },
    { id: 'gaz-001', name: 'ویتان', description: '24 عەدەد', price: 5250, image: 'gaz/IMG_0215.jpeg', category: 'gaz' },
    { id: 'gaz-002', name: 'تایکۆی شەسی', description: '24 عەدەد', price: 4500, image: 'gaz/IMG_0216.jpeg', category: 'gaz' },
    { id: 'gaz-003', name: 'دایجستۆ', description: '24 عەدەد', price: 5000, image: 'gaz/IMG_0217.jpeg', category: 'gaz' },
    { id: 'gaz-004', name: 'پاپڵی گەورە', description: '40 عەدەد', price: 9000, image: 'gaz/IMG_0218.jpeg', category: 'gaz' },
    { id: 'gaz-005', name: 'وایفەر ئەزرا', description: '24 عەدەد', price: 5250, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (2).jpeg', category: 'gaz' },
    { id: 'gaz-006', name: 'کەزی لامیا', description: '24 عەدەد', price: 5000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (1).jpeg', category: 'gaz' },
    { id: 'gaz-007', name: 'پاپڵ', description: '24 عەدەد', price: 5250, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (3).jpeg', category: 'gaz' },
    { id: 'gaz-008', name: 'پاڵشتی', description: '80 عەدەد', price: 7500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (4).jpeg', category: 'gaz' },
    { id: 'gaz-009', name: 'ناستەلەی نانی', description: '24 عەدەد', price: 2500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (5).jpeg', category: 'gaz' },
    { id: 'gaz-010', name: 'ستار مۆز', description: '40 عەدەد', price: 8000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (6).jpeg', category: 'gaz' },
    { id: 'gaz-011', name: 'ستار شلیک', description: '40 عەدەد', price: 8000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (7).jpeg', category: 'gaz' },
    { id: 'gaz-012', name: 'ستار پرتەقاڵ', description: '40 عەدەد', price: 8000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (8).jpeg', category: 'gaz' },
    { id: 'gaz-013', name: 'بسکیتی ترد', description: '40 عەدەد', price: 7500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM (9).jpeg', category: 'gaz' },
    { id: 'gaz-014', name: 'چیلکەی دوانی', description: '24 عەدەد', price: 5000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.05 PM.jpeg', category: 'gaz' },
    { id: 'gaz-015', name: 'وایفەر ئەزرا شلیک', description: '24 عەدەد', price: 5000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (1).jpeg', category: 'gaz' },
    { id: 'gaz-016', name: 'وایفەر ئەزرا مۆز', description: '24 عەدەد', price: 5000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (2).jpeg', category: 'gaz' },
    { id: 'gaz-017', name: 'وایفەر ئەزرا پرتەقاڵ', description: '24 عەدەد', price: 5000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM.jpeg', category: 'gaz' },
    { id: 'gaz-018', name: 'شیرین عەسەل مۆز', description: '40 عەدەد', price: 8000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (3).jpeg', category: 'gaz' },
    { id: 'gaz-019', name: 'بسکت پیتی پور وار', description: '24 عەدەد', price: 5000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (4).jpeg', category: 'gaz' },
    { id: 'gaz-020', name: 'تایستێلی قاوە', description: '48 عەدەد', price: 5000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (5).jpeg', category: 'gaz' },
    { id: 'gaz-021', name: 'چلکەی دوانی', description: '60 عەدەد', price: 6500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (6).jpeg', category: 'gaz' },
    { id: 'gaz-022', name: 'ویکی دوانی', description: '60 عەدەد', price: 11500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (7).jpeg', category: 'gaz' },
    { id: 'gaz-023', name: 'ویکی گەورە', description: '60 عەدەد', price: 6500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (8).jpeg', category: 'gaz' },
    { id: 'gaz-024', name: 'شەمائیڵ', description: '12 عەدەد', price: 2500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (9).jpeg', category: 'gaz' },
    { id: 'gaz-025', name: 'بسکیتی دەموو چاو', description: '24 عەدەد', price: 5250, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (10).jpeg', category: 'gaz' },
    { id: 'gaz-026', name: 'بسکیتی کالیتی', description: '24 عەدەد', price: 4750, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (11).jpeg', category: 'gaz' },
    { id: 'gaz-027', name: 'بورادا', description: '32 عەدەد', price: 6250, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (12).jpeg', category: 'gaz' },
    { id: 'gaz-028', name: 'شەوائیل', description: '60 عەدەد', price: 6500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (15).jpeg', category: 'gaz' },
    { id: 'gaz-029', name: 'هایبای', description: '40 عەدەد', price: 8000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (16).jpeg', category: 'gaz' },
    { id: 'gaz-030', name: 'هەپی عادی', description: '24 عەدەد', price: 4500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (17).jpeg', category: 'gaz' },
    { id: 'gaz-031', name: 'ستاکی شەفاف 500', description: '40 عەدەد', price: 10000, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (18).jpeg', category: 'gaz' },
    { id: 'gaz-032', name: 'پاڵشتی دوانی', description: '80 عەدەد', price: 7500, image: 'gaz/WhatsApp Image 2026-02-20 at 10.02.06 PM (18).jpeg', category: 'gaz' },
    { id: 'gaz-033', name: 'مەڕەکان', description: '24 عەدەد', price: 4750, image: 'gaz/WhatsApp Image 2026-02-20 at 10.03.27 PM.jpeg', category: 'gaz' },
    { id: 'drink-001', name: 'ئاوی دەبە', description: '12 عەدەد', price: 750, image: 'sardy/IMG_0188.jpeg', category: 'drink' },
    { id: 'drink-002', name: 'ئاوی کارتۆن', description: '60 عەدەد', price: 1500, image: 'sardy/IMG_0189.jpeg', category: 'drink' },
    { id: 'drink-003', name: 'پیپسی سلڤەر', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6192.jpeg', category: 'drink' },
    { id: 'drink-004', name: 'پیپسی شین', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6193.jpeg', category: 'drink' },
    { id: 'drink-005', name: 'میرندا', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6194.jpeg', category: 'drink' },
    { id: 'drink-006', name: 'دیو', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6195.jpeg', category: 'drink' },
    { id: 'drink-007', name: 'ڕاجی قۆخ', description: '24 عەدەد', price: 5000, image: 'sardy/IMG_6196.jpeg', category: 'drink' },
    { id: 'drink-008', name: 'ڕانی قتو', description: '24 عەدەد', price: 9750, image: 'sardy/IMG_6197.jpeg', category: 'drink' },
    { id: 'drink-009', name: 'ڕانی شوشە', description: '24 عەدەد', price: 9750, image: 'sardy/IMG_6220.jpeg', category: 'drink' },
    { id: 'drink-010', name: 'لالە شین', description: '30 عەدەد', price: 6000, image: 'sardy/IMG_6198.jpeg', category: 'drink' },
    { id: 'drink-011', name: 'لالە دیو', description: '30 عەدەد', price: 6000, image: 'sardy/IMG_6199.jpeg', category: 'drink' },
    { id: 'drink-012', name: 'دیقی قەڵەو', description: '30 عەدەد', price: 10000, image: 'sardy/IMG_6200.jpeg', category: 'drink' },
    { id: 'drink-013', name: 'پیپسی قەڵەو', description: '30 عەدەد', price: 10000, image: 'sardy/IMG_6201.jpeg', category: 'drink' },
    { id: 'drink-014', name: 'تازجی قتو قۆخ', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6202.jpeg', category: 'drink' },
    { id: 'drink-015', name: 'تازجی قتو پرتەقاڵ', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6203.jpeg', category: 'drink' },
    { id: 'drink-016', name: 'تازجی قتو هەنار', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6204.jpeg', category: 'drink' },
    { id: 'drink-017', name: 'RC شوشە ڕەش', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6205.jpeg', category: 'drink' },
    { id: 'drink-018', name: 'RC شوشە پرتەقاڵ', description: '24 عەدەد', price: 6500, image: 'sardy/IMG_6219.jpeg', category: 'drink' },
    { id: 'drink-019', name: 'سااردی بەغدادی', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6206.jpeg', category: 'drink' },
    { id: 'drink-020', name: 'پیپسی شوشە', description: '24 عەدەد', price: 9750, image: 'sardy/IMG_6207.jpeg', category: 'drink' },
    { id: 'drink-021', name: 'دیوی شوشە', description: '24 عەدەد', price: 9750, image: 'sardy/IMG_6208.jpeg', category: 'drink' },
    { id: 'drink-022', name: 'زەمزەمی شوشە ڕەش', description: '24 عەدەد', price: 10000, image: 'sardy/IMG_6209.jpeg', category: 'drink' },
    { id: 'drink-023', name: 'زەمزەمی شوشە پرتەقاڵ', description: '24 عەدەد', price: 10000, image: 'sardy/IMG_6210.jpeg', category: 'drink' },
    { id: 'drink-024', name: 'زەمزەم شوشە لیمۆ', description: '12 عەدەد', price: 5000, image: 'sardy/IMG_6218.jpeg', category: 'drink' },
    { id: 'drink-025', name: 'ئاسان شین', description: '24 عەدەد', price: 9750, image: 'sardy/IMG_6211.jpeg', category: 'drink' },
    { id: 'drink-026', name: 'ئاسان مۆر', description: '24 عەدەد', price: 9750, image: 'sardy/IMG_6212.jpeg', category: 'drink' },
    { id: 'drink-027', name: 'تایگەری تام پەمەی', description: '24 عەدەد', price: 5000, image: 'sardy/IMG_6213.jpeg', category: 'drink' },
    { id: 'drink-028', name: 'تام شین', description: '24 عەدەد', price: 5000, image: 'sardy/IMG_6238.jpeg', category: 'drink' },
    { id: 'drink-029', name: 'وینەر گەورە', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6214.jpeg', category: 'drink' },
    { id: 'drink-030', name: 'وینەر بچوک', description: '24 عەدەد', price: 5250, image: 'sardy/IMG_6215.jpeg', category: 'drink' },
    { id: 'drink-031', name: 'سۆدەی فروتلی', description: '24 عەدەد', price: 8250, image: 'sardy/IMG_6216.jpeg', category: 'drink' },
    { id: 'drink-032', name: 'سۆدەی مستەر', description: '24 عەدەد', price: 5500, image: 'sardy/IMG_6217.jpeg', category: 'drink' },
    { id: 'drink-033', name: 'شەربەتی تۆ شلک', description: '12 عەدەد', price: 5000, image: 'sardy/IMG_6221.jpeg', category: 'drink' },
    { id: 'drink-034', name: 'شەربەتی تۆ کاڵەک', description: '12 عەدەد', price: 5000, image: 'sardy/IMG_6222.jpeg', category: 'drink' },
    { id: 'drink-035', name: 'شەربەتی تۆ بلوبێری', description: '12 عەدەد', price: 5000, image: 'sardy/IMG_6223.jpeg', category: 'drink' },
    { id: 'drink-036', name: 'شەربەتی تۆ پرتەقاڵ', description: '12 عەدەد', price: 5000, image: 'sardy/IMG_6224.jpeg', category: 'drink' },
    { id: 'drink-037', name: 'شەربەتی تۆ ئەنەناس', description: '12 عەدەد', price: 5000, image: 'sardy/IMG_6225.jpeg', category: 'drink' },
    { id: 'drink-038', name: 'سۆدەی مستار', description: '24 عەدەد', price: 10000, image: 'sardy/IMG_6226.jpeg', category: 'drink' },
    { id: 'drink-039', name: 'ساردی تورکی پرتەقاڵ', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6227.jpeg', category: 'drink' },
    { id: 'drink-040', name: 'تازج شوشە هەنار', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6228.jpeg', category: 'drink' },
    { id: 'drink-041', name: 'تازج شوشە قۆخ', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6229.jpeg', category: 'drink' },
    { id: 'drink-042', name: 'تازج شوشە پرتەقاڵ', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6230.jpeg', category: 'drink' },
    { id: 'drink-043', name: 'تازج شوشە گێزەر', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6231.jpeg', category: 'drink' },
    { id: 'drink-044', name: 'ماڵت جۆ', description: '24 عەدەد', price: 10000, image: 'sardy/IMG_6232.jpeg', category: 'drink' },
    { id: 'drink-045', name: 'ماڵت لیمۆ', description: '24 عەدەد', price: 10000, image: 'sardy/IMG_6233.jpeg', category: 'drink' },
    { id: 'drink-046', name: 'ماڵت قۆخ', description: '24 عەدەد', price: 10000, image: 'sardy/IMG_6234.jpeg', category: 'drink' },
    { id: 'drink-047', name: 'K9 پەمەی', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6235.jpeg', category: 'drink' },
    { id: 'drink-048', name: 'K9 شین', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6237.jpeg', category: 'drink' },
    { id: 'drink-049', name: 'تایگەر ئەسڵ', description: '24 عەدەد', price: 21000, image: 'sardy/IMG_6236.jpeg', category: 'drink' },
    { id: 'drink-050', name: 'دەبە سێڤن', description: '12 عەدەد', price: 2250, image: 'sardy/IMG_6239.jpeg', category: 'drink' },
    { id: 'drink-051', name: 'ساردی نیو', description: '12 عەدەد', price: 2250, image: 'sardy/IMG_6240.jpeg', category: 'drink' },
    { id: 'drink-052', name: 'ساردی K', description: '12 عەدەد', price: 2250, image: 'sardy/IMG_6241.jpeg', category: 'drink' },
    { id: 'drink-053', name: 'ئارسۆ تایگەر', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6242.jpeg', category: 'drink' },
    { id: 'drink-054', name: 'ئارسۆ پرتەقاڵ', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6243.jpeg', category: 'drink' },
    { id: 'drink-055', name: 'ئارسۆ لیمۆ', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6245.jpeg', category: 'drink' },
    { id: 'drink-056', name: 'ئارسۆ ئاوی', description: '30 عەدەد', price: 6500, image: 'sardy/IMG_6246.jpeg', category: 'drink' },
    { id: 'drink-057', name: 'ترابی', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6244.jpeg', category: 'drink' },
    { id: 'drink-058', name: 'تورکی ڕەش', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6247.jpeg', category: 'drink' },
    { id: 'drink-059', name: 'زاکی', description: '36 عەدەد', price: 6000, image: 'sardy/IMG_6248.jpeg', category: 'drink' },
    { id: 'drink-060', name: 'سەمناکی قۆخ', description: '36 عەدەد', price: 3000, image: 'sardy/IMG_6249.jpeg', category: 'drink' },
    { id: 'drink-061', name: 'تازجی پاکەت قۆخ', description: '36 عەدەد', price: 4000, image: 'sardy/IMG_6250.jpeg', category: 'drink' },
    { id: 'drink-062', name: 'تازجی پاکەت کۆکتێل', description: '36 عەدەد', price: 4000, image: 'sardy/IMG_6252.jpeg', category: 'drink' },
    { id: 'drink-063', name: 'تازجی پاکەت پرتەقاڵ', description: '36 عەدەد', price: 4000, image: 'sardy/IMG_6253.jpeg', category: 'drink' },
    { id: 'drink-064', name: 'کاڵبی مۆز', description: '36 عەدەد', price: 8000, image: 'sardy/IMG_6254.jpeg', category: 'drink' },
    { id: 'drink-065', name: 'کاڵبی شلک', description: '36 عەدەد', price: 8000, image: 'sardy/IMG_6255.jpeg', category: 'drink' },
    { id: 'drink-066', name: 'کاڵبی قاوە', description: '36 عەدەد', price: 8000, image: 'sardy/IMG_6256.jpeg', category: 'drink' },
    { id: 'drink-067', name: 'کاڵبی کاڵەک', description: '36 عەدەد', price: 8000, image: 'sardy/IMG_6257.jpeg', category: 'drink' },
    { id: 'drink-068', name: 'زۆزۆ پرتەقاڵ', description: '36 عەدەد', price: 3250, image: 'sardy/IMG_6258.jpeg', category: 'drink' },
    { id: 'drink-069', name: 'زۆزۆ ئەنەناش', description: '36 عەدەد', price: 3250, image: 'sardy/IMG_6259.jpeg', category: 'drink' },
    { id: 'drink-070', name: 'زۆزۆ کۆکتێل', description: '36 عەدەد', price: 3250, image: 'sardy/IMG_6260.jpeg', category: 'drink' },
    { id: 'drink-071', name: 'زۆزۆ ترێ', description: '36 عەدەد', price: 3250, image: 'sardy/IMG_6261.jpeg', category: 'drink' },
    { id: 'drink-072', name: 'زۆزۆ شلک', description: '36 عەدەد', price: 3250, image: 'sardy/IMG_6262.jpeg', category: 'drink' },
    { id: 'drink-073', name: 'زۆزۆ قۆخ', description: '36 عەدەد', price: 3250, image: 'sardy/IMG_6263.jpeg', category: 'drink' },
    { id: 'drink-074', name: 'زۆزۆ سێو', description: '36 عەدەد', price: 3250, image: 'sardy/IMG_6264.jpeg', category: 'drink' },
    { id: 'drink-075', name: 'مەکسیکی لیمۆ', description: '24 عەدەد', price: 14500, image: 'sardy/IMG_6265.jpeg', category: 'drink' },
    { id: 'drink-076', name: 'مەکسیکی شلک', description: '24 عەدەد', price: 14500, image: 'sardy/IMG_6266.jpeg', category: 'drink' },
    { id: 'drink-077', name: 'مەکسیکی مانگۆ', description: '24 عەدەد', price: 14500, image: 'sardy/IMG_6267.jpeg', category: 'drink' },
    { id: 'drink-078', name: 'مەکسیکی بوبی', description: '24 عەدەد', price: 14500, image: 'sardy/IMG_6268.jpeg', category: 'drink' },
    { id: 'drink-079', name: 'مەکسیکی هەنار', description: '24 عەدەد', price: 14500, image: 'sardy/IMG_6269.jpeg', category: 'drink' },
    { id: 'drink-080', name: 'مەکسیکی قاوە', description: '24 عەدەد', price: 14500, image: 'sardy/IMG_6270.jpeg', category: 'drink' },
    { id: 'drink-081', name: 'ڕێد', description: '24 عەدەد', price: 9500, image: 'sardy/IMG_6271.jpeg', category: 'drink' },
    { id: 'drink-082', name: 'پیپسی دەبڵ', description: '6 عەدەد', price: 6500, image: 'sardy/IMG_6272.jpeg', category: 'drink' },
    { id: 'drink-083', name: 'پیپسی 1000', description: '6 عەدەد', price: 4500, image: 'sardy/IMG_6274.jpeg', category: 'drink' },
    { id: 'drink-084', name: 'پیپسی وەصەت', description: '12 عەدەد', price: 6500, image: 'sardy/IMG_6275.jpeg', category: 'drink' },
    { id: 'drink-085', name: 'دیوی دەبڵ', description: '6 عەدەد', price: 6500, image: 'sardy/IMG_6276.jpeg', category: 'drink' },
    { id: 'drink-086', name: 'دیوی 1000', description: '6 عەدەد', price: 4500, image: 'sardy/IMG_6277.jpeg', category: 'drink' },
    { id: 'drink-087', name: 'دیوی وەصەت', description: '12 عەدەد', price: 6500, image: 'sardy/IMG_6278.jpeg', category: 'drink' },
    { id: 'drink-088', name: 'ئەفرا', description: '6 عەدەد', price: 3000, image: 'sardy/IMG_6279.jpeg', category: 'drink' },
    { id: 'drink-089', name: 'یەومی ڕەش', description: '6 عەدەد', price: 3000, image: 'sardy/IMG_6280.jpeg', category: 'drink' },
    { id: 'drink-090', name: 'زەمزامی پرتەقاڵ', description: '6 عەدەد', price: 5500, image: 'sardy/IMG_6281.jpeg', category: 'drink' },
    { id: 'drink-091', name: 'زاگرۆزی دیو', description: '12 عەدەد', price: 2250, image: 'sardy/IMG_6282.jpeg', category: 'drink' },
    { id: 'drink-092', name: 'زاگرۆزی لیمۆ', description: '12 عەدەد', price: 2250, image: 'sardy/IMG_6283.jpeg', category: 'drink' },
    { id: 'drink-093', name: 'زاگرۆزی شین', description: '12 عەدەد', price: 2250, image: 'sardy/IMG_6284.jpeg', category: 'drink' },
    { id: 'drink-094', name: 'دۆی بچوک', description: '16 عەدەد', price: 3000, image: 'sardy/IMG_6285.jpeg', category: 'drink' },
    { id: 'drink-095', name: 'شەربەتی بۆبۆتۆ', description: '24 عەدەد', price: 4500, image: 'sardy/IMG_6286.jpeg', category: 'drink' },
    { id: 'drink-096', name: 'شیر کاڵەکی دەبە', description: '24 عەدەد', price: 4500, image: 'sardy/IMG_6287.jpeg', category: 'drink' },
    { id: 'chips-001', name: 'کیش تەماتە 500', description: '24 عەدەد', price: 9250, image: 'jbs/IMG_0223.jpeg', category: 'chips' },
    { id: 'chips-002', name: 'کیش سرکە 500', description: '24 عەدەد', price: 9250, image: 'jbs/IMG_0224.jpeg', category: 'chips' },
    { id: 'chips-003', name: 'کیش بیبەر 500', description: '24 عەدەد', price: 9250, image: 'jbs/IMG_0225.jpeg', category: 'chips' },
    { id: 'chips-004', name: 'کیش سادە 500', description: '24 عەدەد', price: 9250, image: 'jbs/IMG_0226.jpeg', category: 'chips' },
    { id: 'chips-005', name: 'کیش لیمۆ 500', description: '24 عەدەد', price: 9250, image: 'jbs/IMG_0227.jpeg', category: 'chips' },
    { id: 'chips-006', name: 'کیش بیبەر 250', description: '48 عەدەد', price: 9250, image: 'jbs/photo_2_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-007', name: 'کیش سادە 250', description: '48 عەدەد', price: 9250, image: 'jbs/photo_3_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-008', name: 'کیش لیمۆ 250', description: '48 عەدەد', price: 9250, image: 'jbs/photo_4_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-009', name: 'کیش سرکە 250', description: '48 عەدەد', price: 9250, image: 'jbs/photo_10_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-010', name: 'لیزا کۆکتێل', description: '48 عەدەد', price: 7500, image: 'jbs/IMG_0206.jpeg', category: 'chips' },
    { id: 'chips-011', name: 'زەڕاتی شامی', description: '45 عەدەد', price: 9000, image: 'jbs/IMG_0207.jpeg', category: 'chips' },
    { id: 'chips-012', name: 'سناپ', description: '40 عەدەد', price: 7500, image: 'jbs/IMG_0208.jpeg', category: 'chips' },
    { id: 'chips-013', name: 'تیک تۆک', description: '40 عەدەد', price: 7500, image: 'jbs/IMG_0209.jpeg', category: 'chips' },
    { id: 'chips-014', name: 'نینی', description: '36 عەدەد', price: 6750, image: 'jbs/IMG_0219.jpeg', category: 'chips' },
    { id: 'chips-015', name: 'مانشی سپی 500', description: '24 عەدەد', price: 9500, image: 'jbs/IMG_0228.jpeg', category: 'chips' },
    { id: 'chips-016', name: 'مانشی زەرد 500', description: '24 عەدەد', price: 9500, image: 'jbs/IMG_0229.jpeg', category: 'chips' },
    { id: 'chips-017', name: 'مزمز چلکە سرکە', description: '48 عەدەد', price: 9000, image: 'jbs/IMG_0230.jpeg', category: 'chips' },
    { id: 'chips-018', name: 'لابوبو', description: '48 عەدەد', price: 9000, image: 'jbs/IMG_0232.jpeg', category: 'chips' },
    { id: 'chips-019', name: 'شامی دوانی', description: '60 عەدەد', price: 6250, image: 'jbs/photo_6_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-020', name: 'عەڵقەی کەباب', description: '40 عەدەد', price: 8000, image: 'jbs/photo_7_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-021', name: 'لوسی', description: '45 عەدەد', price: 9500, image: 'jbs/photo_9_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-022', name: 'من و تۆ کیس', description: '22 عەدەد', price: 4000, image: 'jbs/photo_11_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-023', name: 'لیزا', description: '40 عەدەد', price: 7500, image: 'jbs/photo_12_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-024', name: 'بانو کیس', description: '22 عەدەد', price: 4000, image: 'jbs/photo_13_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-025', name: 'مانچیس مۆر', description: '45 عەدەد', price: 9500, image: 'jbs/photo_14_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-026', name: 'ئەمرەک', description: '48 عەدەد', price: 9000, image: 'jbs/photo_15_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-027', name: 'عەڵقەی لیمۆ', description: '40 عەدەد', price: 8000, image: 'jbs/photo_16_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-028', name: 'بوشاری دوانی', description: '40 عەدەد', price: 4500, image: 'jbs/photo_17_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-029', name: 'مسک مریشک', description: '40 عەدەد', price: 8000, image: 'jbs/photo_18_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-030', name: 'مسک سرکە', description: '40 عەدەد', price: 8000, image: 'jbs/photo_19_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-031', name: 'مسک پەنیر', description: '40 عەدەد', price: 8000, image: 'jbs/photo_20_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-032', name: 'مسک لیمۆ', description: '40 عەدەد', price: 8000, image: 'jbs/photo_21_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-033', name: 'دانەن دانەی عایلەی', description: '24 عەدەد', price: 8000, image: 'jbs/photo_23_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-034', name: 'دانە دانە پرتەقاڵ', description: '40 عەدەد', price: 8000, image: 'jbs/photo_8_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-035', name: 'دانە دانە سور', description: '40 عەدەد', price: 8000, image: 'jbs/photo_22_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-036', name: 'دانە دانە شین', description: '40 عەدەد', price: 8000, image: 'jbs/photo_24_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-037', name: 'دانە دانە زەرد', description: '40 عەدەد', price: 8000, image: 'jbs/photo_25_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-038', name: 'تۆرتێلا سەوز', description: '48 عەدەد', price: 8500, image: 'jbs/photo_26_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-039', name: 'نینی لیمۆ', description: '36 عەدەد', price: 7000, image: 'jbs/photo_27_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-040', name: 'نینی بوشار', description: '36 عەدەد', price: 7000, image: 'jbs/photo_28_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-041', name: 'زەڕاتی پەرداخ', description: '40 عەدەد', price: 8000, image: 'jbs/photo_30_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-042', name: 'تۆرتێلای شین', description: '48 عەدەد', price: 9500, image: 'jbs/photo_31_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-043', name: 'مانشی سپی', description: '45 عەدەد', price: 9500, image: 'jbs/photo_32_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-044', name: 'مانشی زەرد', description: '45 عەدەد', price: 9500, image: 'jbs/photo_33_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-045', name: 'من من ڕان', description: '40 عەدەد', price: 7500, image: 'jbs/photo_34_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-046', name: 'من من پیتزا', description: '40 عەدەد', price: 7500, image: 'jbs/photo_35_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-047', name: 'بوشاری بانوو', description: '40 عەدەد', price: 4500, image: 'jbs/photo_36_2026-02-20_22-38-05.jpg', category: 'chips' },
    { id: 'chips-048', name: 'لابوبو دوانی', description: '48 عەدەد', price: 9000, image: 'jbs/photo_2026-02-20_22-39-15.jpg', category: 'chips' },
    { id: 'baby-001', name: 'تەمەرندی پاکان', description: '24 عەدەد', price: 1000, image: 'mnalan/photo_1_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-002', name: 'پەشمەک سپی', description: '24 عەدەد', price: 4750, image: 'mnalan/photo_2_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-003', name: 'قاوەی زۆۆ', description: '24 عەدەد', price: 3500, image: 'mnalan/photo_3_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-004', name: 'کۆلا بۆن', description: '24 عەدەد', price: 5000, image: 'mnalan/photo_4_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-005', name: 'تەمەرندی لول', description: '24 عەدەد', price: 4750, image: 'mnalan/photo_5_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-006', name: 'نەستەلەی ئۆتۆن قاوە', description: '24 عەدەد', price: 5250, image: 'mnalan/photo_7_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-007', name: 'نەستەلەی ئۆتۆن سپی', description: '24 عەدەد', price: 5000, image: 'mnalan/photo_17_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-008', name: 'تەمەرندی تەخت', description: '48 عەدەد', price: 2500, image: 'mnalan/photo_8_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-009', name: 'مەساسەی سوور عادی', description: '45 عەدەد', price: 3000, image: 'mnalan/photo_9_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-010', name: 'مەساسەی دەبە کۆلا', description: '60 عەدەد', price: 5000, image: 'mnalan/photo_11_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-011', name: 'مەساسەی دەبە گێلاس', description: '60 عەدەد', price: 5000, image: 'mnalan/photo_12_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-012', name: 'مەساسەی دەبە ڕەش', description: '60 عەدەد', price: 5000, image: 'mnalan/photo_13_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-013', name: 'مەساسەی ورد', description: '100 عەدەد', price: 2000, image: 'mnalan/photo_14_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-014', name: 'مەساسەی دەبە شاتوو', description: '60 عەدەد', price: 5000, image: 'mnalan/photo_15_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-015', name: 'نوقڵی ورد ئایدین', description: '24 عەدەد', price: 5000, image: 'mnalan/photo_16_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-016', name: 'تەمەرندی ڕوڵ', description: '24 عەدەد', price: 5000, image: 'mnalan/photo_19_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-017', name: 'نوقڵی ڕانا', description: '12 عەدەد', price: 2250, image: 'mnalan/photo_20_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-018', name: 'چوکلێتی ئایدن', description: '100 عەدەد', price: 2500, image: 'mnalan/photo_21_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-019', name: 'بنێشتی یوبی 100', description: '100 عەدەد', price: 2500, image: 'mnalan/photo_22_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-020', name: 'تەمەرندی ڕستە', description: '12 عەدەد', price: 2500, image: 'mnalan/photo_24_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-021', name: 'قاوەی زۆۆ ٢', description: '24 عەدەد', price: 3500, image: 'mnalan/photo_25_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-022', name: 'سەمیریری', description: '24 عەدەد', price: 3500, image: 'mnalan/photo_26_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-023', name: 'نوقڵی ئاناتا شیر', description: '24 عەدەد', price: 5000, image: 'mnalan/photo_27_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-024', name: 'نەوقڵی ئاناتا قاوە', description: '24 عەدەد', price: 5000, image: 'mnalan/photo_28_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-025', name: 'تەمەرندی سرنج', description: '24 عەدەد', price: 4500, image: 'mnalan/photo_29_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'baby-026', name: 'نەستەلەی بستە', description: '24 عەدەد', price: 5000, image: 'mnalan/photo_30_2026-02-21_00-54-52.jpg', category: 'baby' },
    { id: 'family-001', name: 'جکلیتی پۆپۆ', description: '8 عەدەد', price: 12000, image: 'aylay/photo_1_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-002', name: 'نوقولی ورد', description: '20 عەدەد', price: 18000, image: 'aylay/photo_2_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-003', name: 'وایفەر عایلە قاوە', description: '12 عەدەد', price: 10000, image: 'aylay/photo_3_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-004', name: 'چەمەک مۆز', description: '12 عەدەد', price: 10000, image: 'aylay/photo_4_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-005', name: 'چەمەکی قاوە', description: '12 عەدەد', price: 10000, image: 'aylay/photo_16_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-006', name: 'چەمەکی گوێز', description: '12 عەدەد', price: 10000, image: 'aylay/photo_17_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-007', name: 'نوقڵی مینۆ', description: '12 عەدەد', price: 10000, image: 'aylay/photo_7_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-008', name: 'مادەر لاکێشە', description: '18 عەدەد', price: 15000, image: 'aylay/photo_9_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-009', name: 'ئیسپانی عادی', description: '12 عەدەد', price: 10000, image: 'aylay/photo_10_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-010', name: 'فینگەری عایلە', description: '12 عەدەد', price: 10000, image: 'aylay/photo_11_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-011', name: 'بسكیتی چای سەوز', description: '12 عەدەد', price: 8500, image: 'aylay/photo_12_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-012', name: 'پیتی پور عایلە', description: '12 عەدەد', price: 10000, image: 'aylay/photo_8_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-013', name: 'پیتی پوری قاوە', description: '12 عەدەد', price: 10000, image: 'aylay/photo_13_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-014', name: 'پیتی پور سادە', description: '12 عەدەد', price: 10000, image: 'aylay/photo_14_2026-02-20_22-54-38.jpg', category: 'family' },
    { id: 'family-015', name: 'ئاناتای بەڵەم', description: '8 عەدەد', price: 11500, image: 'aylay/photo_18_2026-02-20_22-54-38.jpg', category: 'family' },
];

// ==========================================
// Ã°ÂÂÂ ÃÂ¾ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ©ÃÂ±ÃÂ¯ÃÂ ÃÂ¨ÃÂ ÃÂ¦ÃÂÃÂ¯ÃÂÃÂÃÂ ÃÂ¾ÃÂ§ÃÂÃÂÃÂ
// ÃÂ¦ÃÂÃÂ¯ÃÂÃÂ± ÃÂ¦ÃÂÃÂ¯ÃÂÃÂÃÂ ÃÂ¯ÃÂÃÂÃÂ§ÃÂÃÂ©ÃÂ§ÃÂ±ÃÂ ÃÂ©ÃÂ±ÃÂ¯ÃÂ¨ÃÂÃÂªÃÂ ÃÂ¦ÃÂÃÂÃÂ§ ÃÂÃÂ
// localStorage ÃÂ¨ÃÂ®ÃÂÃÂÃÂÃÂÃÂ±ÃÂÃÂÃÂ Ã¢ÂÂ ÃÂ¨ÃÂÃÂ¨ÃÂ ÃÂ¦ÃÂÃÂ¾ÃÂÃÂÃÂ¯
// ==========================================
(function loadAdminProducts() {
    try {
        const saved = localStorage.getItem('adminProducts_v1');
        if (saved) {
            const adminList = JSON.parse(saved);
            // ÃÂªÃÂÃÂÃÂÃÂ§ ÃÂ©ÃÂ§ÃÂµÃÂ§ÃÂ©ÃÂ§ÃÂÃÂ ÃÂÃÂÃÂ´ÃÂ§ÃÂÃÂ¯ÃÂ±ÃÂ§ÃÂ ÃÂ¨ÃÂÃÂÃÂ´ÃÂ§ÃÂÃÂ¯ÃÂ (hidden=false)
            const visible = adminList.filter(p => !p.hidden);
            // ÃÂ¬ÃÂÃÂ¯ÃÂ§ÃÂ©ÃÂ±ÃÂ¯ÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂ³ÃÂªÃÂ ÃÂ³ÃÂÃÂ±ÃÂÃÂ©ÃÂ
            _hardcodedProducts.length = 0;
            visible.forEach(p => _hardcodedProducts.push(p));
        }
    } catch(e) {
        console.warn('Admin products load failed, using defaults:', e);
    }
})();

// ÃÂ¦ÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂ´ÃÂ ÃÂ¨ÃÂÃÂ©ÃÂ§ÃÂ± ÃÂ¯ÃÂÃÂª Ã¢ÂÂ ÃÂ¦ÃÂÃÂ¯ÃÂÃÂÃÂ ÃÂ¯ÃÂÃÂÃÂ ÃÂÃÂ§ÃÂ ÃÂÃÂÃÂ¯ÃÂÃÂÃÂ
const products = _hardcodedProducts;

// ==========================================
// ÃÂ¯ÃÂÃÂÃÂ¨ÃÂ§ÃÂ
// ==========================================
let cart = [];
let currentCategory = 'cake';
let isGlobalSearch = false;

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
    document.getElementById('imageModalName').textContent = product.name + ' Ã¢ÂÂ ' + product.description;
    document.getElementById('imageModalPrice').textContent = product.price > 0 ? product.price.toLocaleString() + ' IQD' : 'ÃÂ¾ÃÂ±ÃÂ³ÃÂÃÂ§ÃÂ± ÃÂ¨ÃÂ©ÃÂ';
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
// Init
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    try {
        createImageModal();
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
        if (val.trim().length > 0) {
            isGlobalSearch = true;
            renderGlobalSearch(val.trim());
        } else {
            isGlobalSearch = false;
            renderProducts();
            updateCategoryTitle();
        }
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
            if (el) el.textContent = categories[m[1]].count + ' ÃÂ©ÃÂ§ÃÂµÃÂ§';
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

// ==========================================
// Lazy Loading
// ==========================================
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
    const priceText = product.price > 0 ? product.price.toLocaleString() + ' IQD' : 'ÃÂ¾ÃÂ±ÃÂ³ÃÂÃÂ§ÃÂ± ÃÂ¨ÃÂ©ÃÂ';
    return `
    <div class="product-card" style="animation-delay:${index * 0.04}s">
        <div class="product-image" onclick="openImageModal('${product.id}')" style="cursor:zoom-in;">
            <img ${imgAttr} alt="${product.name}" decoding="async"
                onerror="this.src='${PLACEHOLDER}'">
            <div class="product-overlay">
                <div style="color:white;font-size:28px;opacity:0.9;"><i class="fas fa-magnifying-glass-plus"></i></div>
            </div>
        </div>
        <div class="product-content">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
                <div class="product-price">
                    <span class="price-label">ÃÂÃÂ±ÃÂ®</span>
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
    if (countEl) countEl.textContent = filtered.length + ' ÃÂ©ÃÂ§ÃÂµÃÂ§';
    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
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
    if (titleEl) titleEl.innerHTML = `<i class="fas fa-search"></i> ÃÂ¦ÃÂÃÂÃÂ¬ÃÂ§ÃÂÃÂ ÃÂ¯ÃÂÃÂÃÂ§ÃÂ: "${query}"`;
    if (countEl) countEl.textContent = filtered.length + ' ÃÂ©ÃÂ§ÃÂµÃÂ§';
    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    if (emptyState) emptyState.style.display = 'none';
    const grouped = {};
    filtered.forEach(p => { if (!grouped[p.category]) grouped[p.category] = []; grouped[p.category].push(p); });
    let html = '';
    Object.keys(grouped).forEach(cat => {
        const catInfo = categories[cat];
        html += `<div class="global-search-group" style="grid-column:1/-1;margin-top:12px;margin-bottom:4px;">
            <div style="display:flex;align-items:center;gap:8px;padding:8px 4px;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:8px;">
                <div style="width:32px;height:32px;background:rgba(249,115,22,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f97316;font-size:14px;"><i class="fas ${catInfo.icon}"></i></div>
                <span style="color:white;font-weight:700;font-size:15px;">${catInfo.name}</span>
                <span style="color:rgba(255,255,255,0.4);font-size:12px;">${grouped[cat].length} ÃÂ©ÃÂ§ÃÂµÃÂ§</span>
            </div></div>`;
        grouped[cat].forEach((product, index) => { html += buildProductCard(product, index); });
    });
    grid.innerHTML = html;
    if (imgObserver) grid.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ==========================================
// ÃÂÃÂ§ÃÂ¯ÃÂÃÂÃÂÃÂ±ÃÂ ÃÂ³ÃÂÃÂ¨ÃÂÃÂªÃÂ
// ==========================================
function initCartReminder() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (cart.length > 0) localStorage.setItem('cartReminderPending', '1');
        } else {
            const pending = localStorage.getItem('cartReminderPending');
            if (pending && cart.length > 0) {
                localStorage.removeItem('cartReminderPending');
                setTimeout(() => showCartReminder(), 1500);
            }
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
            <div style="width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">Ã°ÂÂÂ</div>
            <div><div style="color:white;font-weight:700;font-size:14px;">${totalItems} ÃÂ©ÃÂ§ÃÂµÃÂ§ÃÂª ÃÂÃÂ ÃÂ³ÃÂÃÂ¨ÃÂÃÂªÃÂÃÂ¯ÃÂ§ÃÂÃÂ!</div><div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:2px;">ÃÂ¯ÃÂ§ÃÂÃÂ§ÃÂ©ÃÂ§ÃÂ±ÃÂÃÂÃÂ©ÃÂÃÂª ÃÂªÃÂÃÂÃÂ§ÃÂ ÃÂ¨ÃÂ©ÃÂ</div></div>
        </div>
        <div style="display:flex;gap:8px;flex-shrink:0;">
            <button onclick="toggleCart();document.getElementById('cartReminder')?.remove();" style="padding:8px 16px;background:white;color:#f97316;border:none;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;">ÃÂ¨ÃÂÃÂÃÂÃÂ</button>
            <button onclick="document.getElementById('cartReminder')?.remove();" style="width:34px;height:34px;background:rgba(255,255,255,0.15);border:none;border-radius:50%;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">Ã¢ÂÂ</button>
        </div>`;
    document.body.appendChild(reminder);
    setTimeout(() => {
        if (reminder.parentNode) {
            reminder.style.opacity = '0'; reminder.style.transform = 'translateY(20px)'; reminder.style.transition = 'all 0.3s ease';
            setTimeout(() => reminder.remove(), 300);
        }
    }, 12000);
}

function createGlobalSearchBtn() {
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn || document.getElementById('globalSearchBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'globalSearchBtn';
    btn.className = 'cart-btn';
    btn.style.cssText = 'background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);';
    btn.innerHTML = `<i class="fas fa-search"></i>`;
    btn.title = 'ÃÂ¯ÃÂÃÂÃÂ§ÃÂÃÂ ÃÂ¯ÃÂ´ÃÂªÃÂ';
    btn.onclick = () => {
        const input = document.getElementById('searchInputMobile') || document.getElementById('searchInput');
        if (input) { input.focus(); window.scrollTo({ top: 100, behavior: 'smooth' }); }
    };
    cartBtn.parentNode.insertBefore(btn, cartBtn);
}

// ==========================================
// ÃÂ³ÃÂÃÂ¨ÃÂÃÂªÃÂ
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
    showToast(product.name + ' ÃÂ²ÃÂÃÂ§ÃÂ¯ÃÂ©ÃÂ±ÃÂ§ Ã¢ÂÂ', 'success');
    const btn = document.querySelector('.cart-btn');
    if (btn) { btn.style.transform = 'scale(1.15)'; setTimeout(() => btn.style.transform = '', 200); }
}

function updateCartUI() {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const g = id => document.getElementById(id);
    if (g('cartCount')) g('cartCount').textContent = totalItems;
    if (g('cartItemsCount')) g('cartItemsCount').textContent = totalItems + ' ÃÂ©ÃÂ§ÃÂµÃÂ§';
    if (g('totalItems')) g('totalItems').textContent = totalItems;
    if (g('totalPrice')) g('totalPrice').textContent = totalPrice.toLocaleString() + ' IQD';
    const cartItemsEl = g('cartItems');
    if (!cartItemsEl) return;
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<div class="cart-empty"><div class="empty-cart-icon"><i class="fas fa-shopping-cart"></i></div><h4>ÃÂ³ÃÂÃÂ¨ÃÂÃÂªÃÂ ÃÂ¨ÃÂÃÂªÃÂ§ÃÂµÃÂ</h4><p>ÃÂ©ÃÂ§ÃÂµÃÂ§ÃÂ ÃÂ¯ÃÂµÃÂ®ÃÂÃÂ§ÃÂ²ÃÂª ÃÂ²ÃÂÃÂ§ÃÂ¯ ÃÂ¨ÃÂ©ÃÂ</p></div>`;
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
                <span class="cart-item-price">${item.price > 0 ? (item.price * item.quantity).toLocaleString() + ' IQD' : 'ÃÂ¾ÃÂ±ÃÂ³ÃÂÃÂ§ÃÂ± ÃÂ¨ÃÂ©ÃÂ'}</span>
            </div>
        </div>`).join('');
}

function increaseQty(i) { cart[i].quantity++; saveCart(); updateCartUI(); }
function decreaseQty(i) { if (cart[i].quantity > 1) cart[i].quantity--; else cart.splice(i, 1); saveCart(); updateCartUI(); }
function removeFromCart(i) { cart.splice(i, 1); saveCart(); updateCartUI(); showToast('ÃÂ©ÃÂ§ÃÂµÃÂ§ ÃÂÃÂ§ÃÂ¨ÃÂ±ÃÂ§', 'info'); }

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
    if (cart.length === 0) { showToast('ÃÂ³ÃÂÃÂ¨ÃÂÃÂªÃÂ ÃÂ¨ÃÂÃÂªÃÂ§ÃÂµÃÂ!', 'error'); return; }
    const name = (document.getElementById('customerName')?.value || '').trim();
    const phone = (document.getElementById('customerPhone')?.value || '').trim();
    if (!name || !phone) { showToast('ÃÂÃÂ§ÃÂ ÃÂ ÃÂÃÂÃÂ§ÃÂ±ÃÂ ÃÂ¨ÃÂÃÂÃÂÃÂ³ÃÂ', 'error'); return; }

    const now = new Date();
    const timeStr = now.toLocaleString('ar-IQ');

    let msg = `Ã°ÂÂÂ *ÃÂ¯ÃÂ§ÃÂÃÂ§ÃÂ©ÃÂ§ÃÂ±ÃÂ ÃÂÃÂÃÂ*\n`;
    msg += `Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ\n`;
    msg += `Ã°ÂÂÂ¤ *ÃÂÃÂ§ÃÂ:* ${name}\n`;
    msg += `Ã°ÂÂÂ± *ÃÂªÃÂÃÂÃÂÃÂÃÂÃÂ:* ${phone}\n`;
    msg += `Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ\n`;
    msg += `Ã°ÂÂÂ¦ *ÃÂ©ÃÂ§ÃÂµÃÂ§ÃÂ©ÃÂ§ÃÂ:*\n`;
    msg += `Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ\n`;

    cart.forEach((item, i) => {
        if (item.price > 0) {
            msg += `${i + 1}. ${item.name}\n`;
            msg += `   ${item.quantity} ÃÂ ${item.price.toLocaleString()} = ${(item.price * item.quantity).toLocaleString()} IQD\n`;
        } else {
            msg += `${i + 1}. ${item.name} ÃÂ ${item.quantity}\n`;
        }
    });

    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    msg += `Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ\n`;
    if (total > 0) msg += `Ã°ÂÂÂ° *ÃÂ©ÃÂÃÂ ÃÂ¯ÃÂ´ÃÂªÃÂ:* ${total.toLocaleString()} IQD\n`;
    msg += `Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ\n`;
    msg += `Ã¢ÂÂ° ${timeStr}\n`;
    msg += `Ã¢ÂÂ ÃÂªÃÂ©ÃÂ§ÃÂÃÂ ÃÂ¯ÃÂµÃÂÃÂÃÂ§ÃÂ¨ÃÂÃÂÃÂ ÃÂÃÂ ÃÂ¯ÃÂ§ÃÂÃÂ§ÃÂ©ÃÂ§ÃÂ±ÃÂÃÂÃÂ©ÃÂÃÂ`;

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
