import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router';
import { Star, ShoppingCart, Check, FileText, HardDrive, Download, ArrowLeft, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { lang, t } = useLanguage();
  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // Check if product data passed via Link state (from home cards)
  const stateProduct = (location.state as any)?.product;
  const dbProduct = getProductById(Number(id));
  const product = stateProduct || dbProduct;

  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">{lang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}</p>
          <Link to="/shop" className="text-blue-400 hover:text-blue-300 text-sm">{t.shop.showAll}</Link>
        </div>
      </div>
    );
  }

  // Only show related products if product came from database (not from home card state)
  const related = stateProduct ? [] : getRelatedProducts(Number(id), 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-400 transition-colors">{t.navbar.home}</Link>
          <Arrow className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-blue-400 transition-colors">{t.navbar.shop}</Link>
          <Arrow className="w-3.5 h-3.5" />
          <span className="text-gray-300">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Image */}
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#151520] group">
              <img src={product.image} alt={product.title} className="w-full aspect-square object-cover" />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  {t.shop.discount} {discount}%
                </div>
              )}
              <button onClick={() => setLiked(!liked)} className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${liked ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}>
                <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">{product.title}</h1>
            <p className="text-gray-400 leading-relaxed mb-6">{product.longDescription}</p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
                ))}
              </div>
              <span className="text-gray-300 text-sm">{product.rating}</span>
              <span className="text-gray-600 text-sm">({product.reviews} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-white">{product.price} {t.featured.currency}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-600 line-through">{product.originalPrice} {t.featured.currency}</span>
                  <span className="bg-emerald-500/10 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">{t.product.save} {product.originalPrice - product.price} {t.featured.currency}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/[0.03] rounded-xl px-4 py-2.5 border border-white/[0.06]">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">{product.fileType}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.03] rounded-xl px-4 py-2.5 border border-white/[0.06]">
                <HardDrive className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">{product.fileSize}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.03] rounded-xl px-4 py-2.5 border border-white/[0.06]">
                <Download className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">{t.product.download}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.06] mb-8">
              <h3 className="text-white font-semibold mb-4">{t.product.features}</h3>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { addToCart(product); navigate('/cart'); toast.success(lang === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart'); }}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all font-medium shadow-lg shadow-blue-500/15">
                <ShoppingCart className="w-5 h-5" /> {t.product.buyNow}
              </button>
              <button onClick={() => { addToCart(product); toast.success(lang === 'ar' ? `تمت إضافة "${product.title}" إلى السلة` : `"${product.title}" added to cart`); }}
                className="flex items-center justify-center gap-2 border border-white/10 text-white hover:bg-white/5 px-8 py-4 rounded-xl transition-all font-medium">
                {t.product.addToCart}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-5 text-gray-500 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.product.guarantee}</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{t.product.related}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group bg-[#151520] rounded-2xl border border-white/[0.04] overflow-hidden hover:border-blue-500/20 transition-all">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors line-clamp-1">{p.title}</h3>
                    <p className="text-blue-400 font-bold mt-1">{p.price} {t.featured.currency}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
