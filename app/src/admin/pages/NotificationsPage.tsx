import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { notifications as notifs } from '../data/mockData';
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notifs);

  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const remove = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const typeIcons: Record<string, string> = {
    new_order: '🔔', payment: '💰', low_stock: '⚠️', api_error: '❌', new_customer: '👤',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">الإشعارات</h1><p className="text-gray-400 text-sm mt-1">تتبع الأحداث المهمة</p></div>
        <button onClick={markAllRead} className="flex items-center gap-2 bg-[#151520] text-gray-300 px-4 py-2 rounded-xl text-sm border border-white/[0.06] hover:text-white transition-all"><CheckCheck className="w-4 h-4" /> تحديد الكل مقروء</button>
      </div>
      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${!n.read ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-transparent border-transparent'}`}>
            <div className="text-2xl">{typeIcons[n.type] || '🔔'}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2"><span className="text-white font-medium">{n.title}</span>{!n.read && <span className="w-2 h-2 rounded-full bg-blue-400" />}</div>
              <div className="text-gray-400 text-sm mt-1">{n.message}</div>
              <div className="text-gray-500 text-xs mt-1">{n.time}</div>
            </div>
            <div className="flex gap-1">
              {!n.read && <button onClick={() => markRead(n.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10"><CheckCheck className="w-4 h-4" /></button>}
              <button onClick={() => remove(n.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
