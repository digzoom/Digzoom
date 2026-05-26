import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router';
import { trpc } from '@/providers/trpc';
import {
  LayoutDashboard, ShoppingBag, Package, Tag, Server,
  Settings, Search, CheckCircle, Plus, Edit3, Trash2,
  X, Check, LogOut, BarChart3, ArrowUpRight,
  Users, DollarSign, CreditCard, TrendingUp,
  Bell, AlertTriangle, RefreshCw, MessageSquare,
  ChevronRight, Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/* ─────────── LocalStorage Helpers ─────────── */
const LS_PRODUCTS = 'digzoom_admin_products_v2';
const LS_COUPONS = 'digzoom_admin_coupons_v2';

let nextId = Date.now();

interface LocalProduct {
  id: number; slug: string; titleAr: string; titleEn: string;
  descriptionAr: string; descriptionEn: string; price: number;
  originalPrice: number; image: string; categoryId: number;
  fileType: string; fileSize: string; features: string[];
  inStock: boolean; createdAt: string;
}

interface LocalCoupon {
  id: number; code: string; discountType: 'percentage' | 'fixed';
  discountValue: number; minOrderAmount: number;
  maxUses: number | null; usedCount: number;
  expiresAt: string | null; isActive: boolean;
  createdAt: string;
}

function loadLocalProducts(): LocalProduct[] {
  try { const saved = localStorage.getItem(LS_PRODUCTS); return saved ? JSON.parse(saved) : []; } catch { return []; }
}
function saveLocalProducts(items: LocalProduct[]) { localStorage.setItem(LS_PRODUCTS, JSON.stringify(items)); }

function loadLocalCoupons(): LocalCoupon[] {
  try { const saved = localStorage.getItem(LS_COUPONS); return saved ? JSON.parse(saved) : []; } catch { return []; }
}
function saveLocalCoupons(items: LocalCoupon[]) { localStorage.setItem(LS_COUPONS, JSON.stringify(items)); }

const statusConfig: Record<string, { color: string; bg: string }> = {
  pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  processing: { color: 'text-blue-400', bg: 'bg-blue-500/10' },
  completed: { color: 'text-green-400', bg: 'bg-green-500/10' },
  cancelled: { color: 'text-red-400', bg: 'bg-red-500/10' },
};

type TabType = 'dashboard' | 'products' | 'coupons' | 'orders' | 'providers' | 'settings';

/* ══════════════════════════════════════════ */
export default function AdminDashboard() {
  const { lang } = useLanguage();
  const { isAdmin, logout } = useAuth();
  const isAr = lang === 'ar';
  const navigate = useNavigate();
  const t = (ar: string, en: string) => (isAr ? ar : en);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  // Skip admin check in preview mode (no backend) - allow direct access
  // useEffect(() => { if (!isAdmin) navigate('/'); }, [isAdmin, navigate]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => { setToast({ message, type }); };
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(null), 3000); return () => clearTimeout(timer); } }, [toast]);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t('الرئيسية', 'Dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'products', label: t('المنتجات', 'Products'), icon: <Package className="w-5 h-5" /> },
    { id: 'coupons', label: t('الكوبونات', 'Coupons'), icon: <Tag className="w-5 h-5" /> },
    { id: 'orders', label: t('الطلبات', 'Orders'), icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'providers', label: t('المزودين', 'Providers'), icon: <Server className="w-5 h-5" /> },
    { id: 'settings', label: t('الإعدادات', 'Settings'), icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-8" dir={isAr ? 'rtl' : 'ltr'}>
      {toast && (
        <div className={`fixed top-24 ${isAr ? 'left-4' : 'right-4'} z-[100] px-6 py-3 rounded-xl font-medium shadow-lg ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.message}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{t('لوحة التحكم', 'Admin Dashboard')}</h1>
            <p className="text-gray-500 mt-1">{t('إدارة المنتجات والكوبونات والطلبات', 'Manage products, coupons & orders')}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
            <LogOut className="w-4 h-4" /> {t('خروج', 'Logout')}
          </button>
        </div>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'dashboard' && <DashboardTab isAr={isAr} t={t} />}
        {activeTab === 'products' && <ProductsTab isAr={isAr} t={t} showToast={showToast} />}
        {activeTab === 'coupons' && <CouponsTab isAr={isAr} t={t} showToast={showToast} />}
        {activeTab === 'orders' && <OrdersTab isAr={isAr} t={t} />}
        {activeTab === 'providers' && <ProvidersTab isAr={isAr} t={t} />}
        {activeTab === 'settings' && <SettingsTab isAr={isAr} t={t} />}
      </div>
    </div>
  );
}

/* ── Weekly Sales Data ── */
const weeklySalesData = [
  { day: 'السبت', sales: 28 },
  { day: 'الأحد', sales: 42 },
  { day: 'الإثنين', sales: 35 },
  { day: 'الثلاثاء', sales: 51 },
  { day: 'الأربعاء', sales: 44 },
  { day: 'الخميس', sales: 62 },
  { day: 'الجمعة', sales: 34 },
];

/* ── Notifications Data ── */
const notifications = [
  { id: 1, title: 'طلب جديد', desc: 'طلب #ORD-2847 من أحمد الشمري', time: 'منذ 5 دقائق', type: 'info' },
  { id: 2, title: 'دفع ناجح', desc: 'تم الدفع لطلب #89 — ORD-2844', time: 'منذ 15 دقيقة', type: 'success' },
  { id: 3, title: 'نفاد مخزون', desc: 'حساب ChatGPT Plus — باقي 15 فقط', time: 'منذ 30 دقيقة', type: 'warning' },
  { id: 4, title: 'فشل API', desc: 'Provider C — مشاهدات يوتيوب غير متاح', time: 'منذ ساعة', type: 'error' },
  { id: 5, title: 'عميل جديد', desc: 'عبدالله الحربي سجل للمرة الأولى', time: 'منذ ساعتين', type: 'info' },
];

/* ═══════ DASHBOARD ═══════ */
function DashboardTab({ isAr, t }: { isAr: boolean; t: (ar: string, en: string) => string }) {
  const products = loadLocalProducts();
  const coupons = loadLocalCoupons();
  const [autoDelivery, setAutoDelivery] = useState(false);

  /* Stats */
  const stats = [
    { label: 'عملاء جديد', sub: 'اليوم', value: '12+', icon: <Users className="w-5 h-5" />, trend: '+8%', iconBg: 'bg-orange-500/20 text-orange-400', cardBg: 'bg-[#13131f]' },
    { label: 'الأرباح', sub: 'هامش %44', value: '1,260', prefix: 'ر.س', icon: <DollarSign className="w-5 h-5" />, trend: '+12%', iconBg: 'bg-purple-500/20 text-purple-400', cardBg: 'bg-[#13131f]' },
    { label: 'الطلبات', sub: 'معلقة 8', value: '34', icon: <ShoppingBag className="w-5 h-5" />, trend: '+5%', iconBg: 'bg-blue-500/20 text-blue-400', cardBg: 'bg-[#13131f]' },
    { label: 'مبيعات اليوم', sub: 'طلب 34', value: '2,847', prefix: 'ر.س', icon: <TrendingUp className="w-5 h-5" />, trend: '+18%', iconBg: 'bg-emerald-500/20 text-emerald-400', cardBg: 'bg-[#13131f]' },
  ];

  const notifDot = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500';
      case 'success': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Badges */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setAutoDelivery(!autoDelivery)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${autoDelivery ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
        >
          <RefreshCw className={`w-4 h-4 ${autoDelivery ? 'animate-spin' : ''}`} />
          Auto Delivery
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          API Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`${s.cardBg} border border-white/[0.04] rounded-2xl p-5 relative overflow-hidden`}>
            {/* Top row: trend + icon */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {s.trend}
              </span>
              <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                {s.icon}
              </div>
            </div>
            {/* Value */}
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white">{s.value}</span>
              {s.prefix && <span className="text-gray-400 text-sm">{s.prefix}</span>}
            </div>
            {/* Label */}
            <div className="mt-1">
              <span className="text-gray-400 text-sm">{s.label}</span>
              <span className="text-gray-600 text-xs mr-2">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row: Notifications + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications Panel */}
        <div className="lg:col-span-1 bg-[#13131f] border border-white/[0.04] rounded-2xl overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold">الإشعارات</h3>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">3 جديد</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {notifications.map(n => (
              <div key={n.id} className="p-4 hover:bg-white/[0.02] transition-colors flex items-start gap-3">
                <span className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${notifDot(n.type)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium">{n.title}</p>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{n.desc}</p>
                  <p className="text-gray-600 text-[11px] mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          {/* API Status at bottom */}
          <div className="p-4 border-t border-white/[0.04]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">فشل API</span>
              <span className="text-gray-600">Provider C — مشاهدات يوتيوب غير متاح</span>
            </div>
            <p className="text-gray-700 text-[11px] mt-1">منذ ساعة</p>
          </div>
          <div className="p-4 border-t border-white/[0.04]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">عميل جديد</span>
              <span className="text-gray-600">عبدالله الحربي سجل للمرة الأولى</span>
            </div>
            <p className="text-gray-700 text-[11px] mt-1">منذ ساعتين</p>
          </div>
        </div>

        {/* Weekly Sales Chart */}
        <div className="lg:col-span-2 bg-[#13131f] border border-white/[0.04] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold">مبيعات الأسبوع</h3>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySalesData} barSize={40}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                />
                <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
                  {weeklySalesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#8b5cf6' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════ PRODUCTS CRUD ═══════ */
function ProductsTab({ isAr, t, showToast }: { isAr: boolean; t: (ar: string, en: string) => string; showToast: (m: string, ty?: 'success' | 'error') => void }) {
  const [products, setProducts] = useState<LocalProduct[]>(loadLocalProducts);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LocalProduct | null>(null);
  const [form, setForm] = useState({ slug: '', titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '', price: 0, originalPrice: 0, image: '', categoryId: 1, fileType: 'ZIP', fileSize: '10 MB', features: [] as string[], inStock: true });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => { saveLocalProducts(products); }, [products]);

  const filtered = products.filter(p =>
    !search || p.titleAr.includes(search) || p.titleEn.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ slug: '', titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '', price: 0, originalPrice: 0, image: '', categoryId: 1, fileType: 'ZIP', fileSize: '10 MB', features: [], inStock: true });
    setEditing(null);
  };

  const openAdd = () => { resetForm(); setShowForm(true); };
  const openEdit = (p: LocalProduct) => {
    setEditing(p);
    setForm({ slug: p.slug, titleAr: p.titleAr, titleEn: p.titleEn, descriptionAr: p.descriptionAr, descriptionEn: p.descriptionEn, price: p.price, originalPrice: p.originalPrice, image: p.image, categoryId: p.categoryId, fileType: p.fileType, fileSize: p.fileSize, features: [...p.features], inStock: p.inStock });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.titleAr || !form.slug || form.price <= 0) { showToast(t('يرجى ملء الاسم والرابط والسعر', 'Fill name, slug and price'), 'error'); return; }
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? { ...p, ...form, id: editing.id, createdAt: editing.createdAt } : p));
      showToast(t('تم تحديث المنتج!', 'Product updated!'));
    } else {
      const newP: LocalProduct = { ...form, id: nextId++, createdAt: new Date().toISOString() };
      setProducts(prev => [newP, ...prev]);
      showToast(t('تم إضافة المنتج!', 'Product added!'));
    }
    setShowForm(false); resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm(t('حذف المنتج نهائياً؟', 'Delete product permanently?'))) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast(t('تم حذف المنتج!', 'Product deleted!'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-white font-bold text-lg">{t('إدارة المنتجات', 'Products')} <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full mr-2">{products.length}</span></h3>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
          <Plus className="w-4 h-4" /> {t('إضافة منتج', 'Add Product')}
        </button>
      </div>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('بحث...', 'Search...')}
          className="w-full bg-[#151520] border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
      </div>
      <div className="bg-[#151520] rounded-2xl border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">{t('لا توجد منتجات', 'No products')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5 text-gray-400 text-sm">
                <th className="px-4 py-3 text-right">{t('المنتج', 'Product')}</th>
                <th className="px-4 py-3 text-right">{t('السعر', 'Price')}</th>
                <th className="px-4 py-3 text-right">{t('المخزون', 'Stock')}</th>
                <th className="px-4 py-3 text-right">{t('إجراء', 'Action')}</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-white/5">
                    <td className="px-4 py-3"><div className="flex items-center gap-3">
                      <img src={p.image || '/images/placeholder.jpg'} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-800" />
                      <div><p className="text-white text-sm font-medium">{p.titleAr}</p><p className="text-gray-500 text-xs">{p.slug}</p></div>
                    </div></td>
                    <td className="px-4 py-3 text-green-400 font-bold text-sm">{p.price} ر.س</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${p.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{p.inStock ? (isAr ? 'متوفر' : 'In Stock') : (isAr ? 'نفذ' : 'Out')}</span></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#151520] rounded-2xl border border-white/10 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{editing ? t('تعديل منتج', 'Edit Product') : t('إضافة منتج جديد', 'Add New Product')}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-sm block mb-2">{t('الاسم (عربي) *', 'Name (Ar) *')}</label>
                  <input value={form.titleAr} onChange={e => setForm(p => ({ ...p, titleAr: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
                <div><label className="text-gray-400 text-sm block mb-2">{t('الاسم (English) *', 'Name (En) *')}</label>
                  <input value={form.titleEn} onChange={e => setForm(p => ({ ...p, titleEn: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" dir="ltr" /></div>
              </div>
              <div><label className="text-gray-400 text-sm block mb-2">Slug *</label>
                <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono" dir="ltr" /></div>
              <div><label className="text-gray-400 text-sm block mb-2">{t('الوصف', 'Description')}</label>
                <textarea value={form.descriptionAr} onChange={e => setForm(p => ({ ...p, descriptionAr: e.target.value }))} rows={2} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-sm block mb-2">{t('السعر *', 'Price *')}</label>
                  <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
                <div><label className="text-gray-400 text-sm block mb-2">{t('قبل الخصم', 'Original')}</label>
                  <input type="number" value={form.originalPrice} onChange={e => setForm(p => ({ ...p, originalPrice: Number(e.target.value) }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
              </div>
              <div><label className="text-gray-400 text-sm block mb-2">{t('رابط الصورة', 'Image URL')}</label>
                <input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" dir="ltr" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-sm block mb-2">{t('نوع الملف', 'File Type')}</label>
                  <input value={form.fileType} onChange={e => setForm(p => ({ ...p, fileType: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
                <div><label className="text-gray-400 text-sm block mb-2">{t('حجم الملف', 'File Size')}</label>
                  <input value={form.fileSize} onChange={e => setForm(p => ({ ...p, fileSize: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
              </div>
              <div><label className="text-gray-400 text-sm block mb-2">{t('المميزات', 'Features')}</label>
                <div className="flex gap-2 mb-2">
                  <input value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (featureInput.trim()) { setForm(p => ({ ...p, features: [...p.features, featureInput.trim()] })); setFeatureInput(''); } } }}
                    placeholder={t('أضف ميزة...', 'Add feature...')} className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm" />
                  <button onClick={() => { if (featureInput.trim()) { setForm(p => ({ ...p, features: [...p.features, featureInput.trim()] })); setFeatureInput(''); } }} className="px-3 py-2 bg-blue-600 text-white rounded-xl"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">{form.features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-white/5 text-gray-300 text-xs px-2 py-1 rounded-lg">{f}
                    <button onClick={() => setForm(p => ({ ...p, features: p.features.filter((_, j) => j !== i) }))} className="text-red-400"><X className="w-3 h-3" /></button></span>
                ))}</div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="instock" checked={form.inStock} onChange={e => setForm(p => ({ ...p, inStock: e.target.checked }))} className="w-4 h-4 rounded accent-blue-600" />
                <label htmlFor="instock" className="text-gray-300 text-sm">{t('متوفر في المخزون', 'In Stock')}</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-all">
                <Check className="w-4 h-4" /> {editing ? t('حفظ التعديلات', 'Save Changes') : t('إضافة المنتج', 'Add Product')}</button>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl text-sm transition-all">{t('إلغاء', 'Cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════ COUPONS CRUD ═══════ */
function CouponsTab({ isAr, t, showToast }: { isAr: boolean; t: (ar: string, en: string) => string; showToast: (m: string, ty?: 'success' | 'error') => void }) {
  const [coupons, setCoupons] = useState<LocalCoupon[]>(loadLocalCoupons);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LocalCoupon | null>(null);
  const [form, setForm] = useState({ code: '', discountType: 'percentage' as 'percentage' | 'fixed', discountValue: 0, minOrderAmount: 0, maxUses: 100, expiresAt: '', isActive: true });

  useEffect(() => { saveLocalCoupons(coupons); }, [coupons]);

  const filtered = coupons.filter(c => !search || c.code.includes(search.toUpperCase()));
  const isExpired = (c: LocalCoupon) => c.expiresAt && new Date(c.expiresAt) < new Date();

  const resetForm = () => { setForm({ code: '', discountType: 'percentage', discountValue: 0, minOrderAmount: 0, maxUses: 100, expiresAt: '', isActive: true }); setEditing(null); };
  const openAdd = () => { resetForm(); setShowForm(true); };
  const openEdit = (c: LocalCoupon) => {
    setEditing(c);
    setForm({ code: c.code, discountType: c.discountType, discountValue: c.discountValue, minOrderAmount: c.minOrderAmount, maxUses: c.maxUses || 100, expiresAt: c.expiresAt ? c.expiresAt.split('T')[0] : '', isActive: c.isActive });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.code || form.discountValue <= 0) { showToast(t('يرجى ملء الكود والخصم', 'Fill code and discount'), 'error'); return; }
    if (!editing && coupons.some(c => c.code === form.code.toUpperCase())) { showToast(t('الكود موجود مسبقاً', 'Code already exists'), 'error'); return; }
    if (editing) {
      setCoupons(prev => prev.map(c => c.id === editing.id ? { ...c, ...form, code: form.code.toUpperCase(), expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null, id: editing.id, createdAt: editing.createdAt } : c));
      showToast(t('تم تحديث الكوبون!', 'Coupon updated!'));
    } else {
      const newC: LocalCoupon = { ...form, code: form.code.toUpperCase(), expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null, id: nextId++, usedCount: 0, createdAt: new Date().toISOString() };
      setCoupons(prev => [newC, ...prev]);
      showToast(t('تم إضافة الكوبون!', 'Coupon added!'));
    }
    setShowForm(false); resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm(t('حذف الكوبون نهائياً؟', 'Delete coupon permanently?'))) {
      setCoupons(prev => prev.filter(c => c.id !== id));
      showToast(t('تم حذف الكوبون!', 'Coupon deleted!'));
    }
  };

  const handleToggle = (id: number) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    showToast(t('تم تغيير الحالة!', 'Status changed!'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-white font-bold text-lg">{t('إدارة الكوبونات', 'Coupons')} <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full mr-2">{coupons.length}</span></h3>
        <button onClick={openAdd} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
          <Plus className="w-4 h-4" /> {t('إضافة كوبون', 'Add Coupon')}
        </button>
      </div>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('بحث بالكود...', 'Search by code...')}
          className="w-full bg-[#151520] border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50" />
      </div>
      <div className="bg-[#151520] rounded-2xl border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">{t('لا توجد كوبونات', 'No coupons')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5 text-gray-400 text-sm">
                <th className="px-4 py-3 text-right">{t('الكود', 'Code')}</th>
                <th className="px-4 py-3 text-right">{t('الخصم', 'Discount')}</th>
                <th className="px-4 py-3 text-right">{t('الاستخدام', 'Usage')}</th>
                <th className="px-4 py-3 text-right">{t('الصلاحية', 'Expiry')}</th>
                <th className="px-4 py-3 text-right">{t('الحالة', 'Status')}</th>
                <th className="px-4 py-3 text-right">{t('إجراء', 'Action')}</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(c => (
                  <tr key={c.id} className={`hover:bg-white/5 transition-colors ${(!c.isActive || isExpired(c)) ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-3"><span className="bg-purple-500/10 text-purple-400 font-mono text-sm font-bold px-2 py-1 rounded-lg">{c.code}</span></td>
                    <td className="px-4 py-3"><span className="text-green-400 font-bold text-sm">{c.discountValue}{c.discountType === 'percentage' ? '%' : ' ر.س'}</span></td>
                    <td className="px-4 py-3"><span className="text-white text-sm">{c.usedCount} / {c.maxUses ?? '∞'}</span></td>
                    <td className="px-4 py-3"><span className={`text-sm ${isExpired(c) ? 'text-red-400' : 'text-gray-300'}`}>{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('ar-SA') : t('لا نهائي', 'No expiry')}</span></td>
                    <td className="px-4 py-3"><button onClick={() => handleToggle(c.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${c.isActive && !isExpired(c) ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {c.isActive && !isExpired(c) ? t('مفعل', 'Active') : t('معطل', 'Inactive')}</button></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1">
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Coupon Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#151520] rounded-2xl border border-white/10 p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{editing ? t('تعديل كوبون', 'Edit Coupon') : t('إضافة كوبون جديد', 'Add New Coupon')}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-gray-400 text-sm block mb-2">{t('كود الكوبون *', 'Coupon Code *')}</label>
                <input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="SAVE50"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono uppercase" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-sm block mb-2">{t('نوع الخصم', 'Discount Type')}</label>
                  <select value={form.discountType} onChange={e => setForm(p => ({ ...p, discountType: e.target.value as 'percentage' | 'fixed' }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                    <option value="percentage">{t('نسبة %', 'Percentage %')}</option>
                    <option value="fixed">{t('مبلغ ثابت (ر.س)', 'Fixed (SAR)')}</option>
                  </select></div>
                <div><label className="text-gray-400 text-sm block mb-2">{t('قيمة الخصم *', 'Discount Value *')}</label>
                  <input type="number" value={form.discountValue} onChange={e => setForm(p => ({ ...p, discountValue: Number(e.target.value) }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-sm block mb-2">{t('حد أدنى للطلب', 'Min Order')}</label>
                  <input type="number" value={form.minOrderAmount} onChange={e => setForm(p => ({ ...p, minOrderAmount: Number(e.target.value) }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
                <div><label className="text-gray-400 text-sm block mb-2">{t('عدد الاستخدامات', 'Max Uses')}</label>
                  <input type="number" value={form.maxUses} onChange={e => setForm(p => ({ ...p, maxUses: Number(e.target.value) }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
              </div>
              <div><label className="text-gray-400 text-sm block mb-2">{t('تاريخ الانتهاء', 'Expiry Date')}</label>
                <input type="date" value={form.expiresAt} onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="cactive" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded accent-purple-600" />
                <label htmlFor="cactive" className="text-gray-300 text-sm">{t('مفعل', 'Active')}</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-sm font-medium transition-all">
                <Check className="w-4 h-4" /> {editing ? t('حفظ التعديلات', 'Save Changes') : t('إضافة الكوبون', 'Add Coupon')}</button>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl text-sm transition-all">{t('إلغاء', 'Cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════ Placeholder Tabs ═══════ */
function OrdersTab({ isAr, t }: { isAr: boolean; t: (ar: string, en: string) => string }) {
  return <div className="bg-[#151520] rounded-2xl border border-white/5 p-12 text-center"><ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" /><p className="text-gray-500">{t('قسم الطلبات قيد التطوير', 'Orders section coming soon')}</p></div>;
}
function ProvidersTab({ isAr, t }: { isAr: boolean; t: (ar: string, en: string) => string }) {
  return <div className="bg-[#151520] rounded-2xl border border-white/5 p-12 text-center"><Server className="w-12 h-12 text-gray-600 mx-auto mb-3" /><p className="text-gray-500">{t('قسم المزودين قيد التطوير', 'Providers section coming soon')}</p></div>;
}
function SettingsTab({ isAr, t }: { isAr: boolean; t: (ar: string, en: string) => string }) {
  return <div className="max-w-2xl"><div className="bg-[#151520] rounded-2xl border border-white/5 p-6"><h3 className="text-white font-bold text-lg mb-4">{t('إعدادات اللوحة', 'Dashboard Settings')}</h3><p className="text-gray-500 text-sm">{t('الإعدادات المتقدمة قيد التطوير.', 'Advanced settings coming soon.')}</p></div></div>;
}
