import { useState } from 'react';
import {
  LayoutDashboard, ShoppingCart, Package, Users, KeyRound,
  Truck, Share2, CreditCard, Sparkles, BarChart3, Bell,
  Settings, ShieldCheck, ScrollText, LogOut, ChevronRight,
  ChevronLeft, Zap
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { id: 'products', label: 'المنتجات', icon: Package },
  { id: 'orders', label: 'الطلبات', icon: ShoppingCart, badge: 8 },
  { id: 'customers', label: 'العملاء', icon: Users },
  { id: 'codes', label: 'الأكواد', icon: KeyRound, badge: 3 },
  { id: 'delivery', label: 'التسليم', icon: Truck },
  { id: 'social', label: 'سوشال ميديا', icon: Share2 },
  { id: 'subscriptions', label: 'الاشتراكات', icon: CreditCard, badge: 1 },
  { id: 'coupons', label: 'الكوبونات', icon: Sparkles },
  { id: 'analytics', label: 'الأرباح', icon: BarChart3 },
  { id: 'notifications', label: 'الإشعارات', icon: Bell, badge: 3 },
  { id: 'logs', label: 'سجل العمليات', icon: ScrollText },
  { id: 'roles', label: 'الصلاحيات', icon: ShieldCheck },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

interface Props {
  activePage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ activePage, onPageChange, collapsed, onToggle }: Props) {
  const [hovered, setHovered] = useState('');

  return (
    <aside
      className={`fixed top-0 right-0 h-full bg-[#0f0f1a] border-l border-white/[0.06] z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.06]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm">digzoom</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Menu */}
      <nav className="py-4 px-2 space-y-1 overflow-y-auto h-[calc(100%-8rem)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered('')}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400' : ''}`} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.badge && (
                    <span className="min-w-[20px] h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {/* Tooltip for collapsed */}
              {collapsed && hovered === item.id && (
                <div className="absolute right-14 bg-[#1a1a2e] text-white text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 right-0 left-0 p-3 border-t border-white/[0.06]">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>تسجيل خروج</span>}
        </button>
      </div>
    </aside>
  );
}
