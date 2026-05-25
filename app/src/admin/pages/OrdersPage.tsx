import { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronDown } from 'lucide-react';
import { recentOrders } from '../data/mockData';

const statuses = [
  { id: 'all', name: 'الكل', color: '' },
  { id: 'pending', name: 'جديد', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { id: 'paid', name: 'مدفوع', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { id: 'processing', name: 'قيد المعالجة', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 'completed', name: 'مكتمل', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { id: 'failed', name: 'فاشل', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  { id: 'refunded', name: 'مسترجع', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
];

const statusLabels: Record<string, string> = {
  pending: 'جديد', paid: 'مدفوع', processing: 'قيد المعالجة',
  completed: 'مكتمل', failed: 'فاشل', refunded: 'مسترجع',
};

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [orders, setOrders] = useState(recentOrders);

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.includes(search);
    const matchStatus = status === 'all' || o.status === status;
    return matchSearch && matchStatus;
  });

  const changeStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">الطلبات</h1>
          <p className="text-gray-400 text-sm mt-1">إدارة طلبات العملاء</p>
        </div>
        <button className="flex items-center gap-2 bg-[#151520] text-gray-300 px-4 py-2 rounded-xl text-sm border border-white/[0.06] hover:text-white transition-all">
          <RefreshCw className="w-4 h-4" />
          تحديث
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث برقم الطلب أو اسم العميل..." className="w-full bg-[#151520] border border-white/[0.06] rounded-xl pr-10 pl-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
        </div>
        <select value={status} onChange={e => setStatus(e.target.value)} className="bg-[#151520] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/40">
          {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {statuses.slice(1).map(s => (
          <div key={s.id} className="bg-[#151520] border border-white/[0.06] rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">{orders.filter(o => o.status === s.id).length}</div>
            <div className={`text-xs ${s.color.split(' ')[1]}`}>{s.name}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/[0.06]">
              {['رقم الطلب', 'العميل', 'المنتج', 'المبلغ', 'الدفع', 'الحالة', 'التاريخ', 'تغيير'].map(h => (
                <th key={h} className="text-right text-gray-400 text-xs font-medium p-4">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(o => {
                const st = statuses.find(s => s.id === o.status);
                return (
                  <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="p-4 text-blue-400 text-sm font-mono">{o.id}</td>
                    <td className="p-4 text-white text-sm">{o.customer}</td>
                    <td className="p-4 text-gray-300 text-sm">{o.product}</td>
                    <td className="p-4 text-white font-bold">{o.amount} ر.س</td>
                    <td className="p-4 text-gray-400 text-sm">{o.payment}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium border ${st?.color || ''}`}>{statusLabels[o.status] || o.status}</span>
                    </td>
                    <td className="p-4 text-gray-500 text-xs">{o.date}</td>
                    <td className="p-4">
                      <select onChange={e => changeStatus(o.id, e.target.value)} className="bg-[#0f0f1a] border border-white/[0.06] rounded-lg px-2 py-1 text-white text-xs">
                        {statuses.slice(1).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
