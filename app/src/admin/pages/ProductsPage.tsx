import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Eye, Image as ImageIcon, Package } from 'lucide-react';
import { products } from '../data/mockData';

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'gaming', name: 'ألعاب' },
  { id: 'topup', name: 'شحن' },
  { id: 'subscription', name: 'اشتراكات' },
  { id: 'ai', name: 'AI' },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">المنتجات</h1>
          <p className="text-gray-400 text-sm mt-1">إدارة المنتجات والمخزون</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          إضافة منتج
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث في المنتجات..." className="w-full bg-[#151520] border border-white/[0.06] rounded-xl pr-10 pl-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
        </div>
        <div className="flex gap-2">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === c.id ? 'bg-blue-600 text-white' : 'bg-[#151520] text-gray-400 border border-white/[0.06] hover:text-white'}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
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
                <th className="text-right text-gray-400 text-xs font-medium p-4">التكلفة</th>
                <th className="text-right text-gray-400 text-xs font-medium p-4">الربح</th>
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
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="text-white text-sm font-medium">{p.name}</div>
                        <div className="text-gray-500 text-xs">{p.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white text-sm">{p.price} ر.س</td>
                  <td className="p-4 text-gray-400 text-sm">{p.cost} ر.س</td>
                  <td className="p-4 text-green-400 text-sm">+{p.price - p.cost} ر.س</td>
                  <td className="p-4">
                    <span className={`text-sm ${p.stock === 0 ? 'text-red-400' : p.stock < 20 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {p.stock === 0 ? 'نفذ' : p.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      p.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {p.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
