import { useState } from 'react';
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

export default function AdminPreview() {
  const [activePage, setActivePage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white flex" dir="rtl">
      <AdminSidebar activePage={activePage} onPageChange={setActivePage} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'mr-16' : 'mr-64'}`}>
        <header className="h-16 border-b border-white/[0.06] bg-[#0f0f1a]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <span className="text-gray-500 text-sm">لوحة التحكم</span>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">A</span>
            <span className="text-gray-300 text-sm">Admin</span>
          </div>
        </header>
        <div className="p-6">{pages[activePage] || <DashboardPage />}</div>
      </div>
    </div>
  );
}
