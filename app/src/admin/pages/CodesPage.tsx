import { useState } from 'react';
import { KeyRound, Upload, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { codes } from '../data/mockData';

export default function CodesPage() {
  const [codeList, setCodeList] = useState(codes);
  const [newCodes, setNewCodes] = useState('');

  const addCodes = () => {
    if (!newCodes.trim()) return;
    const lines = newCodes.split('\n').filter(l => l.trim());
    const newItems = lines.map((code, i) => ({
      id: codeList.length + i + 1,
      code: code.trim(),
      product: 'بطاقة PlayStation 50$',
      status: 'available' as const,
      orderId: null,
      usedAt: null,
    }));
    setCodeList([...codeList, ...newItems]);
    setNewCodes('');
  };

  const stats = {
    total: codeList.length,
    available: codeList.filter(c => c.status === 'available').length,
    sold: codeList.filter(c => c.status === 'sold').length,
    low: codeList.filter(c => c.status === 'low').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">الأكواد والبطاقات</h1>
        <p className="text-gray-400 text-sm mt-1">إدارة الأكواد الرقمية والتسليم التلقائي</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.total}</div><div className="text-gray-400 text-xs">إجمالي</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-400">{stats.available}</div><div className="text-gray-400 text-xs">متاح</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-blue-400">{stats.sold}</div><div className="text-gray-400 text-xs">مباع</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-yellow-400">{stats.low}</div><div className="text-gray-400 text-xs">منخفض</div></div>
      </div>

      {/* Bulk Upload */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><Upload className="w-4 h-4 text-blue-400" /> رفع أكواد دفعة</h3>
        <textarea value={newCodes} onChange={e => setNewCodes(e.target.value)} placeholder="الصق الأكواد هنا (كل كود في سطر)..." className="w-full h-32 bg-[#0f0f1a] border border-white/[0.06] rounded-xl p-4 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40 resize-none" />
        <button onClick={addCodes} className="mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all">إضافة الأكواد</button>
      </div>

      {/* Codes Table */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/[0.06]">
              {['الكود', 'المنتج', 'الحالة', 'رقم الطلب', 'تاريخ الاستخدام'].map(h => <th key={h} className="text-right text-gray-400 text-xs font-medium p-4">{h}</th>)}
            </tr></thead>
            <tbody>
              {codeList.map(c => (
                <tr key={c.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-blue-400 text-sm">{c.code}</td>
                  <td className="p-4 text-white text-sm">{c.product}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 w-fit ${
                      c.status === 'available' ? 'bg-green-500/10 text-green-400' :
                      c.status === 'sold' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {c.status === 'available' ? <CheckCircle className="w-3 h-3" /> : c.status === 'sold' ? <Clock className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {c.status === 'available' ? 'متاح' : c.status === 'sold' ? 'مباع' : 'منخفض'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{c.orderId || '—'}</td>
                  <td className="p-4 text-gray-500 text-xs">{c.usedAt || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
