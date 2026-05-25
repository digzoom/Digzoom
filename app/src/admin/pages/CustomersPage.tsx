import { useState } from 'react';
import { Search, Star, Ban, UserCheck, MessageSquare } from 'lucide-react';
import { customers } from '../data/mockData';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState(customers);

  const toggleVIP = (id: number) => setClients(prev => prev.map(c => c.id === id ? { ...c, vip: !c.vip } : c));
  const toggleStatus = (id: number) => setClients(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c));

  const filtered = clients.filter(c =>
    c.name.includes(search) || c.email.includes(search) || c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">العملاء</h1>
        <p className="text-gray-400 text-sm mt-1">إدارة عملاء المتجر</p>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..." className="w-full bg-[#151520] border border-white/[0.06] rounded-xl pr-10 pl-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{clients.length}</div><div className="text-gray-400 text-xs">إجمالي</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-400">{clients.filter(c => c.status === 'active').length}</div><div className="text-gray-400 text-xs">نشط</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-yellow-400">{clients.filter(c => c.vip).length}</div><div className="text-gray-400 text-xs">VIP</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-red-400">{clients.filter(c => c.status === 'blocked').length}</div><div className="text-gray-400 text-xs">محظور</div></div>
      </div>

      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/[0.06]">
              {['العميل', 'الطلبات', 'إجمالي', 'آخر طلب', 'VIP', 'الحالة', 'ملاحظات', 'إجراءات'].map(h => <th key={h} className="text-right text-gray-400 text-xs font-medium p-4">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4">
                    <div className="text-white text-sm font-medium">{c.name}</div>
                    <div className="text-gray-500 text-xs">{c.email}</div>
                    <div className="text-gray-500 text-xs">{c.phone}</div>
                  </td>
                  <td className="p-4 text-white">{c.orders}</td>
                  <td className="p-4 text-green-400 font-bold">{c.totalSpent} ر.س</td>
                  <td className="p-4 text-gray-400 text-xs">{c.lastOrder}</td>
                  <td className="p-4">
                    <button onClick={() => toggleVIP(c.id)} className={`p-1.5 rounded-lg transition-colors ${c.vip ? 'text-yellow-400 bg-yellow-500/10' : 'text-gray-600 hover:text-yellow-400'}`}>
                      <Star className="w-4 h-4" fill={c.vip ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${c.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {c.status === 'active' ? 'نشط' : 'محظور'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-xs max-w-[120px] truncate">{c.notes || '—'}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => toggleStatus(c.id)} className={`p-1.5 rounded-lg transition-colors ${c.status === 'active' ? 'text-red-400 hover:bg-red-500/10' : 'text-green-400 hover:bg-green-500/10'}`}>
                        {c.status === 'active' ? <Ban className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10"><MessageSquare className="w-4 h-4" /></button>
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
