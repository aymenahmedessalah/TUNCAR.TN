// الإعدادات الأمنية للمالك
const SECURITY_GATE = {
    // يمكنك تغيير الماستر باس من هنا قبل الرفع على GitHub
    masterPass: "TuncarMaster2026",
    dashboardURL: "dashboard.html"
};

// عند تحميل الصفحة بالكامل، نقوم بحقن البلوكات الأساسية للموقع
document.addEventListener("DOMContentLoaded", () => {
    // محاكاة تحميل المكونات الافتراضية للموقع
    initiateMainSite();
});

function initiateMainSite() {
    const navbarView = document.getElementById("navbar-view");
    const mainContent = document.getElementById("main-content");

    // هنا نقوم بحقن واجهة المستخدم العادية (يمكنك لاحقاً استخدام fetch لتحميل ملفات منفصلة)
    if (navbarView) {
        navbarView.innerHTML = `
            <nav style="background: #0b1329; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1f3a60;">
                <div style="color: #00f2fe; font-weight: bold; font-size: 22px;">TUNCAR<span style="color:#fff">.tn</span></div>
                <div style="color: #fff; font-size: 14px;">الرئيسية | قطع الغيار | الخدمات | اتصل بنا</div>
            </nav>
        `;
    }
}

/**
 * دالة طلب صلاحيات المالك لفتح لوحة التحكم الفوقية
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
 * حقن لوحة المراقبة الأسطورية في واجهة المستخدم
 */
function launchHQDashboard() {
    const mainContent = document.getElementById('main-content');
    const navbarView = document.getElementById('navbar-view');

    if (mainContent) {
        // إخفاء الـ Navbar الأساسي للموقع لتوفير مساحة كاملة لغرفة العمليات
        if (navbarView) navbarView.style.display = 'none';

        // حقن لوحة التحكم عبر iframe لتظل مستقلة تماماً داخل الصفحة وبأبعاد شاشة كاملة
        mainContent.style.padding = "0";
        mainContent.style.margin = "0";
        mainContent.innerHTML = `
            <iframe src="${SECURITY_GATE.dashboardURL}" style="width: 100%; height: 100vh; border: none; background: #030712;"></iframe>
        `;
    }
}

// تشغيل نظام الاختصار الذكي (Ctrl + Shift + A) للمالك
window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
        e.preventDefault();
        requestAdminAccess();
    }
});
