import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, PackageOpen } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const tax = Math.round(totalPrice * 0.15);
  const total = totalPrice + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center pt-20 px-4">
        <div className="text-center">
          <PackageOpen className="w-20 h-20 text-gray-700 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">{t.cart.emptyTitle}</h2>
          <p className="text-gray-400 mb-8">{t.cart.emptySubtitle}</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3.5 rounded-xl font-medium transition-all">
            {t.cart.btnShop} <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">{t.cart.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-[#151520] rounded-2xl border border-white/[0.04] p-4 flex gap-4">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-white font-semibold mb-1 text-sm line-clamp-2 hover:text-blue-400 transition-colors">{item.title}</h3>
                  </Link>
                  <p className="text-gray-600 text-xs mb-3">{item.fileType} · {item.fileSize}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-1 border border-white/[0.06]">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors">
                        <Minus className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                      <span className="text-white font-medium w-6 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors">
                        <Plus className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-white">{item.price * item.quantity} {t.cart.currency}</span>
                      <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-gray-600 hover:text-red-400 text-sm transition-colors flex items-center gap-2 mt-2">
              <Trash2 className="w-3.5 h-3.5" /> {t.cart.clear}
            </button>
          </div>

          {/* Summary */}
          <div className="bg-[#151520] rounded-2xl border border-white/[0.04] p-6 h-fit lg:sticky lg:top-24">
            <h3 className="text-white font-semibold text-lg mb-6">{t.cart.summary}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>{t.cart.subtotal}</span>
                <span>{totalPrice} {t.cart.currency}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>{t.cart.discount}</span>
                <span className="text-emerald-400">0 {t.cart.currency}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>{t.cart.tax}</span>
                <span>{tax} {t.cart.currency}</span>
              </div>
              <div className="border-t border-white/[0.06] pt-4 flex justify-between">
                <span className="text-white font-semibold">{t.cart.total}</span>
                <span className="text-2xl font-bold text-white">{total} {t.cart.currency}</span>
              </div>
            </div>
            <button onClick={() => navigate('/checkout')} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl text-base font-medium transition-all shadow-lg shadow-blue-500/15">
              {t.cart.checkout}
            </button>
            <Link to="/shop" className="block text-center text-gray-500 hover:text-blue-400 mt-4 text-sm transition-colors">
              {t.cart.continueShopping}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
