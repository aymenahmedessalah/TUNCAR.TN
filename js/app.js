/**
 * TUNCAR Core Logic & Security Authentication
 */
const SECURITY_GATE = {
    masterPass: "TuncarMaster2026", // رمز العبور الماستر الخاص بك
    dashboardURL: "dashboard.html"
};

/**
 * دالة طلب صلاحيات المالك لفتح لوحة التحكم العليا
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
 * حقن لوحة المراقبة الأسطورية وإخفاء معالم الموقع العادي
 */
function launchHQDashboard() {
    const siteWrapper = document.getElementById('site-wrapper');

    if (siteWrapper) {
        // تحويل الواجهة بالكامل وبأبعاد الشاشة المطلقة لغرفة العمليات
        siteWrapper.innerHTML = `
            <iframe src="${SECURITY_GATE.dashboardURL}" style="width: 100%; height: 100vh; border: none; background: #030712; margin:0; padding:0; position:fixed; top:0; left:0; z-index:999999;"></iframe>
        `;
    }
}

// تشغيل نظام الاختصار الذكي المباشر (Ctrl + Shift + A) للمالك
window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
        e.preventDefault();
        requestAdminAccess();
    }
});
