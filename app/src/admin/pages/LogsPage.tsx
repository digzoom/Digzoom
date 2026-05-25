import { ScrollText, Filter } from 'lucide-react';
import { logs } from '../data/mockData';

const actionColors: Record<string, string> = {
  'إضافة منتج': 'text-green-400',
  'تغيير سعر': 'text-yellow-400',
  'تسليم كود': 'text-blue-400',
  'تغيير حالة طلب': 'text-orange-400',
  'إنشاء كوبون': 'text-purple-400',
};

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">سجل العمليات</h1><p className="text-gray-400 text-sm mt-1">Logs — تسجيل كل العمليات في النظام</p></div>
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-white/[0.06]">
            {['المستخدم', 'الإجراء', 'الهدف', 'الوقت'].map(h => <th key={h} className="text-right text-gray-400 text-xs font-medium p-4">{h}</th>)}
          </tr></thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="p-4"><span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">{l.user}</span></td>
                <td className={`p-4 text-sm font-medium ${actionColors[l.action] || 'text-gray-400'}`}>{l.action}</td>
                <td className="p-4 text-white text-sm">{l.target}</td>
                <td className="p-4 text-gray-500 text-xs">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
