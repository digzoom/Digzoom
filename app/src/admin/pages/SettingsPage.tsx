import { useState } from 'react';
import { ShieldCheck, UserCheck, Eye, EyeOff } from 'lucide-react';
import { roles } from '../data/mockData';

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">الإعدادات والصلاحيات</h1><p className="text-gray-400 text-sm mt-1">إدارة المستخدمين والأدوار والحماية</p></div>

      {/* Roles */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-purple-400" /> أدوار المستخدمين</h3>
        <div className="space-y-3">
          {roles.map(r => (
            <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{r.name[0]}</div>
              <div className="flex-1"><div className="text-white font-medium">{r.name}</div><div className="text-gray-400 text-xs">{r.permissions.join(' · ')}</div></div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">{r.permissions.length} صلاحية</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><UserCheck className="w-4 h-4 text-green-400" /> الأمان</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div><div className="text-white text-sm">Rate Limiting</div><div className="text-gray-400 text-xs">100 طلب/دقيقة</div></div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">نشط</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div><div className="text-white text-sm">تسجيل الدخول بخطوتين</div><div className="text-gray-400 text-xs">2FA</div></div>
            <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs">غير مفعل</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div><div className="text-white text-sm">تشفير الأكواد</div><div className="text-gray-400 text-xs">AES-256</div></div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">نشط</span>
          </div>
        </div>
      </div>
    </div>
  );
}
