import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminSidebar from './components/AdminSidebar';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import CodesPage from './pages/CodesPage';
import SocialPage from './pages/SocialPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import CouponsPage from './pages/CouponsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotificationsPage from './pages/NotificationsPage';
import LogsPage from './pages/LogsPage';
import SettingsPage from './pages/SettingsPage';

export default function AdminLayout() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const pages: Record<string, React.ReactNode> = {
    dashboard: <DashboardPage />,
    products: <ProductsPage />,
    orders: <OrdersPage />,
    customers: <CustomersPage />,
    codes: <CodesPage />,
    delivery: <CodesPage />,
    social: <SocialPage />,
    subscriptions: <SubscriptionsPage />,
    coupons: <CouponsPage />,
    analytics: <AnalyticsPage />,
    notifications: <NotificationsPage />,
    logs: <LogsPage />,
    roles: <SettingsPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white" dir="rtl">
      <AdminSidebar
        activePage={activePage}
        onPageChange={setActivePage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`transition-all duration-300 min-h-screen ${
          sidebarCollapsed ? 'mr-16' : 'mr-64'
        }`}
      >
        {/* Header */}
        <header className="h-16 border-b border-white/[0.06] bg-[#0f0f1a]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">لوحة التحكم</span>
            <span className="text-gray-700">/</span>
            <span className="text-white font-medium text-sm">
              {activePage === 'dashboard' && 'الرئيسية'}
              {activePage === 'products' && 'المنتجات'}
              {activePage === 'orders' && 'الطلبات'}
              {activePage === 'customers' && 'العملاء'}
              {activePage === 'codes' && 'الأكواد'}
              {activePage === 'delivery' && 'التسليم'}
              {activePage === 'social' && 'سوشال ميديا'}
              {activePage === 'subscriptions' && 'الاشتراكات'}
              {activePage === 'coupons' && 'الكوبونات'}
              {activePage === 'analytics' && 'الأرباح'}
              {activePage === 'notifications' && 'الإشعارات'}
              {activePage === 'logs' && 'سجل العمليات'}
              {activePage === 'roles' && 'الصلاحيات'}
              {activePage === 'settings' && 'الإعدادات'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">A</span>
            <span className="text-gray-300 text-sm">Admin</span>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {pages[activePage] || <DashboardPage />}
        </div>
      </main>
    </div>
  );
}
