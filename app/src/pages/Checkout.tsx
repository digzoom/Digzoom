import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, ShieldCheck, Lock, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const tax = Math.round(totalPrice * 0.15);
  const total = totalPrice + tax;

  const handleStripeCheckout = async () => {
    if (!form.email || !form.name) {
      toast.error(lang === 'ar' ? 'يرجى ملء الاسم والبريد الإلكتروني' : 'Please fill in name and email');
      return;
    }

    setLoading(true);

    try {
      const origin = window.location.origin;

      const response = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            image: `${origin}${item.image}`,
          })),
          successUrl: `${origin}/#/thank-you`,
          cancelUrl: `${origin}/#/cart`,
          customerEmail: form.email,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Payment failed');
      }

      const data = await response.json();

      // Save order to localStorage for thank-you page
      localStorage.setItem('lastOrder', JSON.stringify(items.map(item => ({ product: item, quantity: item.quantity }))));

      // Redirect to Stripe Checkout
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || (lang === 'ar' ? 'فشل في إنشاء جلسة الدفع' : 'Failed to create payment session'));
    } finally {
      setLoading(false);
    }
  };

  // Redirect old success URLs to thank-you page
  if (window.location.hash.includes('/checkout/success')) {
    navigate('/thank-you', { replace: true });
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <span className="cursor-pointer hover:text-blue-400 transition-colors" onClick={() => navigate('/cart')}>{t.cart.title}</span>
          <Arrow className="w-3.5 h-3.5" />
          <span className="text-gray-300">{t.checkout.title}</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">{t.checkout.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                  {t.checkout.personalInfo}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-500 text-sm mb-2">{t.checkout.name}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40 transition-colors placeholder:text-gray-700"
                      placeholder={t.checkout.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-sm mb-2">{t.checkout.email}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40 transition-colors placeholder:text-gray-700"
                      dir="ltr"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-500 text-sm mb-2">{t.checkout.phone}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40 transition-colors placeholder:text-gray-700"
                      placeholder={t.checkout.phonePlaceholder}
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Stripe Card Preview */}
              <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
                  {t.checkout.cardInfo}
                </h3>
                <div className="bg-gradient-to-r from-[#635BFF] to-[#8B5CF6] rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <CreditCard className="w-8 h-8 opacity-80" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-80 invert" />
                  </div>
                  <div className="text-sm opacity-70 mb-1">{lang === 'ar' ? 'بطاقة آمنة عبر Stripe' : 'Secure payment via Stripe'}</div>
                  <div className="text-xs opacity-50">•••• •••• •••• ••••</div>
                </div>
                <p className="text-gray-500 text-sm mt-4 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {lang === 'ar' ? 'سيتم توجيهك لصفحة Stripe الآمنة لإكمال الدفع' : 'You will be redirected to Stripe secure checkout'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.checkout.secure}</span>
              </div>

              <button
                onClick={handleStripeCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white py-4 rounded-xl text-lg font-medium transition-all shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {lang === 'ar' ? 'جاري التوجيه...' : 'Redirecting...'}
                  </>
                ) : (
                  <>
                    {t.checkout.pay} {total} {t.cart.currency}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-6 h-fit lg:sticky lg:top-24">
            <h3 className="text-white font-semibold mb-6">{t.checkout.summary}</h3>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm line-clamp-1">{item.title}</p>
                    <p className="text-gray-600 text-xs">x{item.quantity}</p>
                  </div>
                  <span className="text-gray-300 text-sm">{item.price * item.quantity} {t.cart.currency}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-white/[0.06] pt-4">
              <div className="flex justify-between text-gray-400 text-sm"><span>{t.cart.subtotal}</span><span>{totalPrice} {t.cart.currency}</span></div>
              <div className="flex justify-between text-gray-400 text-sm"><span>{t.cart.tax}</span><span>{tax} {t.cart.currency}</span></div>
              <div className="flex justify-between text-white font-bold border-t border-white/[0.06] pt-3">
                <span>{t.cart.total}</span><span className="text-xl">{total} {t.cart.currency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
