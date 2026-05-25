import { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, Eye, X, Check, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: 'active' | 'inactive';
  featured: boolean;
  image: string;
}

const LS_KEY = 'digzoom_admin_products';

const defaultProducts: Product[] = [
  { id: 1, name: 'بطاقة PlayStation 50$', category: 'gaming', price: 190, cost: 175, stock: 45, status: 'active', featured: true, image: '/images/products/gaming/ps-card.jpg' },
  { id: 2, name: 'بطاقة Xbox 50$', category: 'gaming', price: 185, cost: 170, stock: 32, status: 'active', featured: false, image: '/images/products/gaming/xbox-card.jpg' },
  { id: 3, name: 'شحن STC 100 ر.س', category: 'topup', price: 100, cost: 97, stock: 99, status: 'active', featured: true, image: '/images/products/topup/stc-card.jpg' },
  { id: 4, name: 'اشتراك Netflix شهر', category: 'subscription', price: 45, cost: 38, stock: 20, status: 'active', featured: true, image: '/images/products/subscriptions/netflix-card.jpg' },
  { id: 5, name: 'حساب ChatGPT Plus', category: 'ai', price: 80, cost: 65, stock: 15, status: 'active', featured: false, image: '/images/products/ai/chatgpt-card.jpg' },
];

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'gaming', name: 'ألعاب' },
  { id: 'topup', name: 'شحن' },
  { id: 'subscription', name: 'اشتراكات' },
  { id: 'ai', name: 'AI' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    name: '', category: 'gaming', price: '', cost: '', stock: '', status: 'active' as 'active' | 'inactive', image: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setToast({ msg: 'يرجى اختيار ملف صورة فقط', type: 'error' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast({ msg: 'حجم الصورة يجب أن يكون أقل من 5 ميجا', type: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreviewImage(result);
      setForm(p => ({ ...p, image: result }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(products)); }, [products]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || p.category === category;
    return matchSearch && matchCat;
  });

  const resetForm = () => {
    setForm({ name: '', category: 'gaming', price: '', cost: '', stock: '', status: 'active', image: '' });
    setPreviewImage('');
    setEditingId(null);
  };

  const openAdd = () => { resetForm(); setShowForm(true); };

  const openEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), cost: String(p.cost), stock: String(p.stock), status: p.status, image: p.image });
    setPreviewImage(p.image || '');
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.stock) {
      setToast({ msg: 'يرجى ملء الاسم والسعر والمخزون', type: 'error' });
      return;
    }
    const data: Product = {
      id: editingId ?? Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      cost: Number(form.cost) || 0,
      stock: Number(form.stock),
      status: form.status,
      featured: false,
      image: form.image || '/images/placeholder.jpg',
    };
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? data : p));
      setToast({ msg: 'تم تحديث المنتج!', type: 'success' });
    } else {
      setProducts(prev => [data, ...prev]);
      setToast({ msg: 'تم إضافة المنتج!', type: 'success' });
    }
    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('حذف المنتج نهائياً؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setToast({ msg: 'تم حذف المنتج!', type: 'success' });
    }
  };

  const toggleStatus = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p));
    setToast({ msg: 'تم تغيير الحالة!', type: 'success' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl font-medium shadow-lg ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">المنتجات</h1>
          <p className="text-gray-400 text-sm mt-1">إدارة المنتجات والمخزون</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" /> إضافة منتج
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث في المنتجات..." className="w-full bg-[#151520] border border-white/[0.06] rounded-xl pr-10 pl-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === c.id ? 'bg-blue-600 text-white' : 'bg-[#151520] text-gray-400 border border-white/[0.06] hover:text-white'}`}>{c.name}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{products.length}</div>
          <div className="text-gray-400 text-xs">إجمالي المنتجات</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{products.filter(p => p.status === 'active').length}</div>
          <div className="text-gray-400 text-xs">نشط</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{products.filter(p => p.stock < 20).length}</div>
          <div className="text-gray-400 text-xs">منخفض المخزون</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{products.filter(p => p.featured).length}</div>
          <div className="text-gray-400 text-xs">مميز</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-right text-gray-400 text-xs font-medium p-4">المنتج</th>
                <th className="text-right text-gray-400 text-xs font-medium p-4">السعر</th>
                <th className="text-right text-gray-400 text-xs font-medium p-4 hidden sm:table-cell">التكلفة</th>
                <th className="text-right text-gray-400 text-xs font-medium p-4 hidden sm:table-cell">الربح</th>
                <th className="text-right text-gray-400 text-xs font-medium p-4">المخزون</th>
                <th className="text-right text-gray-400 text-xs font-medium p-4">الحالة</th>
                <th className="text-right text-gray-400 text-xs font-medium p-4">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-800" />
                      <div>
                        <div className="text-white text-sm font-medium">{p.name}</div>
                        <div className="text-gray-500 text-xs">{categories.find(c => c.id === p.category)?.name || p.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white text-sm">{p.price} ر.س</td>
                  <td className="p-4 text-gray-400 text-sm hidden sm:table-cell">{p.cost} ر.س</td>
                  <td className="p-4 text-green-400 text-sm hidden sm:table-cell">+{p.price - p.cost} ر.س</td>
                  <td className="p-4">
                    <span className={`text-sm ${p.stock === 0 ? 'text-red-400' : p.stock < 20 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {p.stock === 0 ? 'نفذ' : p.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleStatus(p.id)} className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all ${p.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                      {p.status === 'active' ? 'نشط' : 'غير نشط'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="p-8 text-center text-gray-500">لا توجد منتجات</div>}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#1a1a2e] border border-white/[0.08] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{editingId ? 'تعديل منتج' : 'إضافة منتج جديد'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">اسم المنتج *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">التصنيف</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                    {categories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">الحالة</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as 'active' | 'inactive' }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">السعر *</label>
                  <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">التكلفة</label>
                  <input type="number" value={form.cost} onChange={e => setForm(p => ({ ...p, cost: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">المخزون *</label>
                <input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">الصورة</label>
                <div className="flex items-center gap-3">
                  {previewImage && <img src={previewImage} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-800 border border-white/10" />}
                  <label className="flex-1 cursor-pointer bg-black/30 border border-dashed border-white/20 rounded-xl px-4 py-3 text-center hover:border-blue-500/40 hover:bg-blue-500/5 transition-all">
                    <span className="text-gray-400 text-sm">
                      {previewImage ? 'تغيير الصورة' : 'اضغط لرفع صورة من الجهاز'}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl text-sm font-medium transition-all">
                <Check className="w-4 h-4" /> {editingId ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </button>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl text-sm transition-all">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
