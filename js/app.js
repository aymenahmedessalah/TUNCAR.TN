/**
 * TUNCAR Core Navigation & Security System
 */

const SECURITY_GATE = {
    masterPass: "TuncarMaster2026", // رمز الماستر الخاص بك للعبور
    dashboardURL: "dashboard.html"
};

/**
 * دالة التنقل الديناميكي الذكي بين الصفحات (SPA Navigation)
 * @param {string} pageId - اسم الصفحة المراد الذهاب إليها
 */
function navigateTo(pageId) {
    // 1. إخفاء جميع الصفحات أولاً
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 2. إزالة الإضاءة (Active) من كافة أزرار الـ Navbar
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // 3. إظهار الصفحة المطلوبة فقط
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 4. إضاءة الزر الذي تم الضغط عليه حالياً
    const targetLink = document.getElementById(`link-${pageId}`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // العودة التلقائية لأعلى الصفحة عند التبديل
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * بوابة المصادقة وطلب صلاحيات المالك
 */
function requestAdminAccess() {
    const userInput = prompt("🚨 نظام التحكم الأعلى لمالك الموقع - أدخل الماستر باس للعبور:");
    
    if (userInput === SECURITY_GATE.masterPass) {
        alert("🔓 تم التحقق من الهوية بنجاح. جاري تشغيل شاشات المراقبة والتدفق الحي...");
        launchHQDashboard();
    } else if (userInput !== null) {
        alert("❌ رمز العبور غير صحيح! تم تسجيل هذه المحاولة كخرق أمني محتمل.");
    }
}

/**
 * حقن واجهة التحكم العليا وإلغاء الواجهات العادية
 */
function launchHQDashboard() {
    const siteWrapper = document.getElementById('site-wrapper');
    if (siteWrapper) {
        siteWrapper.innerHTML = `
            <iframe src="${SECURITY_GATE.dashboardURL}" style="width: 100%; height: 100vh; border: none; background: #030712; margin:0; padding:0; position:fixed; top:0; left:0; z-index:999999;"></iframe>
        `;
    }
}

// تشغيل الاختصار الكودي السري الفوقي (Ctrl + Shift + A) للمالك
window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
        e.preventDefault();
        requestAdminAccess();
    }
});
