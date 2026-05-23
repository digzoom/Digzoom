import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, Zap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, signInWithGoogle } = useAuth();
  const { lang } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const ok = await login(form.email, form.password);
        if (ok) {
          toast.success(lang === 'ar' ? 'تم تسجيل الدخول!' : 'Logged in!');
          navigate('/');
        } else {
          toast.error(lang === 'ar' ? 'بيانات غير صحيحة' : 'Invalid credentials');
        }
      } else {
        if (!form.name) {
          toast.error(lang === 'ar' ? 'الاسم مطلوب' : 'Name is required');
          setLoading(false);
          return;
        }
        const ok = await register(form.name, form.email, form.password);
        if (ok) {
          toast.success(lang === 'ar' ? 'تم إنشاء الحساب!' : 'Account created!');
          navigate('/');
        } else {
          toast.error(lang === 'ar' ? 'الإيميل مستخدم' : 'Email already used');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-white/10">
              <img src="/images/logo-light.jpg" alt="digzoom" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">dig<span className="text-blue-400">zoom</span></span>
              <span className="text-[9px] text-gray-500 tracking-[0.2em]">{lang === 'ar' ? 'ديجي زوم' : 'Digzoom'}</span>
            </div>
          </Link>
        </div>

        <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-8">
          {/* Google Sign In */}
          <button
            onClick={async () => {
              try {
                await signInWithGoogle();
                toast.success(lang === 'ar' ? 'تم تسجيل الدخول!' : 'Logged in!');
                navigate('/');
              } catch (e) {
                toast.error(lang === 'ar' ? 'فشل تسجيل الدخول' : 'Login failed');
              }
            }}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-100 py-3 rounded-xl text-sm font-medium transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {lang === 'ar' ? 'تسجيل الدخول بـ Google' : 'Sign in with Google'}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">{lang === 'ar' ? 'أو' : 'OR'}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-white/[0.03] rounded-xl p-1">
            <button onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </div>
            </button>
            <button onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'register' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" />
                {lang === 'ar' ? 'حساب جديد' : 'Register'}
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-gray-500 text-sm mb-2">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40 placeholder:text-gray-700"
                  placeholder={lang === 'ar' ? 'محمد أحمد' : 'John Smith'} />
              </div>
            )}
            <div>
              <label className="block text-gray-500 text-sm mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40 placeholder:text-gray-700"
                placeholder="user@digzoom.com" dir="ltr" required />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-2">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40 placeholder:text-gray-700"
                  placeholder="••••••" dir="ltr" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-white">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
              {loading ? (
                <span className="animate-pulse">{lang === 'ar' ? 'جاري...' : 'Loading...'}</span>
              ) : mode === 'login' ? (
                <><LogIn className="w-4 h-4" /> {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</>
              ) : (
                <><UserPlus className="w-4 h-4" /> {lang === 'ar' ? 'إنشاء حساب' : 'Create Account'}</>
              )}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-white/[0.04]">
            <p className="text-gray-600 text-xs text-center mb-3">{lang === 'ar' ? 'حسابات تجريبية:' : 'Demo accounts:'}</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setForm({ ...form, email: 'admin@digzoom.com', password: 'admin123' })}
                className="text-xs bg-white/[0.03] border border-white/[0.06] text-gray-400 rounded-lg px-3 py-2 hover:bg-white/[0.06] transition-all text-center">
                <span className="text-blue-400 font-medium block">admin@digzoom.com</span>
                <span className="text-gray-600">admin123</span>
              </button>
              <button onClick={() => setForm({ ...form, email: 'user@digzoom.com', password: 'user123' })}
                className="text-xs bg-white/[0.03] border border-white/[0.06] text-gray-400 rounded-lg px-3 py-2 hover:bg-white/[0.06] transition-all text-center">
                <span className="text-purple-400 font-medium block">user@digzoom.com</span>
                <span className="text-gray-600">user123</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-blue-400 text-sm transition-colors flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
