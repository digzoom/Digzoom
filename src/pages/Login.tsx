import { Link } from 'react-router';
import { Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

function getOAuthUrl() {
  const appId = import.meta.env.VITE_APP_ID;
  const authUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);
  const url = new URL(`${authUrl}/api/oauth/authorize`);
  url.searchParams.set('client_id', appId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('state', state);
  return url.toString();
}

export default function Login() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  // If already logged in, show logout option
  if (user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center pt-16 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {lang === 'ar' ? 'مرحباً' : 'Welcome'} {user.name || ''}
            </h2>
            <p className="text-gray-400 mb-6">
              {lang === 'ar' ? 'أنت مسجل الدخول بالفعل' : 'You are already logged in'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl text-sm font-medium transition-all"
            >
              <Zap className="w-4 h-4" />
              {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-white/10 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">DZ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">dig<span className="text-blue-400">zoom</span></span>
              <span className="text-[9px] text-gray-500 tracking-[0.2em]">{lang === 'ar' ? 'ديجي زوم' : 'Digzoom'}</span>
            </div>
          </Link>
        </div>

        <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-8">
          <h2 className="text-xl font-bold text-white text-center mb-2">
            {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            {lang === 'ar' ? 'سجل الدخول للوصول إلى حسابك' : 'Sign in to access your account'}
          </p>

          {/* OAuth Sign In */}
          <button
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3.5 rounded-xl text-sm font-medium transition-all mb-4"
          >
            <Zap className="w-5 h-5" />
            {lang === 'ar' ? 'تسجيل الدخول بـ OAuth' : 'Sign in with OAuth'}
          </button>

          <p className="text-gray-500 text-xs text-center">
            {lang === 'ar' 
              ? 'بتسجيل الدخول، أنت توافق على شروط الاستخدام وسياسة الخصوصية'
              : 'By signing in, you agree to our Terms of Use and Privacy Policy'}
          </p>
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
