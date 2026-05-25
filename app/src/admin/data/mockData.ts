// ═══════════════════════════════════════════
// MOCK DATA — لوحة تحكم digzoom
// ═══════════════════════════════════════════

export const dashboardStats = {
  todaySales: 2847,
  todayOrders: 34,
  todayProfit: 1260,
  newCustomers: 12,
  pendingOrders: 8,
  lowStockProducts: 3,
  apiStatus: 'online' as const,
  autoDeliveryStatus: 'active' as const,
};

export const salesChart = [
  { day: 'السبت', sales: 2100, orders: 28 },
  { day: 'الأحد', sales: 3200, orders: 42 },
  { day: 'الإثنين', sales: 2800, orders: 35 },
  { day: 'الثلاثاء', sales: 4100, orders: 51 },
  { day: 'الأربعاء', sales: 3600, orders: 44 },
  { day: 'الخميس', sales: 5200, orders: 62 },
  { day: 'الجمعة', sales: 2847, orders: 34 },
];

export const topProducts = [
  { id: 1, name: 'بطاقة PlayStation 50$', sales: 89, revenue: 17355, stock: 45 },
  { id: 2, name: 'اشتراك Netflix شهري', sales: 76, revenue: 2964, stock: 999 },
  { id: 3, name: 'شحن PUBG 3250 UC', sales: 64, revenue: 6336, stock: 120 },
  { id: 4, name: 'حساب ChatGPT Plus', sales: 52, revenue: 4628, stock: 30 },
  { id: 5, name: 'بطاقة Steam 50$', sales: 48, revenue: 9072, stock: 67 },
];

export const recentOrders = [
  { id: '#ORD-2847', customer: 'أحمد الشمري', product: 'بطاقة PlayStation 50$', amount: 195, status: 'completed', date: '2025-05-26 14:30', payment: 'مدى' },
  { id: '#ORD-2846', customer: 'محمد العتيبي', product: 'اشتراك Netflix', amount: 39, status: 'processing', date: '2025-05-26 13:45', payment: 'Apple Pay' },
  { id: '#ORD-2845', customer: 'فهد القحطاني', product: 'شحن PUBG 3250 UC', amount: 99, status: 'pending', date: '2025-05-26 12:20', payment: 'فيزا' },
  { id: '#ORD-2844', customer: 'سعد الدوسري', product: 'حساب ChatGPT Plus', amount: 89, status: 'completed', date: '2025-05-26 11:10', payment: 'مدى' },
  { id: '#ORD-2843', customer: 'خالد المطيري', product: 'بطاقة Xbox 50$', amount: 195, status: 'failed', date: '2025-05-26 10:55', payment: 'ماستركارد' },
  { id: '#ORD-2842', customer: 'عبدالله الحربي', product: 'شحن Free Fire', amount: 45, status: 'refunded', date: '2025-05-26 09:30', payment: 'مدى' },
  { id: '#ORD-2841', customer: 'نواف السهلي', product: 'اشتراك Spotify', amount: 25, status: 'completed', date: '2025-05-26 08:15', payment: 'Apple Pay' },
  { id: '#ORD-2840', customer: 'تركي القحطاني', product: 'بطاقة Steam 50$', amount: 189, status: 'paid', date: '2025-05-26 07:50', payment: 'مدى' },
];

export const products = [
  { id: 1, name: 'بطاقة PlayStation 50$', category: 'gaming', price: 195, cost: 165, discount: 0, stock: 45, status: 'active', featured: true, bestseller: true, image: '/images/products/gaming/psn-card.png' },
  { id: 2, name: 'بطاقة Xbox 50$', category: 'gaming', price: 195, cost: 168, discount: 0, stock: 32, status: 'active', featured: false, bestseller: false, image: '/images/products/gaming/xbox-card.png' },
  { id: 3, name: 'بطاقة Steam 50$', category: 'gaming', price: 189, cost: 155, discount: 10, stock: 67, status: 'active', featured: true, bestseller: true, image: '/images/products/gaming/steam-card.png' },
  { id: 4, name: 'شحن PUBG 3250 UC', category: 'topup', price: 99, cost: 75, discount: 0, stock: 120, status: 'active', featured: true, bestseller: true, image: '/images/products/topup/pubg-uc-card.png' },
  { id: 5, name: 'اشتراك Netflix شهري', category: 'subscription', price: 39, cost: 25, discount: 0, stock: 999, status: 'active', featured: true, bestseller: false, image: '/images/products/subscriptions/netflix-card.png' },
  { id: 6, name: 'حساب ChatGPT Plus', category: 'ai', price: 89, cost: 60, discount: 0, stock: 15, status: 'active', featured: true, bestseller: true, image: '/images/products/ai/chatgpt-card.png' },
  { id: 7, name: 'شحن رصيد STC 20 ر.س', category: 'topup', price: 20, cost: 18, discount: 0, stock: 500, status: 'active', featured: false, bestseller: false, image: '/images/products/topup/stc-card.png' },
  { id: 8, name: 'بطاقة Roblox 800 Robux', category: 'gaming', price: 45, cost: 35, discount: 0, stock: 0, status: 'inactive', featured: false, bestseller: false, image: '/images/products/gaming/roblox-card.png' },
];

