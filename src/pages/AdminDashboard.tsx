import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useSMMProvider } from '@/hooks/useSMMProvider';
import { useLanguage } from '@/hooks/useLanguage';
import {
  LayoutDashboard, ShoppingBag, DollarSign,
  Package, Settings, Search, Clock, CheckCircle,
  XCircle, AlertCircle, Play, Pause, Trash2, Eye, MessageSquare,
  ArrowUpRight, RefreshCw, ExternalLink, Wallet, Server,
  Plus, Trash, HelpCircle, Copy, Check, BarChart3
} from 'lucide-react';
import AdminProducts from '@/components/AdminProducts';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: <Clock className="w-4 h-4" /> },
  processing: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <RefreshCw className="w-4 h-4 animate-spin" /> },
  completed: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: <CheckCircle className="w-4 h-4" /> },
  cancelled: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: <XCircle className="w-4 h-4" /> },
  failed: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: <AlertCircle className="w-4 h-4" /> },
};

const statusLabels: Record<string, { ar: string; en: string }> = {
  pending: { ar: 'معلق', en: 'Pending' },
  processing: { ar: 'قيد التنفيذ', en: 'Processing' },
  completed: { ar: 'مكتمل', en: 'Completed' },
  cancelled: { ar: 'ملغي', en: 'Cancelled' },
  failed: { ar: 'فاشل', en: 'Failed' },
};

