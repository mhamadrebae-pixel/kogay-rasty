// ==========================================
// chatbot.js — چاتبۆتی کۆگای ڕاستی
// ==========================================
 
const CHAT_KB = {
    ku: [
        { keys: ['سڵاو','hello','hi','سلام'], reply: 'سڵاو! 👋 خۆش بووی بەرپرسێتی. چۆن یارمەتیت بدەم؟' },
        { keys: ['نرخ','price','چەند'], reply: 'نرخی هەر کاڵایەک لەسەر کارتەکەی خۆیدا نووسراوە. ئەگەر "پرسیار بکە" نووسیبوو، پەیوەندی ئێمە بکە 📱' },
        { keys: ['گەیاندن','delivery','دەگەیت'], reply: 'گەیاندن لە ناو شار بە 24 کاتژمێر ئەنجام دەدرێت 🚗' },
        { keys: ['داواکاری','order','کاڵا'], reply: 'کاڵاکەت هەڵبژێرە، بیخەرە سەبەتەکەوە، ئینجا بیناردە واتساپ — خێرا و ئاسانە! 🛒' },
        { keys: ['تەلەفۆن','phone','ژمارە'], reply: 'ژمارەی ئێمە: +964 751 895 9614 📞' },
        { keys: ['کەیفیت','quality','باشی'], reply: 'هەموو کاڵاکانمان بە باشترین کوالیتی دێن ✅' },
        { keys: ['سوپاس','thanks','ممنون'], reply: 'خۆشحاڵ بووم یارمەتیت بدەم! 😊' },
        { keys: ['کێک','cake'], reply: 'کێکەکانمان لە بەشی کێک دادەنرێن 🎂 کلیک بکە سەر بەشی کێک!' },
        { keys: ['چیپس','chips'], reply: 'چیپسەکانمان لە بەشی چیپس دادەنرێن 🍟' },
    ],
    en: [
        { keys: ['hello','hi','hey'], reply: 'Hello! 👋 How can I help you today?' },
        { keys: ['price','cost','how much'], reply: 'Each product shows its price on the card. If it says "Ask for price", please contact us 📱' },
        { keys: ['delivery','shipping'], reply: 'Delivery within the city takes 24 hours 🚗' },
        { keys: ['order','buy'], reply: 'Add items to cart and send via WhatsApp — quick and easy! 🛒' },
        { keys: ['phone','number','contact'], reply: 'Our number: +964 751 895 9614 📞' },
        { keys: ['quality'], reply: 'All our products are top quality ✅' },
        { keys: ['thanks','thank you'], reply: 'You\'re welcome! Happy to help 😊' },
        { keys: ['cake'], reply: 'Our cakes are in the Cake section 🎂 Click on Cake!' },
        { keys: ['chips'], reply: 'Our chips are in the Chips section 🍟' },
    ]
};
 
let chatOpen = false;
let chatLang = 'ku';
const chatHistory = [];
 
function initChatbot() {
    if (document.getElementById('chatWidget')) return;
 
    const widget = document.createElement('div');
    widget.id = 'chatWidget';
    widget.innerHTML = `
        <button id="chatToggleBtn" onclick="toggleChat()" title="چاتبۆت">
            <i class="fas fa-comment-dots" id="chatIcon"></i>
            <span class="chat-badge" id="chatBadge" style="display:none">1</span>
        </button>
        <div id="chatBox" style="display:none">
            <div id="chatHeader">
                <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:36px;height:36px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px">🤖</div>
                    <div>
                        <div style="font-weight:700;font-size:14px;color:white">یاریدەدەری کۆگا</div>
                        <div style="font-size:11px;color:#4ade80">● ئۆنلاینە</div>
                    </div>
                </div>
                <button onclick="toggleChat()" style="background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:28px;height:28px;color:white;cursor:pointer;font-size:14px">✕</button>
            </div>
            <div id="chatMessages"></div>
            <div id="chatInputArea">
                <input id="chatInput" type="text" placeholder="پرسیارەکەت بنووسە..." onkeydown="if(event.key==='Enter')sendChatMsg()">
                <button onclick="sendChatMsg()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>`;
    document.body.appendChild(widget);
 
    // خۆشامەید بنێرە دوای 2 چرکە
    setTimeout(() => {
        addBotMsg('سڵاو! 👋 یاریدەدەری کۆگای ڕاستیم. چۆن یارمەتیت بدەم؟');
        const badge = document.getElementById('chatBadge');
        if (badge && !chatOpen) badge.style.display = 'flex';
    }, 2000);
}
 
function toggleChat() {
    chatOpen = !chatOpen;
    const box = document.getElementById('chatBox');
    const badge = document.getElementById('chatBadge');
    if (box) box.style.display = chatOpen ? 'flex' : 'none';
    if (badge) badge.style.display = 'none';
    if (chatOpen) {
        chatLang = typeof currentLang !== 'undefined' ? currentLang : 'ku';
        setTimeout(() => {
            const inp = document.getElementById('chatInput');
            if (inp) inp.focus();
        }, 100);
    }
}
 
function addBotMsg(text) {
    const msgs = document.getElementById('chatMessages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'chat-msg bot-msg';
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}
 
function addUserMsg(text) {
    const msgs = document.getElementById('chatMessages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'chat-msg user-msg';
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}
 
function getBotReply(msg) {
    const lang = chatLang in CHAT_KB ? chatLang : 'ku';
    const kb = CHAT_KB[lang];
    const lower = msg.toLowerCase();
    for (const entry of kb) {
        if (entry.keys.some(k => lower.includes(k))) return entry.reply;
    }
    // fallback
    const fallbacks = {
        ku: 'تکایە پرسیارەکەت ئاشکراتر بنووسە، یان پەیوەندی ئێمە بکە 📱 +964 751 895 9614',
        en: 'Please rephrase your question or contact us 📱 +964 751 895 9614'
    };
    return fallbacks[lang] || fallbacks.ku;
}
 
function sendChatMsg() {
    const inp = document.getElementById('chatInput');
    if (!inp) return;
    const msg = inp.value.trim();
    if (!msg) return;
    inp.value = '';
    addUserMsg(msg);
    // typing indicator
    const msgs = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot-msg typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    if (msgs) { msgs.appendChild(typing); msgs.scrollTop = msgs.scrollHeight; }
    setTimeout(() => {
        if (typing.parentNode) typing.remove();
        addBotMsg(getBotReply(msg));
    }, 600 + Math.random() * 400);
}