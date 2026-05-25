import { useState } from 'react';
import { Share2, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { socialServices } from '../data/mockData';

export default function SocialPage() {
  const [services] = useState(socialServices);

  const totalProfit = services.reduce((acc, s) => acc + s.profit, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">خدمات السوشال ميديا</h1>
          <p className="text-gray-400 text-sm mt-1">إدارة خدمات المتابعين واللايكات والمشاهدات</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold">
          إجمالي الربح: {totalProfit} ر.س
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {['instagram', 'tiktok', 'youtube', 'twitter', 'snapchat'].map((p, i) => {
          const count = services.filter(s => s.platform === p).length;
          const names = ['انستقرام', 'تيك توك', 'يوتيوب', 'تويتر', 'سناب'];
          return (
            <div key={p} className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-gray-400 text-xs">{names[i]}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/[0.06]">
              {['الخدمة', 'المنصة', 'السعر', 'التكلفة', 'الربح', 'مدة التنفيذ', 'API', 'الحالة'].map(h => <th key={h} className="text-right text-gray-400 text-xs font-medium p-4">{h}</th>)}
            </tr></thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4 text-white text-sm font-medium">{s.name}</td>
                  <td className="p-4 text-gray-400 text-sm">{s.platform}</td>
                  <td className="p-4 text-white">{s.price} ر.س</td>
                  <td className="p-4 text-gray-400">{s.cost} ر.س</td>
                  <td className="p-4 text-green-400 font-bold">+{s.profit} ر.س</td>
                  <td className="p-4 text-gray-400 text-sm">{s.deliveryTime}</td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 text-xs ${s.apiStatus === 'online' ? 'text-green-400' : s.apiStatus === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.apiStatus === 'online' ? 'bg-green-400' : s.apiStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                      {s.provider}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${s.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {s.status === 'active' ? 'نشط' : 'متوقف'}
                    </span>
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
