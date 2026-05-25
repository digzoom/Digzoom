import { useState, useEffect } from 'react';
import { Users, Plus, X, Check, Pencil, Trash2, ShieldCheck, Shield, Eye } from 'lucide-react';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  createdAt: string;
}

const LS_KEY = 'digzoom_admin_users';

const defaultUsers: AdminUser[] = [
  { id: 1, name: 'مهران الحميري', email: 'admin@digzoom.com', role: 'superadmin', status: 'active', createdAt: '2026-01-01' },
];

const roleLabels: Record<string, string> = {
  superadmin: 'مدير عام',
  admin: 'مدير',
  editor: 'محرر',
  viewer: 'مشاهد',
};

const roleColors: Record<string, string> = {
  superadmin: 'bg-red-500/10 text-red-400',
  admin: 'bg-orange-500/10 text-orange-400',
  editor: 'bg-blue-500/10 text-blue-400',
  viewer: 'bg-gray-500/10 text-gray-400',
};

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : defaultUsers;
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'editor' as AdminUser['role'], password: '' });

  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(users)); }, [users]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);

  const resetForm = () => { setForm({ name: '', email: '', role: 'editor', password: '' }); setEditingId(null); };
  const openAdd = () => { resetForm(); setShowForm(true); };
  const openEdit = (u: AdminUser) => { setForm({ name: u.name, email: u.email, role: u.role, password: '' }); setEditingId(u.id); setShowForm(true); };

  const handleSave = () => {
    if (!form.name || !form.email) { setToast({ msg: 'يرجى ملء الاسم والبريد', type: 'error' }); return; }
    if (!editingId && !form.password) { setToast({ msg: 'يرجى إدخال كلمة المرور', type: 'error' }); return; }
    if (!editingId && users.some(u => u.email === form.email)) { setToast({ msg: 'البريد موجود مسبقاً!', type: 'error' }); return; }
    const data: AdminUser = { id: editingId ?? Date.now(), name: form.name, email: form.email, role: form.role, status: editingId ? (users.find(u => u.id === editingId)?.status || 'active') : 'active', createdAt: editingId ? (users.find(u => u.id === editingId)?.createdAt || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0] };
    if (editingId) { setUsers(prev => prev.map(u => u.id === editingId ? data : u)); setToast({ msg: 'تم تحديث المستخدم!', type: 'success' }); }
    else { setUsers(prev => [data, ...prev]); setToast({ msg: 'تم إضافة المستخدم!', type: 'success' }); }
    setShowForm(false); resetForm();
  };

  const handleDelete = (id: number) => { if (confirm('حذف المستخدم؟')) { setUsers(prev => prev.filter(u => u.id !== id)); setToast({ msg: 'تم الحذف!', type: 'success' }); } };
  const toggleStatus = (id: number) => { setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u)); setToast({ msg: 'تم تغيير الحالة!', type: 'success' }); };

  return (
    <div className="space-y-6 relative">
      {toast && <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl font-medium shadow-lg ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{toast.msg}</div>}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">المستخدمين والصلاحيات</h1><p className="text-gray-400 text-sm mt-1">إدارة مستخدمي لوحة التحكم وصلاحياتهم</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all"><Plus className="w-4 h-4" /> مستخدم جديد</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{users.length}</div><div className="text-gray-400 text-xs">إجمالي المستخدمين</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-400">{users.filter(u => u.status === 'active').length}</div><div className="text-gray-400 text-xs">نشط</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-purple-400">{users.filter(u => u.role === 'superadmin' || u.role === 'admin').length}</div><div className="text-gray-400 text-xs">مديرين</div></div>
        <div className="bg-[#151520] border border-white/[0.06] rounded-xl p-4 text-center"><div className="text-2xl font-bold text-blue-400">{users.filter(u => u.role === 'editor').length}</div><div className="text-gray-400 text-xs">محررين</div></div>
      </div>
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/[0.06]">
              <th className="text-right text-gray-400 text-xs font-medium p-4">المستخدم</th>
              <th className="text-right text-gray-400 text-xs font-medium p-4">الصلاحية</th>
              <th className="text-right text-gray-400 text-xs font-medium p-4">الحالة</th>
              <th className="text-right text-gray-400 text-xs font-medium p-4 hidden sm:table-cell">تاريخ الإنشاء</th>
              <th className="text-right text-gray-400 text-xs font-medium p-4">إجراءات</th>
            </tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{u.name.charAt(0)}</div><div><div className="text-white text-sm font-medium">{u.name}</div><div className="text-gray-500 text-xs">{u.email}</div></div></div></td>
                  <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[u.role]}`}>{roleLabels[u.role]}</span></td>
                  <td className="p-4"><button onClick={() => toggleStatus(u.id)} className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all ${u.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{u.status === 'active' ? 'نشط' : 'معطل'}</button></td>
                  <td className="p-4 text-gray-500 text-sm hidden sm:table-cell">{u.createdAt}</td>
                  <td className="p-4"><div className="flex items-center gap-2">
                    <button onClick={() => openEdit(u)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-medium"><Pencil className="w-3.5 h-3.5" /> تعديل</button>
                    {u.role !== 'superadmin' && <button onClick={() => handleDelete(u.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium"><Trash2 className="w-3.5 h-3.5" /> حذف</button>}
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && <div className="p-8 text-center text-gray-500">لا يوجد مستخدمين</div>}
      </div>
      {/* Role permissions guide */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-400" /> دليل الصلاحيات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(roleLabels).map(([key, label]) => (
            <div key={key} className="flex items-start gap-3 bg-white/[0.02] rounded-xl p-3">
              <Shield className={`w-5 h-5 mt-0.5 ${key === 'superadmin' ? 'text-red-400' : key === 'admin' ? 'text-orange-400' : key === 'editor' ? 'text-blue-400' : 'text-gray-400'}`} />
              <div><div className="text-white text-sm font-medium">{label}</div><div className="text-gray-500 text-xs mt-1">{key === 'superadmin' ? 'كل الصلاحيات + إدارة المستخدمين' : key === 'admin' ? 'كل الصلاحيات ما عدا إدارة المستخدمين' : key === 'editor' ? 'إضافة وتعديل المنتجات والطلبات فقط' : 'عرض فقط بدون تعديل'}</div></div>
            </div>
          ))}
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#1a1a2e] border border-white/[0.08] rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6"><h3 className="text-xl font-bold text-white">{editingId ? 'تعديل مستخدم' : 'مستخدم جديد'}</h3><button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button></div>
            <div className="space-y-4">
              <div><label className="text-gray-400 text-sm block mb-2">الاسم *</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="text-gray-400 text-sm block mb-2">البريد الإلكتروني *</label><input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" dir="ltr" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-sm block mb-2">الصلاحية</label>
                  <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value as AdminUser['role'] }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                    <option value="admin">مدير</option><option value="editor">محرر</option><option value="viewer">مشاهد</option>
                  </select>
                </div>
                <div><label className="text-gray-400 text-sm block mb-2">{editingId ? 'كلمة المرور (اتركها فارغة للتثبيت)' : 'كلمة المرور *'}</label><input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" /></div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-medium"><Check className="w-4 h-4" /> {editingId ? 'حفظ' : 'إضافة'}</button>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="flex-1 bg-white/5 text-gray-400 py-3 rounded-xl text-sm">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