type TabType = 'dashboard' | 'analytics' | 'orders' | 'products' | 'providers' | 'settings' | 'guide';

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const isAr = lang === 'ar';

  const {
    orders, stats, adminProducts, autoProcess, setAutoProcess,
    updateOrderStatus, processOrder, deleteOrder,
    getFilteredOrders, addProduct, updateProduct, deleteProduct,
  } = useAdmin();

  const {
    providers: smmProviders, loading: smmLoading,
    addProvider: addSMMProvider, removeProvider: removeSMMProvider,
    toggleProvider, getServices, getBalance,
  } = useSMMProvider();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [smmServices, setSmmServices] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const [newProviderForm, setNewProviderForm] = useState({ name: '', apiUrl: '', apiKey: '' });

  useEffect(() => {
    if (!isAdmin) navigate('/');
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load balance
  useEffect(() => {
    if (activeTab === 'dashboard' || activeTab === 'providers') {
      getBalance().then(setBalance);
    }
  }, [activeTab, getBalance]);

  // Load SMM services
  useEffect(() => {
    if (activeTab === 'providers') {
      getServices().then(setSmmServices);
    }
  }, [activeTab, getServices]);

  if (!isAdmin) return null;

  const filteredOrders = getFilteredOrders(statusFilter || undefined, typeFilter || undefined, searchQuery);
  const selectedOrderData = orders.find(o => o.id === selectedOrder);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: isAr ? 'الرئيسية' : 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'analytics', label: isAr ? 'Analytics' : 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'orders', label: isAr ? 'الطلبات' : 'Orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'products', label: isAr ? 'المنتجات' : 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'providers', label: isAr ? 'المزودين' : 'Providers', icon: <Server className="w-5 h-5" /> },
    { id: 'guide', label: isAr ? 'دليل الربط' : 'Setup Guide', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'settings', label: isAr ? 'الإعدادات' : 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-4 z-[100] px-6 py-3 rounded-xl font-medium shadow-lg animate-in slide-in-from-right ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              {isAr ? 'لوحة التحكم - Analytics' : 'Admin Dashboard'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isAr ? 'إدارة الطلبات والمزودين والإعدادات' : 'Manage orders, providers and settings'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Balance Badge */}
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
              <Wallet className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-bold">{balance !== null ? `${balance.toFixed(2)} $` : '---'}</span>
            </div>
            {/* Auto-process toggle */}
            <button
              onClick={() => {
                setAutoProcess(!autoProcess);
                showToast(autoProcess ? (isAr ? 'التنفيذ الآلي متوقف' : 'Auto-process paused') : (isAr ? 'التنفيذ الآلي مفعل!' : 'Auto-process activated!'));
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                autoProcess
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}
            >
              {autoProcess ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAr ? (autoProcess ? 'آلي: شغال' : 'آلي: موقف') : (autoProcess ? 'Auto: ON' : 'Auto: OFF')}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'orders' && stats.pendingOrders > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
                  {stats.pendingOrders}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ========== ANALYTICS TAB ========== */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard lang={lang} />
        )}

        {/* ========== DASHBOARD TAB ========== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: isAr ? 'إجمالي الطلبات' : 'Total Orders', value: stats.totalOrders, icon: <ShoppingBag className="w-6 h-6 text-blue-400" />, color: 'from-blue-500/20 to-blue-900/10' },
                { label: isAr ? 'معلق' : 'Pending', value: stats.pendingOrders, icon: <Clock className="w-6 h-6 text-yellow-400" />, color: 'from-yellow-500/20 to-yellow-900/10' },
                { label: isAr ? 'قيد التنفيذ' : 'Processing', value: stats.processingOrders, icon: <RefreshCw className="w-6 h-6 text-blue-400" />, color: 'from-blue-500/20 to-blue-900/10' },
                { label: isAr ? 'مكتمل' : 'Completed', value: stats.completedOrders, icon: <CheckCircle className="w-6 h-6 text-green-400" />, color: 'from-green-500/20 to-green-900/10' },
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br ${stat.color} border border-white/5 rounded-2xl p-5`}>
                  <div className="flex items-center justify-between mb-3">{stat.icon}<ArrowUpRight className="w-4 h-4 text-gray-500" /></div>
                  <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Revenue + Balance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-gradient-to-br from-green-500/20 to-green-900/10 border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-3xl font-extrabold text-white">{stats.totalRevenue} {isAr ? 'ر.س' : 'SAR'}</div>
                    <div className="text-gray-400 text-sm">{isAr ? 'إجمالي الأرباح' : 'Total Revenue'}</div>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-900/10 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wallet className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-3xl font-extrabold text-white">{balance !== null ? `$${balance.toFixed(2)}` : '---'}</div>
                    <div className="text-gray-400 text-sm">{isAr ? 'رصيد المزود' : 'Provider Balance'}</div>
                  </div>
                </div>
                <button
                  onClick={() => getBalance().then(setBalance)}
                  className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> {isAr ? 'تحديث' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-[#151520] rounded-2xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">{isAr ? 'أحدث الطلبات' : 'Recent Orders'}</h3>
                <button onClick={() => setActiveTab('orders')} className="text-blue-400 text-sm hover:text-blue-300">
                  {isAr ? 'عرض الكل →' : 'View All →'}
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color} ${statusConfig[order.status].border} border`}>
                        {statusConfig[order.status].icon}
                        {isAr ? statusLabels[order.status].ar : statusLabels[order.status].en}
                      </span>
                      <div>
                        <p className="text-white font-medium text-sm">{order.id} - {order.customerName}</p>
                        <p className="text-gray-500 text-xs">{order.platform} - {order.serviceAr}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold">{order.price} {isAr ? 'ر.س' : 'SAR'}</p>
                      <p className="text-gray-500 text-xs">{order.quantity.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== ORDERS TAB ========== */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder={isAr ? 'بحث برقم الطلب، الاسم، المنصة...' : 'Search by order ID, name, platform...'}
                  className="w-full bg-[#151520] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="bg-[#151520] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                <option value="">{isAr ? 'كل الحالات' : 'All Statuses'}</option>
                <option value="pending">{isAr ? 'معلق' : 'Pending'}</option>
                <option value="processing">{isAr ? 'قيد التنفيذ' : 'Processing'}</option>
                <option value="completed">{isAr ? 'مكتمل' : 'Completed'}</option>
                <option value="cancelled">{isAr ? 'ملغي' : 'Cancelled'}</option>
              </select>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                className="bg-[#151520] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                <option value="">{isAr ? 'كل الأنواع' : 'All Types'}</option>
                <option value="digital">{isAr ? 'رقمي' : 'Digital'}</option>
                <option value="marketing">{isAr ? 'تسويقي' : 'Marketing'}</option>
              </select>
            </div>

            <div className="bg-[#151520] rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-400 text-sm">
                      <th className="text-right px-4 py-3">{isAr ? 'الطلب' : 'Order'}</th>
                      <th className="text-right px-4 py-3">{isAr ? 'العميل' : 'Customer'}</th>
                      <th className="text-right px-4 py-3">{isAr ? 'الخدمة' : 'Service'}</th>
                      <th className="text-right px-4 py-3">{isAr ? 'الكمية' : 'Qty'}</th>
                      <th className="text-right px-4 py-3">{isAr ? 'السعر' : 'Price'}</th>
                      <th className="text-right px-4 py-3">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="text-right px-4 py-3">{isAr ? 'إجراء' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-blue-400 font-mono text-sm font-bold">{order.id}</span>
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${order.type === 'digital' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white text-sm">{order.customerName}</p>
                          <p className="text-gray-500 text-xs">{order.customerPhone}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white text-sm">{order.serviceAr}</p>
                          <p className="text-gray-500 text-xs truncate max-w-[150px]">{order.link}</p>
                        </td>
                        <td className="px-4 py-3 text-white text-sm">{order.quantity.toLocaleString()}</td>
                        <td className="px-4 py-3 text-green-400 font-bold text-sm">{order.price} {isAr ? 'ر.س' : ''}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                            {statusConfig[order.status].icon}
                            {isAr ? statusLabels[order.status].ar : statusLabels[order.status].en}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {order.status === 'pending' && (
                              <button onClick={() => { processOrder(order.id); showToast(isAr ? `تم بدء تنفيذ ${order.id}` : `Started ${order.id}`); }} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" title={isAr ? 'بدء التنفيذ' : 'Start'}>
                                <Play className="w-4 h-4" />
                              </button>
                            )}
                            {order.status === 'processing' && (
                              <button onClick={() => { updateOrderStatus(order.id, 'completed'); showToast(isAr ? `تم إكمال ${order.id}` : `Completed ${order.id}`); }} className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30" title={isAr ? 'إكمال' : 'Complete'}>
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => setSelectedOrder(order.id)} className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10" title={isAr ? 'عرض' : 'View'}>
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => { deleteOrder(order.id); showToast(isAr ? 'تم الحذف' : 'Deleted'); }} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30" title={isAr ? 'حذف' : 'Delete'}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrderData && (
              <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                <div className="bg-[#151520] rounded-2xl border border-white/10 p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">{selectedOrderData.id}</h3>
                    <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white"><XCircle className="w-6 h-6" /></button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'العميل' : 'Customer'}</span><span className="text-white">{selectedOrderData.customerName}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'الهاتف' : 'Phone'}</span><a href={`https://wa.me/${selectedOrderData.customerPhone}`} target="_blank" className="text-green-400 underline">{selectedOrderData.customerPhone}</a></div>
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'المنصة' : 'Platform'}</span><span className="text-white">{selectedOrderData.platform}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'الخدمة' : 'Service'}</span><span className="text-white">{selectedOrderData.serviceAr}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'الرابط' : 'Link'}</span><a href={selectedOrderData.link} target="_blank" className="text-blue-400 underline truncate max-w-[200px]">{selectedOrderData.link}</a></div>
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'الكمية' : 'Quantity'}</span><span className="text-white">{selectedOrderData.quantity.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'السعر' : 'Price'}</span><span className="text-green-400 font-bold">{selectedOrderData.price} {isAr ? 'ر.س' : 'SAR'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'الحالة' : 'Status'}</span><span className={`${statusConfig[selectedOrderData.status].color}`}>{isAr ? statusLabels[selectedOrderData.status].ar : statusLabels[selectedOrderData.status].en}</span></div>
                    {selectedOrderData.providerOrderId && (
                      <div className="flex justify-between"><span className="text-gray-400">{isAr ? 'رقم المزود' : 'Provider ID'}</span><span className="text-blue-400 font-mono">{selectedOrderData.providerOrderId}</span></div>
                    )}
                    {selectedOrderData.notes && (
                      <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                        <p className="text-yellow-400 text-xs font-medium mb-1">{isAr ? 'ملاحظات' : 'Notes'}</p>
                        <p className="text-gray-300">{selectedOrderData.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <a href={`https://wa.me/${selectedOrderData.customerPhone}`} target="_blank" className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" /> {isAr ? 'واتساب' : 'WhatsApp'}
                    </a>
                    <button onClick={() => setSelectedOrder(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-2.5 rounded-xl text-sm">{isAr ? 'إغلاق' : 'Close'}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== PRODUCTS TAB ========== */}
        {activeTab === 'products' && (
          <AdminProducts
            isAr={isAr}
            adminProducts={adminProducts}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            showToast={showToast}
          />
        )}

        {/* ========== PROVIDERS TAB ========== */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            {/* Add Provider */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                {isAr ? 'إضافة مزود SMM جديد' : 'Add New SMM Provider'}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">{isAr ? 'اسم المزود' : 'Provider Name'}</label>
                  <input type="text" value={newProviderForm.name} onChange={e => setNewProviderForm(p => ({ ...p, name: e.target.value }))} placeholder="Ezkify"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">{isAr ? 'رابط API' : 'API URL'}</label>
                  <input type="text" value={newProviderForm.apiUrl} onChange={e => setNewProviderForm(p => ({ ...p, apiUrl: e.target.value }))} placeholder="https://ezkify.com/api/v2"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">{isAr ? 'مفتاح API' : 'API Key'}</label>
                  <input type="password" value={newProviderForm.apiKey} onChange={e => setNewProviderForm(p => ({ ...p, apiKey: e.target.value }))} placeholder="sk_live_..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                </div>
              </div>
              <button
                onClick={() => {
                  if (newProviderForm.name && newProviderForm.apiUrl && newProviderForm.apiKey) {
                    addSMMProvider({ ...newProviderForm, active: true });
                    setNewProviderForm({ name: '', apiUrl: '', apiKey: '' });
                    showToast(isAr ? 'تم إضافة المزود!' : 'Provider added!');
                  }
                }}
                className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                <Plus className="w-4 h-4" /> {isAr ? 'إضافة المزود' : 'Add Provider'}
              </button>
            </div>

            {/* Providers List */}
            {smmProviders.length > 0 && (
              <div className="bg-[#151520] rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-5 border-b border-white/5">
                  <h3 className="text-white font-bold">{isAr ? 'المزودين المتصلين' : 'Connected Providers'}</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {smmProviders.map(p => (
                    <div key={p.id} className="p-4 flex items-center justify-between hover:bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${p.active ? 'bg-green-400' : 'bg-gray-600'}`} />
                        <div>
                          <p className="text-white font-medium">{p.name}</p>
                          <p className="text-gray-500 text-xs">{p.apiUrl}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleProvider(p.id)} className="text-sm text-blue-400 hover:text-blue-300">
                          {p.active ? (isAr ? 'تعطيل' : 'Disable') : (isAr ? 'تفعيل' : 'Enable')}
                        </button>
                        <button onClick={() => { removeSMMProvider(p.id); showToast(isAr ? 'تم الحذف' : 'Deleted'); }} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Services */}
            <div className="bg-[#151520] rounded-2xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-white font-bold">{isAr ? 'الخدمات المتاحة' : 'Available Services'}</h3>
                <span className="text-gray-500 text-sm">{smmServices.length} {isAr ? 'خدمة' : 'services'}</span>
              </div>
              {smmLoading ? (
                <div className="p-8 text-center text-gray-500"><RefreshCw className="w-6 h-6 animate-spin mx-auto" /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-400 text-sm">
                        <th className="text-right px-4 py-3">{isAr ? 'ID' : 'ID'}</th>
                        <th className="text-right px-4 py-3">{isAr ? 'الخدمة' : 'Service'}</th>
                        <th className="text-right px-4 py-3">{isAr ? 'التصنيف' : 'Category'}</th>
                        <th className="text-right px-4 py-3">{isAr ? 'السعر/1000' : 'Rate/1000'}</th>
                        <th className="text-right px-4 py-3">{isAr ? 'الحد الأدنى' : 'Min'}</th>
                        <th className="text-right px-4 py-3">{isAr ? 'الحد الأقصى' : 'Max'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {smmServices.map(s => (
                        <tr key={s.service} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 text-blue-400 font-mono text-sm">{s.service}</td>
                          <td className="px-4 py-3 text-white text-sm">{s.name}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm">{s.category}</td>
                          <td className="px-4 py-3 text-green-400 text-sm">${s.rate}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm">{s.min}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm">{parseInt(s.max).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== GUIDE TAB ========== */}
        {activeTab === 'guide' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">{isAr ? 'دليل ربط المزود' : 'Provider Setup Guide'}</h2>
              <p className="text-gray-400">{isAr ? 'خطوات ربط مزود SMM حقيقي مع digzoom' : 'Steps to connect a real SMM provider with digzoom'}</p>
            </div>

            {/* Step 1 */}
            <div className="bg-[#151520] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">1</div>
                <h3 className="text-white font-bold text-lg">{isAr ? 'اختر وسجل في مزود' : 'Choose & Register with a Provider'}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Ezkify', url: 'ezkify.com', desc: isAr ? 'أرخص الأسعار - دعم عربي' : 'Cheapest prices - Arabic support' },
                  { name: 'Peakerr', url: 'peakerr.com', desc: isAr ? 'خدمات متنوعة - API قوي' : 'Diverse services - Strong API' },
                  { name: 'EgyptSMM', url: 'egysmm.com', desc: isAr ? 'متابعين مصريين' : 'Egyptian followers' },
                  { name: 'HGPanel', url: 'hgpanel.com', desc: isAr ? 'سرعة تنفيذ عالية' : 'Fast execution' },
                ].map(p => (
                  <a key={p.name} href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-black/30 rounded-xl p-4 hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{p.name}</p>
                      <p className="text-gray-500 text-xs">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#151520] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">2</div>
                <h3 className="text-white font-bold text-lg">{isAr ? 'احصل على API Key' : 'Get Your API Key'}</h3>
              </div>
              <ol className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">1.</span>{isAr ? 'سجل حساب جديد في الموقع' : 'Register a new account on the site'}</li>
                <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">2.</span>{isAr ? 'شحن الرصيد (10$ كحد أدنى)' : 'Add balance (10$ minimum)'}</li>
                <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">3.</span>{isAr ? 'اذهب لقسم API أو تفعيل API' : 'Go to API section or Activate API'}</li>
                <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">4.</span>{isAr ? 'انسخ API Key' : 'Copy your API Key'}</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="bg-[#151520] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">3</div>
                <h3 className="text-white font-bold text-lg">{isAr ? 'أضف المزود في digzoom' : 'Add Provider to digzoom'}</h3>
              </div>
              <ol className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">1.</span>{isAr ? 'افتح لوحة التحكم - Analytics ← تبويب "المزودين"' : 'Open Dashboard ← "Providers" tab'}</li>
                <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">2.</span>{isAr ? 'املأ البيانات (الاسم + رابط API + API Key)' : 'Fill in the details (Name + API URL + API Key)'}</li>
                <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">3.</span>{isAr ? 'اضغط "إضافة المزود"' : 'Click "Add Provider"'}</li>
              </ol>
              <div className="mt-4 bg-black/30 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-2">{isAr ? 'مثال لـ API URL:' : 'Example API URL:'}</p>
                <div className="flex items-center gap-2">
                  <code className="text-blue-400 text-sm font-mono">https://ezkify.com/api/v2</code>
                  <button
                    onClick={() => { navigator.clipboard.writeText('https://ezkify.com/api/v2'); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="text-gray-500 hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#151520] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">4</div>
                <h3 className="text-white font-bold text-lg">{isAr ? 'فعّل التنفيذ الآلي' : 'Enable Auto-Processing'}</h3>
              </div>
              <p className="text-gray-300 text-sm">
                {isAr
                  ? 'اذهب لقسم "الإعدادات" وشغّل "التنفيذ الآلي". الآن كل طلب جديد يتنفذ آلي من المزود!'
                  : 'Go to "Settings" and enable "Auto-Processing". Now every new order will be processed automatically from the provider!'}
              </p>
            </div>

            {/* How API Works */}
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/10 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-400" />
                {isAr ? 'كيف يعمل API؟' : 'How Does the API Work?'}
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600/20 rounded-lg px-3 py-1.5 text-blue-400 font-mono text-xs">POST</div>
                  <code className="text-gray-400">/api/v2</code>
                </div>
                <div className="bg-black/30 rounded-xl p-4 font-mono text-xs text-gray-400 overflow-x-auto">
{`{
  "key": "YOUR_API_KEY",
  "action": "add",
  "service": 1,
  "link": "https://tiktok.com/@username",
  "quantity": 1000
}`}
                </div>
                <div className="bg-black/30 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto">
{`{
  "order": 123456,
  "status": "pending"
}`}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => setActiveTab('providers')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                {isAr ? 'أضف مزود الآن' : 'Add Provider Now'}
              </button>
            </div>
          </div>
        )}

        {/* ========== SETTINGS TAB ========== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-[#151520] rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-bold text-lg mb-6">{isAr ? 'إعدادات التنفيذ الآلي' : 'Auto-Processing Settings'}</h3>
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl mb-4">
                <div>
                  <p className="text-white font-medium">{isAr ? 'التنفيذ الآلي' : 'Auto-Processing'}</p>
                  <p className="text-gray-500 text-sm">{isAr ? 'تنفيذ الطلبات تلقائياً عبر API' : 'Automatically process orders via API'}</p>
                </div>
                <button
                  onClick={() => { setAutoProcess(!autoProcess); showToast(autoProcess ? (isAr ? 'تم الإيقاف' : 'Paused') : (isAr ? 'تم التفعيل!' : 'Activated!')); }}
                  className={`relative w-14 h-7 rounded-full transition-colors ${autoProcess ? 'bg-green-500' : 'bg-gray-600'}`}
                >
                  <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${autoProcess ? 'left-7' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <p className="text-yellow-400 text-sm">
                  ⚠️ {isAr ? `المزودين المتصلين: ${smmProviders.filter(p => p.active).length}. أضف مزود في تبويب "المزودين".` : `Connected providers: ${smmProviders.filter(p => p.active).length}. Add a provider in the "Providers" tab.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
