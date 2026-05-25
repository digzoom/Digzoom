import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { profitData, topProducts } from '../data/mockData';

export default function AnalyticsPage() {
  const totalRevenue = profitData.reduce((a, b) => a + b.revenue, 0);
  const totalCost = profitData.reduce((a, b) => a + b.cost, 0);
  const totalProfit = profitData.reduce((a, b) => a + b.profit, 0);
  const margin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">الأرباح والتحليلات</h1>
        <p className="text-gray-400 text-sm mt-1">تتبع الإيرادات والتكاليف والأرباح</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 text-blue-400" /><span className="text-gray-400 text-sm">الإيرادات</span></div>
          <div className="text-2xl font-bold text-white">{totalRevenue.toLocaleString()} ر.س</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-red-400" /><span className="text-gray-400 text-sm">التكاليف</span></div>
          <div className="text-2xl font-bold text-white">{totalCost.toLocaleString()} ر.س</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2"><BarChart3 className="w-5 h-5 text-green-400" /><span className="text-gray-400 text-sm">الأرباح</span></div>
          <div className="text-2xl font-bold text-green-400">{totalProfit.toLocaleString()} ر.س</div>
        </div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-purple-400" /><span className="text-gray-400 text-sm">هامش الربح</span></div>
          <div className="text-2xl font-bold text-purple-400">{margin}%</div>
        </div>
      </div>

      {/* Profit Chart */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">الأرباح الشهرية</h3>
        <div className="flex items-end gap-4 h-56">
          {profitData.map((d, i) => {
            const max = Math.max(...profitData.map(p => p.revenue));
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div className="text-center text-green-400 text-[10px] font-bold">{d.profit.toLocaleString()}</div>
                  <div className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg" style={{ height: `${(d.profit / max) * 140}px` }} />
                </div>
                <span className="text-gray-500 text-[10px]">{d.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 mt-4 text-xs text-gray-400">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded" /> إيرادات</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gradient-to-r from-red-600 to-red-400 rounded" /> تكاليف</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gradient-to-r from-green-600 to-green-400 rounded" /> أرباح</div>
        </div>
      </div>

      {/* Top Profit Products */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">المنتجات الأعلى ربحاً</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => {
            const cost = Math.round(p.revenue * 0.6);
            const profit = p.revenue - cost;
            return (
              <div key={p.id} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1"><div className="text-white text-sm">{p.name}</div><div className="text-gray-500 text-xs">{p.sales} مبيعة</div></div>
                <div className="text-right">
                  <div className="text-white text-sm">{p.revenue.toLocaleString()} ر.س</div>
                  <div className="text-green-400 text-xs">+{profit.toLocaleString()} ر.س ربح</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
