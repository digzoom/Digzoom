import { Link } from 'react-router';
import { Instagram, Video, Youtube, MessageCircle, Twitter, ArrowLeft, Eye, Star, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const services = [
  { id: 701, icon: Instagram, name: 'انستقرام', desc: '1000 متابع حقيقي', price: 49, color: 'from-pink-500 to-purple-600', rating: 4.9, reviews: 1250, sold: 15420, features: ['متابعين حقيقيين', 'تسليم فوري', 'ضمان استرجاع', 'لا يحتاج باسورد'] },
  { id: 702, icon: Video, name: 'تيك توك', desc: '10,000 مشاهدة', price: 29, color: 'from-cyan-400 to-pink-500', rating: 4.8, reviews: 980, sold: 12300, features: ['مشاهدات حقيقية', 'تسليم فوري', 'زيادة الوصول', 'لا يحتاج باسورد'] },
  { id: 703, icon: Youtube, name: 'يوتيوب', desc: '1000 مشترك', price: 79, color: 'from-red-500 to-red-700', rating: 4.7, reviews: 750, sold: 8900, features: ['مشتركين حقيقيين', 'تفعيل Monetization', 'تسليم تدريجي', 'ضمان 30 يوم'] },
  { id: 704, icon: MessageCircle, name: 'واتساب', desc: '500 مشاهدة', price: 39, color: 'from-green-400 to-green-600', rating: 4.6, reviews: 520, sold: 6700, features: ['مشاهدات حالة', 'تسليم فوري', 'زيادة التفاعل', 'لا يحتاج باسورد'] },
  { id: 705, icon: Twitter, name: 'تويتر', desc: '1000 متابع', price: 59, color: 'from-blue-400 to-blue-600', rating: 4.8, reviews: 680, sold: 9100, features: ['متابعين حقيقيين', 'تسليم فوري', 'زيادة التفاعل', 'لا يحتاج باسورد'] },
];

export default function SocialServicesHome({ lang }: { lang: 'ar' | 'en' }) {
  const t = (a: string, e?: string) => lang === 'ar' ? a : e || a;
  return (
    <section className="py-16 px-4 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{t('خدمات السوشال ميديا الأكثر طلباً', 'Most Requested Social Media Services')}</h2>
          <p className="text-gray-400">{t('أفضل خدمات المتابعين واللايكات والمشاهدات بأسعار تنافسية وسرعة تنفيذ', 'Best follower, like and view services at competitive prices')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-[#151520] border border-white/[0.04] rounded-2xl p-5 text-center hover:border-pink-500/30 transition-all hover:-translate-y-1">
              <Link to={`/product/${s.id}`} state={{ product: { id: s.id, title: s.name + ' - ' + s.desc, description: s.desc, longDescription: 'خدمة ' + s.name + ' - ' + s.desc + ' بجودة عالية وسرعة تسليم. ' + s.features.join(' - '), price: s.price, image: '/images/products/social/social-' + s.id + '.jpg', category: 'social', rating: s.rating, reviews: s.reviews, features: s.features, fileType: 'خدمة', fileSize: '-', inStock: true } }} className="block">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{s.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{s.desc}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-300 text-xs">{s.rating}</span>
                  <span className="text-gray-600 text-[10px]">({s.reviews})</span>
                </div>
                <div className="flex items-center justify-center gap-1 mb-3 text-emerald-400 text-[10px]">
                  <Eye className="w-3 h-3" />
                  <span>{s.sold.toLocaleString()} {t('مبيعة', 'sold')}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-white font-bold">{s.price} ر.س</p>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-pink-600 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" /> شراء
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <Link to="/social" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium text-center hover:shadow-lg transition-all flex items-center gap-2">
            {t('تصفح جميع الخدمات', 'Browse All Services')}
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
