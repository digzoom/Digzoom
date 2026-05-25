import { useState } from 'react';
import { CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { subscriptions } from '../data/mockData';

export default function SubscriptionsPage() {
  const [subs] = useState(subscriptions);

  const statusIcon = (s: string) => {
    if (s === 'active') return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (s === 'expiring') return <Clock className="w-4 h-4 text-yellow-400" />;
    return <AlertTriangle className="w-4 h-4 text-red-400" />;
  };
  const statusLabel = (s: string) => s === 'active' ? 'نشط' : s === 'expiring' ? 'ينتهي قريباً' : 'منتهي';
  const statusClass = (s: string) => s === 'active' ? 'bg-green-500/10 text-green-400' : s === 'expiring' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">الاشتراكات والحسابات</h1>
        <p className="text-gray-400 text-sm mt-1">إدارة حسابات ChatGPT، Netflix، Spotify وغيرها</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-400">{subs.filter(s => s.status === 'active').length}</div><div className="text-gray-400 text-xs">نشط</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-yellow-400">{subs.filter(s => s.status === 'expiring').length}</div><div className="text-gray-400 text-xs">ينتهي قريباً</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-red-400">{subs.filter(s => s.status === 'expired').length}</div><div className="text-gray-400 text-xs">منتهي</div></div>
      </div>
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-white/[0.06]">
            {['الحساب', 'المنتج', 'تاريخ الانتهاء', 'التسليمات', 'السعة', 'الحالة'].map(h => <th key={h} className="text-right text-gray-400 text-xs font-medium p-4">{h}</th>)}
          </tr></thead>
          <tbody>
            {subs.map(s => (
              <tr key={s.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="p-4 text-blue-400 text-sm font-mono">{s.account}</td>
                <td className="p-4 text-white text-sm">{s.product}</td>
                <td className="p-4 text-gray-400 text-sm">{s.expiryDate}</td>
                <td className="p-4 text-white">{s.deliveryCount}</td>
                <td className="p-4 text-gray-400 text-sm">{s.deliveryCount}/{s.maxUsers}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 w-fit ${statusClass(s.status)}`}>{statusIcon(s.status)} {statusLabel(s.status)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
