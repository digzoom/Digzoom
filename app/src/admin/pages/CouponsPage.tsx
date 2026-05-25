import { useState } from 'react';
import { Sparkles, Plus, Percent, Calendar } from 'lucide-react';
import { coupons } from '../data/mockData';

export default function CouponsPage() {
  const [list, setList] = useState(coupons);

  const toggleStatus = (id: number) => {
    setList(prev => prev.map(c => {
      if (c.id !== id) return c;
      const states: Record<string, string> = { active: 'paused', paused: 'active', expired: 'expired' };
      return { ...c, status: states[c.status] || c.status };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">الكوبونات والعروض</h1><p className="text-gray-400 text-sm mt-1">إنشاء وإدارة الكوبونات</p></div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all"><Plus className="w-4 h-4" /> كوبون جديد</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {list.map(c => (
          <div key={c.id} className={`bg-[#151520] border rounded-2xl p-5 transition-all hover:-translate-y-1 ${c.status === 'active' ? 'border-green-500/20' : c.status === 'expired' ? 'border-gray-500/20 opacity-60' : 'border-yellow-500/20'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{c.code}</span>
              <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${c.status === 'active' ? 'bg-green-500/10 text-green-400' : c.status === 'expired' ? 'bg-gray-500/10 text-gray-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{c.status === 'active' ? 'نشط' : c.status === 'expired' ? 'منتهي' : 'متوقف'}</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-white font-bold text-lg">{c.type === 'percentage' ? `${c.value}%` : `${c.value} ر.س`}</div>
              <div className="text-gray-400 text-xs flex items-center gap-1"><Percent className="w-3 h-3" /> {c.usageCount}/{c.usageLimit || '∞'}</div>
            </div>
            <div className="text-gray-500 text-xs flex items-center gap-1 mb-4"><Calendar className="w-3 h-3" /> {c.startDate} → {c.endDate}</div>
            <button onClick={() => toggleStatus(c.id)} className="w-full py-2 rounded-xl text-sm font-medium border transition-all hover:shadow-lg text-white border-white/10 hover:bg-white/5">
              {c.status === 'active' ? 'إيقاف' : c.status === 'expired' ? 'منتهي' : 'تفعيل'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
