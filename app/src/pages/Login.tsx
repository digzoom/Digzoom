import { useState } from 'react';
import { Link } from 'react-router';
import { LogIn, Mail, Lock, ArrowLeft, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

export default function Login() {
  const { user, login, register, logout, signInWithGoogle, isLoading } = useAuth();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const t = (ar: string, en: string) => isAr ? ar : en;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError(t('بريد أو كلمة مرور غير صحيحة', 'Invalid email or password'));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);
    if (!ok) setError(t('البريد مستخدم مسبقاً', 'Email already registered'));
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch {
      setError(t('تعذر تسجيل الدخول بـ Google', 'Google sign-in failed'));
    }
    setLoading(false);
  };

  // ─── Logged in view ───
  if (user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center pt-16 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-8">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="w-16 h-16 rounded-full mx-auto mb-4 ring-2 ring-blue-500/30" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">{user.name?.[0]?.toUpperCase() || 'U'}</span>
              </div>
            )}
            <h2 className="text-xl font-bold text-white mb-1">{t('مرحباً', 'Welcome')} {user.name}</h2>
            <p className="text-gray-400 text-sm mb-6">{user.email}</p>
            <div className="flex flex-col gap-3">
              {user.role === 'admin' && (
                <Link to="/admin" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-medium hover:shadow-lg transition-all">
                  {t('لوحة التحكم', 'Admin Dashboard')}
                </Link>
              )}
              <button onClick={logout} className="w-full flex items-center justify-center gap-2 border border-red-500/30 text-red-400 py-3 rounded-xl text-sm font-medium hover:bg-red-500/10 transition-all">
                <LogIn className="w-4 h-4" />
                {t('تسجيل خروج', 'Sign Out')}
              </button>
              <Link to="/" className="text-gray-500 hover:text-blue-400 text-sm transition-colors flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('العودة للرئيسية', 'Back to Home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Login / Register form ───
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-lg">DZ</span>
            </div>
            <span className="text-2xl font-bold">
              <span className="text-white">dig</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">zoom</span>
            </span>
          </Link>
        </div>

        <div className="bg-[#151520] rounded-2xl border border-white/[0.06] p-8">
          {/* Tabs */}
          <div className="flex mb-6 bg-white/[0.03] rounded-xl p-1">
            <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
              {t('تسجيل الدخول', 'Sign In')}
            </button>
            <button onClick={() => { setMode('register'); setError(''); }} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'register' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
              {t('حساب جديد', 'Sign Up')}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button onClick={handleGoogle} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 py-3.5 rounded-xl text-sm font-medium transition-all mb-4 disabled:opacity-50">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('تسجيل الدخول بـ Google', 'Sign in with Google')}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-gray-500 text-xs">{t('أو', 'or')}</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Form */}
          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <UserPlus className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('الاسم الكامل', 'Full Name')} required className="w-full bg-[#0f0f1a] border border-white/[0.08] rounded-xl pr-10 pl-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('البريد الإلكتروني', 'Email')} required className="w-full bg-[#0f0f1a] border border-white/[0.08] rounded-xl pr-10 pl-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('كلمة المرور', 'Password')} required minLength={6} className="w-full bg-[#0f0f1a] border border-white/[0.08] rounded-xl pr-10 pl-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
            </div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
              <LogIn className="w-4 h-4" />
              {loading ? t('جاري...', 'Loading...') : mode === 'login' ? t('تسجيل الدخول', 'Sign In') : t('إنشاء حساب', 'Create Account')}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <p className="text-gray-400 text-xs text-center">
              {t('حساب تجريبي:', 'Demo account:')} <span className="text-blue-400">admin@digzoom.com</span> / <span className="text-blue-400">admin123</span>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-blue-400 text-sm transition-colors flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('العودة للرئيسية', 'Back to Home')}
          </Link>
        </div>
      </div>
    </div>
  );
}
