import { useState, useEffect } from 'react';
import { Sparkles, Plus, Percent, Calendar, X, Check, Trash2, Edit3 } from 'lucide-react';

interface Coupon {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  usageCount: number;
  usageLimit: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'expired';
  appliesTo: string[];
}

const LS_KEY = 'digzoom_admin_coupons';

const defaultCoupons: Coupon[] = [
  { id: 1, code: 'SAVE20', type: 'percentage', value: 20, minOrder: 100, usageCount: 15, usageLimit: 100, startDate: '2026-05-01', endDate: '2026-05-31', status: 'active', appliesTo: ['all'] },
  { id: 2, code: 'VIP50', type: 'fixed', value: 50, minOrder: 300, usageCount: 8, usageLimit: 50, startDate: '2026-05-15', endDate: '2026-06-15', status: 'active', appliesTo: ['all'] },
  { id: 3, code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 0, usageCount: 42, usageLimit: 200, startDate: '2026-01-01', endDate: '2026-12-31', status: 'active', appliesTo: ['all'] },
  { id: 4, code: 'GAME25', type: 'percentage', value: 25, minOrder: 200, usageCount: 5, usageLimit: 30, startDate: '2026-05-20', endDate: '2026-05-30', status: 'active', appliesTo: ['gaming'] },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : defaultCoupons;
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    code: '', type: 'percentage' as 'percentage' | 'fixed', value: '', minOrder: '', usageLimit: '', startDate: '', endDate: '', appliesTo: 'all',
  });

  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);

  const resetForm = () => {
    setForm({ code: '', type: 'percentage', value: '', minOrder: '', usageLimit: '', startDate: '', endDate: '', appliesTo: 'all' });
    setEditingId(null);
  };

  const openAdd = () => { resetForm(); setShowForm(true); };

  const openEdit = (c: Coupon) => {
    setForm({ code: c.code, type: c.type, value: String(c.value), minOrder: String(c.minOrder), usageLimit: String(c.usageLimit), startDate: c.startDate, endDate: c.endDate, appliesTo: c.appliesTo[0] || 'all' });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.code || !form.value || !form.startDate || !form.endDate) {
      setToast({ msg: 'يرجى ملء الكود والقيمة والتواريخ', type: 'error' });
      return;
    }
    if (!editingId && coupons.some(c => c.code === form.code.toUpperCase())) {
      setToast({ msg: 'الكود موجود مسبقاً!', type: 'error' });
      return;
    }
    const data: Coupon = {
      id: editingId ?? Date.now(),
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      minOrder: Number(form.minOrder) || 0,
      usageCount: editingId ? (coupons.find(c => c.id === editingId)?.usageCount || 0) : 0,
      usageLimit: Number(form.usageLimit) || 999,
      startDate: form.startDate,
      endDate: form.endDate,
      status: editingId ? (coupons.find(c => c.id === editingId)?.status || 'active') : 'active',
      appliesTo: [form.appliesTo],
    };
    if (editingId) {
      setCoupons(prev => prev.map(c => c.id === editingId ? data : c));
      setToast({ msg: 'تم تحديث الكوبون!', type: 'success' });
    } else {
      setCoupons(prev => [data, ...prev]);
      setToast({ msg: 'تم إضافة الكوبون!', type: 'success' });
    }
    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('حذف الكوبون نهائياً؟')) {
      setCoupons(prev => prev.filter(c => c.id !== id));
      setToast({ msg: 'تم حذف الكوبون!', type: 'success' });
    }
  };

  const toggleStatus = (id: number) => {
    setCoupons(prev => prev.map(c => {
      if (c.id !== id) return c;
      const states: Record<string, string> = { active: 'paused', paused: 'active', expired: 'expired' };
      return { ...c, status: states[c.status] || c.status } as Coupon;
    }));
    setToast({ msg: 'تم تغيير الحالة!', type: 'success' });
  };

  return (
    <div className="space-y-6 relative">
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl font-medium shadow-lg ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">الكوبونات والعروض</h1><p className="text-gray-400 text-sm mt-1">إنشاء وإدارة الكوبونات</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" /> كوبون جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{coupons.length}</div><div className="text-gray-400 text-xs">إجمالي الكوبونات</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{coupons.filter(c => c.status === 'active').length}</div><div className="text-gray-400 text-xs">نشط</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{coupons.filter(c => c.status === 'paused').length}</div><div className="text-gray-400 text-xs">متوقف</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{coupons.reduce((sum, c) => sum + c.usageCount, 0)}</div><div className="text-gray-400 text-xs">إجمالي الاستخدام</div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(c => (
          <div key={c.id} className={`bg-[#151520] border rounded-2xl p-5 transition-all hover:-translate-y-1 ${c.status === 'active' ? 'border-green-500/20' : c.status === 'expired' ? 'border-gray-500/20 opacity-60' : 'border-yellow-500/20'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{c.code}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(c)} title="تعديل" className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors text-xs font-medium">
                  <Edit3 className="w-3.5 h-3.5" /> تعديل
                </button>
                <button onClick={() => handleDelete(c.id)} title="حذف" className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors text-xs font-medium">
                  <Trash2 className="w-3.5 h-3.5" /> حذف
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-white font-bold text-lg">{c.type === 'percentage' ? `${c.value}%` : `${c.value} ر.س`}</div>
              <div className="text-gray-400 text-xs flex items-center gap-1"><Percent className="w-3 h-3" /> {c.usageCount}/{c.usageLimit || '∞'}</div>
            </div>
            {c.minOrder > 0 && <div className="text-gray-500 text-xs mb-2">حد أدنى للطلب: {c.minOrder} ر.س</div>}
            <div className="text-gray-500 text-xs flex items-center gap-1 mb-4"><Calendar className="w-3 h-3" /> {c.startDate} → {c.endDate}</div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${c.status === 'active' ? 'bg-green-500/10 text-green-400' : c.status === 'expired' ? 'bg-gray-500/10 text-gray-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{c.status === 'active' ? 'نشط' : c.status === 'expired' ? 'منتهي' : 'متوقف'}</span>
              <button onClick={() => toggleStatus(c.id)} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 text-white hover:bg-white/5 transition-all">
                {c.status === 'active' ? 'إيقاف' : 'تفعيل'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {coupons.length === 0 && <div className="p-8 text-center text-gray-500">لا توجد كوبونات</div>}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#1a1a2e] border border-white/[0.08] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{editingId ? 'تعديل كوبون' : 'كوبون جديد'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">كود الكوبون *</label>
                <input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="SAVE50" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">نوع الخصم</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as 'percentage' | 'fixed' }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                    <option value="percentage">نسبة %</option>
                    <option value="fixed">مبلغ ثابت</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">القيمة *</label>
                  <input type="number" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">حد أدنى للطلب</label>
                  <input type="number" value={form.minOrder} onChange={e => setForm(p => ({ ...p, minOrder: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">عدد الاستخدامات</label>
                  <input type="number" value={form.usageLimit} onChange={e => setForm(p => ({ ...p, usageLimit: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">تاريخ البداية *</label>
                  <input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">تاريخ النهاية *</label>
                  <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">ينطبق على</label>
                <select value={form.appliesTo} onChange={e => setForm(p => ({ ...p, appliesTo: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                  <option value="all">جميع المنتجات</option>
                  <option value="gaming">ألعاب</option>
                  <option value="topup">شحن</option>
                  <option value="subscription">اشتراكات</option>
                  <option value="ai">AI</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl text-sm font-medium transition-all">
                <Check className="w-4 h-4" /> {editingId ? 'حفظ التعديلات' : 'إنشاء الكوبون'}
              </button>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl text-sm transition-all">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