export const customers = [
  { id: 1, name: 'أحمد الشمري', email: 'ahmed@email.com', phone: '0501234567', orders: 12, totalSpent: 2340, lastOrder: '2025-05-26', status: 'active', vip: true, notes: 'عميل مميز يطلب بشكل دوري' },
  { id: 2, name: 'محمد العتيبي', email: 'mohammed@email.com', phone: '0559876543', orders: 8, totalSpent: 1560, lastOrder: '2025-05-26', status: 'active', vip: false, notes: '' },
  { id: 3, name: 'فهد القحطاني', email: 'fahad@email.com', phone: '0561112233', orders: 5, totalSpent: 890, lastOrder: '2025-05-26', status: 'active', vip: false, notes: '' },
  { id: 4, name: 'سعد الدوسري', email: 'saad@email.com', phone: '0574445566', orders: 3, totalSpent: 450, lastOrder: '2025-05-25', status: 'inactive', vip: false, notes: 'ما طلب من شهر' },
  { id: 5, name: 'خالد المطيري', email: 'khaled@email.com', phone: '0587778899', orders: 20, totalSpent: 5670, lastOrder: '2025-05-24', status: 'active', vip: true, notes: 'أعلى عميل مبيعات' },
];

export const codes = [
  { id: 1, code: 'XXXX-XXXX-1234', product: 'بطاقة PlayStation 50$', status: 'available', orderId: null, usedAt: null },
  { id: 2, code: 'XXXX-XXXX-5678', product: 'بطاقة PlayStation 50$', status: 'sold', orderId: '#ORD-2847', usedAt: '2025-05-26 14:35' },
  { id: 3, code: 'XXXX-XXXX-9012', product: 'بطاقة Xbox 50$', status: 'available', orderId: null, usedAt: null },
  { id: 4, code: 'XXXX-XXXX-3456', product: 'اشتراك Netflix', status: 'sold', orderId: '#ORD-2846', usedAt: '2025-05-26 13:50' },
  { id: 5, code: 'XXXX-XXXX-7890', product: 'بطاقة PlayStation 50$', status: 'available', orderId: null, usedAt: null },
  { id: 6, code: 'XXXX-XXXX-2468', product: 'حساب ChatGPT Plus', status: 'low', orderId: null, usedAt: null },
];

export const socialServices = [
  { id: 1, name: 'متابعين انستقرام', platform: 'instagram', type: 'followers', price: 25, cost: 12, profit: 13, status: 'active', deliveryTime: '1-6 ساعات', provider: 'Provider A', apiStatus: 'online' },
  { id: 2, name: 'لايكات تيك توك', platform: 'tiktok', type: 'likes', price: 15, cost: 7, profit: 8, status: 'active', deliveryTime: 'فوري', provider: 'Provider B', apiStatus: 'online' },
  { id: 3, name: 'مشاهدات يوتيوب', platform: 'youtube', type: 'views', price: 35, cost: 18, profit: 17, status: 'active', deliveryTime: '6-12 ساعة', provider: 'Provider C', apiStatus: 'warning' },
  { id: 4, name: 'متابعين تويتر', platform: 'twitter', type: 'followers', price: 30, cost: 15, profit: 15, status: 'paused', deliveryTime: '1-3 ساعات', provider: 'Provider A', apiStatus: 'offline' },
  { id: 5, name: 'لايكات سناب شات', platform: 'snapchat', type: 'likes', price: 20, cost: 10, profit: 10, status: 'active', deliveryTime: 'فوري', provider: 'Provider D', apiStatus: 'online' },
];

