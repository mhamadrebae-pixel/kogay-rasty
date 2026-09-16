// ========================================================
// کۆنفگی سیستمی ئۆنلاین — کۆگای ڕاستی (Kogay Rasty Cloud)
// تەواو بێبەرامبەر ($0) — 24/7 ئۆنلاین لەسەر سێرڤەری گووگڵ
// ========================================================

const APP_CONFIG = {
  // ناوی فرۆشگا
  storeName: "کۆگای ڕاستی",
  storeSubtitle: "فرۆشگای تایبەت",
  
  // ژمارەی واتسئەپ بۆ وەرگرتنی داواکاری کڕیاران
  whatsappNumber: "+9647500000000",

  // پاسۆردی چوونەژوورەوەی ئەدمین لە مۆبایل (دەتوانیت هەر ژمارەیەک دابنێیت)
  adminPin: "1234",

  // کلیلی سێرڤەری وێنەی خۆڕایی (ImgBB)
  imgbbApiKey: "a31f3f04ad92c806d5c8851cf257ad66",

  // سێرڤەری گووگڵ (Firebase Realtime Database)
  firebaseConfig: {
    databaseURL: "https://kogay-raste-default-rtdb.firebaseio.com",
    projectId: "kogay-raste"
  }
};

if (typeof window !== 'undefined') {
  window.APP_CONFIG = APP_CONFIG;
}
if (typeof module !== 'undefined') {
  module.exports = APP_CONFIG;
}
