import {
  TrendingUp, ShoppingCart, DollarSign, Users, Clock,
  Package, AlertTriangle, CheckCircle, Activity
} from 'lucide-react';
import {
  dashboardStats, salesChart, topProducts, recentOrders, notifications
} from '../data/mockData';

function StatCard({ icon, label, value, color, sub }: {
  icon: React.ReactNode; label: string; value: string; color: string; sub?: string;
}) {
  return (
    <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.1] transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>{icon}</div>
        <TrendingUp className="w-4 h-4 text-green-400" />
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
      {sub && <div className="text-gray-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const s = dashboardStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-gray-400 text-sm mt-1">نظرة عامة على أداء المتجر اليوم</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
            s.apiStatus === 'online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.apiStatus === 'online' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            API Online
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
            s.autoDeliveryStatus === 'active' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-yellow-500/10 text-yellow-400'
          }`}>
            <CheckCircle className="w-3 h-3" />
            Auto Delivery
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<DollarSign className="w-5 h-5 text-green-400" />} label="مبيعات اليوم" value={`${s.todaySales.toLocaleString()} ر.س`} color="bg-green-500/10" sub={`${s.todayOrders} طلب`} />
        <StatCard icon={<ShoppingCart className="w-5 h-5 text-blue-400" />} label="الطلبات" value={s.todayOrders.toString()} color="bg-blue-500/10" sub={`${s.pendingOrders} معلقة`} />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-purple-400" />} label="الأرباح" value={`${s.todayProfit.toLocaleString()} ر.س`} color="bg-purple-500/10" sub="هامش 44%" />
        <StatCard icon={<Users className="w-5 h-5 text-orange-400" />} label="عملاء جدد" value={`+${s.newCustomers}`} color="bg-orange-500/10" sub="اليوم" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            مبيعات الأسبوع
          </h3>
          <div className="flex items-end gap-3 h-48">
            {salesChart.map((d, i) => {
              const max = Math.max(...salesChart.map(s => s.sales));
              const h = (d.sales / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <span className="text-gray-500 text-[10px]">{d.orders}</span>
                    <div className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-lg transition-all hover:opacity-80 relative group" style={{ height: `${h * 0.6}px` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a2e] text-white text-[10px] px-2 py-1 rounded border border-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {d.sales.toLocaleString()} ر.س
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-[10px]">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            الإشعارات
            <span className="mr-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{notifications.filter(n => !n.read).length} جديد</span>
          </h3>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${!n.read ? 'bg-white/[0.03] border border-white/[0.06]' : ''}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-blue-400' : 'bg-gray-600'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{n.title}</div>
                  <div className="text-gray-400 text-xs truncate">{n.message}</div>
                  <div className="text-gray-500 text-[10px] mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Products */}
        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-400" />
            الأكثر مبيعاً
          </h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{p.name}</div>
                  <div className="text-gray-500 text-xs">{p.sales} مبيعة</div>
                </div>
                <div className="text-white font-bold text-sm">{p.revenue.toLocaleString()} ر.س</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-400" />
            آخر الطلبات
          </h3>
          <div className="space-y-2">
            {recentOrders.slice(0, 5).map((o) => {
              const statusColors: Record<string, string> = {
                completed: 'bg-green-500/10 text-green-400 border-green-500/20',
                processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
                paid: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                failed: 'bg-red-500/10 text-red-400 border-red-500/20',
                refunded: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
              };
              const statusLabels: Record<string, string> = {
                completed: 'مكتمل', processing: 'قيد المعالجة', pending: 'جديد',
                paid: 'مدفوع', failed: 'فاشل', refunded: 'مسترجع',
              };
              return (
                <div key={o.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 text-xs font-mono">{o.id}</span>
                      <span className="text-white text-sm truncate">{o.product}</span>
                    </div>
                    <div className="text-gray-500 text-xs">{o.customer}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColors[o.status] || ''}`}>
                    {statusLabels[o.status] || o.status}
                  </span>
                  <span className="text-white font-bold text-sm">{o.amount} ر.س</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