export const subscriptions = [
  { id: 1, account: 'gpt-account-01@digzoom.com', product: 'ChatGPT Plus', expiryDate: '2025-06-15', status: 'active', deliveryCount: 8, maxUsers: 10 },
  { id: 2, account: 'netflix-acc-03@digzoom.com', product: 'Netflix', expiryDate: '2025-06-01', status: 'expiring', deliveryCount: 4, maxUsers: 5 },
  { id: 3, account: 'spotify-prem-02@digzoom.com', product: 'Spotify', expiryDate: '2025-07-20', status: 'active', deliveryCount: 12, maxUsers: 1 },
  { id: 4, account: 'canva-pro-01@digzoom.com', product: 'Canva Pro', expiryDate: '2025-05-30', status: 'expired', deliveryCount: 20, maxUsers: 5 },
  { id: 5, account: 'mj-acc-05@digzoom.com', product: 'Midjourney', expiryDate: '2025-08-10', status: 'active', deliveryCount: 3, maxUsers: 3 },
];

export const coupons = [
  { id: 1, code: 'DIGZOOM25', type: 'percentage', value: 25, usageLimit: 100, usageCount: 67, startDate: '2025-05-01', endDate: '2025-06-01', status: 'active' },
  { id: 2, code: 'MEGA50', type: 'percentage', value: 50, usageLimit: 50, usageCount: 12, startDate: '2025-05-15', endDate: '2025-06-15', status: 'active' },
  { id: 3, code: 'FIRST10', type: 'fixed', value: 10, usageLimit: 200, usageCount: 156, startDate: '2025-04-01', endDate: '2025-07-01', status: 'active' },
  { id: 4, code: 'WEEKEND', type: 'percentage', value: 20, usageLimit: 0, usageCount: 89, startDate: '2025-05-01', endDate: '2025-12-31', status: 'active' },
  { id: 5, code: 'FLASH2025', type: 'percentage', value: 30, usageLimit: 20, usageCount: 20, startDate: '2025-05-20', endDate: '2025-05-25', status: 'expired' },
];

export const notifications = [
  { id: 1, type: 'new_order', title: 'طلب جديد', message: 'طلب #ORD-2847 من أحمد الشمري', time: 'منذ 5 دقائق', read: false },
  { id: 2, type: 'payment', title: 'دفع ناجح', message: 'تم الدفع لطلب #ORD-2844 — 89 ر.س', time: 'منذ 15 دقيقة', read: false },
  { id: 3, type: 'low_stock', title: 'نفاد مخزون', message: 'حساب ChatGPT Plus — باقي 15 فقط', time: 'منذ 30 دقيقة', read: false },
  { id: 4, type: 'api_error', title: 'فشل API', message: 'Provider C — مشاهدات يوتيوب غير متاح', time: 'منذ ساعة', read: true },
  { id: 5, type: 'new_customer', title: 'عميل جديد', message: 'عبدالله الحربي سجل للمرة الأولى', time: 'منذ ساعتين', read: true },
];

export const logs = [
  { id: 1, user: 'admin', action: 'إضافة منتج', target: 'بطاقة Nintendo 50$', time: '2025-05-26 14:00' },
  { id: 2, user: 'manager', action: 'تغيير سعر', target: 'بطاقة Steam 50$ — 189 → 179', time: '2025-05-26 13:30' },
  { id: 3, user: 'admin', action: 'تسليم كود', target: '#ORD-2847 — PlayStation', time: '2025-05-26 14:35' },
  { id: 4, user: 'support', action: 'تغيير حالة طلب', target: '#ORD-2843 — failed → refunded', time: '2025-05-26 11:00' },
  { id: 5, user: 'admin', action: 'إنشاء كوبون', target: 'FLASH2025 — 30%', time: '2025-05-26 10:00' },
];

export const profitData = [
  { month: 'يناير', revenue: 45000, cost: 28000, profit: 17000 },
  { month: 'فبراير', revenue: 52000, cost: 32000, profit: 20000 },
  { month: 'مارس', revenue: 48000, cost: 29000, profit: 19000 },
  { month: 'أبريل', revenue: 61000, cost: 36000, profit: 25000 },
  { month: 'مايو', revenue: 58000, cost: 34000, profit: 24000 },
];

// Role permissions
export const roles = [
  { id: 'admin', name: 'Admin', permissions: ['all'] },
  { id: 'product_manager', name: 'Product Manager', permissions: ['products', 'codes', 'analytics'] },
  { id: 'orders_manager', name: 'Orders Manager', permissions: ['orders', 'customers', 'delivery'] },
  { id: 'support', name: 'Support Agent', permissions: ['orders', 'customers', 'tickets'] },
  { id: 'marketing', name: 'Marketing Manager', permissions: ['coupons', 'content', 'social', 'analytics'] },
];
