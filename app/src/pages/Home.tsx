import { useState } from 'react';
import { Link } from 'react-router';
import {
  ShoppingBag, Gamepad2, Phone, Wand2, Briefcase,
  Star, Sparkles, Gift, ChevronRight, Percent,
  Zap, Lock, MessageCircle, Tag, Plus
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';

// ─── old components ───
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Categories from '@/components/Categories';
import SocialServicesHome from '@/components/SocialServicesHome';
import MarketingServicesHome from '@/components/MarketingServicesHome';
import FeaturedProducts from '@/components/FeaturedProducts';
import CTASection from '@/components/CTASection';
import WhyDigzoom from '@/components/WhyDigzoom';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import CouponPopup from '@/components/CouponPopup';

/* ═══════════════════════════════════════════════
   DATA  (new sections)
   ═══════════════════════════════════════════════ */

const trustBlocks = [
  { icon: <Zap className="w-7 h-7" />, title: 'تسليم فوري', desc: 'استلم طلبك خلال دقائق' },
  { icon: <Lock className="w-7 h-7" />, title: 'دفع آمن 100%', desc: 'حماية كاملة للبيانات' },
  { icon: <MessageCircle className="w-7 h-7" />, title: 'دعم سريع', desc: 'متاح 24/7 على الواتساب' },
  { icon: <Tag className="w-7 h-7" />, title: 'أسعار منافسة', desc: 'أقل سعر مضمون' },
];

const gamingCards = [
  { id: 101, name: 'بطاقة PlayStation', value: '50$ سعودي', price: 195, img: '/images/products/gaming/psn-card.png', badge: 'الأكثر مبيعاً', badgeColor: 'from-red-500 to-pink-500' },
  { id: 102, name: 'بطاقة Xbox', value: '50$ سعودي', price: 195, img: '/images/products/gaming/xbox-card.png', badge: '', badgeColor: '' },
  { id: 103, name: 'بطاقة Steam', value: '50$ دولار', price: 189, img: '/images/products/gaming/steam-card.png', badge: 'جديد', badgeColor: 'from-blue-500 to-cyan-400' },
  { id: 104, name: 'بطاقة Roblox', value: '800 Robux', price: 45, img: '/images/products/gaming/roblox-card.png', badge: '', badgeColor: '' },
  { id: 105, name: 'بطاقة Nintendo', value: '50$ دولار', price: 199, img: '/images/products/gaming/nintendo-card.png', badge: '', badgeColor: '' },
  { id: 106, name: 'بطاقة PUBG', value: '3250 UC', price: 99, img: '/images/products/gaming/pubg-card.png', badge: 'عرض', badgeColor: 'from-orange-500 to-yellow-500' },
];

const topUpCards = [
  { id: 201, name: 'شحن رصيد STC', value: '20 ر.س', price: 20, img: '/images/products/topup/stc-card.png' },
  { id: 202, name: 'شحن رصيد Mobily', value: '25 ر.س', price: 25, img: '/images/products/topup/mobily-card.png' },
  { id: 203, name: 'شحن رصيد Zain', value: '20 ر.س', price: 20, img: '/images/products/topup/zain-card.png' },
  { id: 204, name: 'شحن جواهر فري فاير', value: '100 جوهرة', price: 9, img: '/images/products/topup/freefire-card.png' },
  { id: 205, name: 'شحن كوينز FIFA', value: '500 نقطة', price: 29, img: '/images/products/topup/fifa-card.png' },
  { id: 206, name: 'شحن شدات ببجي', value: '60 UC', price: 12, img: '/images/products/topup/pubg-uc-card.png' },
];

const subscriptions = [
  { id: 301, name: 'Netflix', period: 'شهر', price: 39, img: '/images/products/subscriptions/netflix-card.png' },
  { id: 302, name: 'Spotify', period: 'شهر', price: 25, img: '/images/products/subscriptions/spotify-card.png' },
  { id: 303, name: 'YouTube Premium', period: 'شهر', price: 29, img: '/images/products/subscriptions/youtube-card.png' },
  { id: 304, name: 'ChatGPT Plus', period: 'شهر', price: 89, img: '/images/products/subscriptions/chatgpt-card.png' },
  { id: 305, name: 'Midjourney', period: 'شهر', price: 79, img: '/images/products/subscriptions/midjourney-card.png' },
  { id: 306, name: 'Canva Pro', period: 'شهر', price: 19, img: '/images/products/subscriptions/canva-card.png' },
];

const aiTools = [
  { id: 401, name: 'حساب ChatGPT', desc: 'وصول كامل لـ GPT-4', price: 89, img: '/images/products/ai/chatgpt-card.png' },
  { id: 402, name: 'حساب Claude', desc: 'وصول لـ Claude 3 Opus', price: 79, img: '/images/products/ai/claude-card.png' },
  { id: 403, name: 'حساب Gemini', desc: 'وصول لـ Gemini Advanced', price: 69, img: '/images/products/ai/gemini-card.png' },
  { id: 404, name: 'حساب Jasper', desc: 'كتابة محتوى بـ AI', price: 59, img: '/images/products/ai/jasper-card.png' },
  { id: 405, name: 'حساب Copy.ai', desc: 'نسخ إعلاني ذكي', price: 49, img: '/images/products/ai/copyai-card.png' },
  { id: 406, name: 'حساب Grammarly', desc: 'تصحيح إملائي متقدم', price: 35, img: '/images/products/ai/grammarly-card.png' },
];

const digitalServices = [
  { name: 'إنشاء موقع WordPress', desc: 'موقع كامل جاهز', price: 499, grad: 'from-blue-600 to-indigo-700', icon: <Briefcase className="w-6 h-6" /> },
  { name: 'تصميم لوجو احترافي', desc: '3 تصاميم + الملفات', price: 299, grad: 'from-purple-600 to-pink-700', icon: <Sparkles className="w-6 h-6" /> },
  { name: 'إدارة سوشال ميديا', desc: 'إدارة كاملة لشهر', price: 599, grad: 'from-orange-500 to-red-600', icon: <MessageCircle className="w-6 h-6" /> },
  { name: 'كتابة محتوى SEO', desc: '10 مقالات احترافية', price: 349, grad: 'from-green-600 to-teal-700', icon: <Tag className="w-6 h-6" /> },
  { name: 'إعداد متجر إلكتروني', desc: 'متجر Shopify كامل', price: 899, grad: 'from-cyan-600 to-blue-700', icon: <ShoppingBag className="w-6 h-6" /> },
  { name: 'تصميم هوية بصرية', desc: 'شعار + ألوان + خطوط', price: 399, grad: 'from-rose-600 to-pink-700', icon: <Star className="w-6 h-6" /> },
];

const specialOffers = [
  { name: 'باقة الألعاب الشاملة', desc: 'PS + Xbox + Steam', oldPrice: 589, price: 449, grad: 'from-indigo-600 to-purple-800', tag: 'وفر 24%' },
  { name: 'باقة الاشتراكات', desc: 'Netflix + Spotify + YouTube', oldPrice: 93, price: 69, grad: 'from-red-600 to-pink-800', tag: 'وفر 26%' },
  { name: 'باقة AI احترافية', desc: 'ChatGPT + Claude + Gemini', oldPrice: 237, price: 179, grad: 'from-teal-600 to-emerald-800', tag: 'وفر 24%' },
];

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

function SectionHeader({ badge, badgeColor = 'purple', title, subtitle }: {
  badge: string; badgeColor?: string; title: string; subtitle: string;
}) {
  const gradMap: Record<string, string> = {
    purple: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-300',
    blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-300',
    green: 'from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-300',
    red: 'from-red-500/10 to-pink-500/10 border-red-500/20 text-red-300',
    orange: 'from-orange-500/10 to-yellow-500/10 border-orange-500/20 text-orange-300',
  };
  return (
    <div className="text-center mb-10">
      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${gradMap[badgeColor] || gradMap.purple} rounded-full px-4 py-1.5 mb-4`}>
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">{badge}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      {/* ─── 1. Hero (old) ─── */}
      <Hero />

      {/* ─── 2. Trust Blocks (new) ─── */}
      <section className="py-10 border-y border-white/[0.04] bg-gradient-to-b from-[#0a0a0f] to-[#0f0a1a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBlocks.map((b, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 transition-all hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-400 mb-3">
                {b.icon}
              </div>
              <div className="font-semibold text-white text-sm mb-1">{b.title}</div>
              <div className="text-gray-500 text-xs">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. Gaming Cards (new) ─── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="بطاقات الألعاب" badgeColor="purple"
            title="بطاقات ألعاب حقيقية بأفضل الأسعار"
            subtitle="PlayStation، Xbox، Steam، Roblox، Nintendo وغيرها — صور حقيقية 100%" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {gamingCards.map((c, i) => (
              <Link key={i} to={`/product/${c.id}`} state={{ product: { id: c.id, title: c.name, description: c.value, longDescription: c.name + ' - ' + c.value, price: c.price, image: c.img, category: 'gaming', rating: 4.8, reviews: 120, features: ['تسليم فوري', 'ضمان 30 يوم'], fileType: 'رقمي', fileSize: '-', inStock: true } }} className="group relative bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                {c.badge && (
                  <span className={`absolute -top-2 ${isAr ? 'right-3' : 'left-3'} bg-gradient-to-r ${c.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10`}>{c.badge}</span>
                )}
                <img src={c.img} alt={c.name} className="w-full aspect-square rounded-xl object-cover mb-3 group-hover:scale-105 transition-transform" loading="lazy" />
                <h3 className="text-white font-medium text-sm mb-1">{c.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{c.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">{c.price} ر.س</p>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full">شراء</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Top-up Cards (new) ─── */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#0f0a1a]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="بطاقات الشحن" badgeColor="blue"
            title="شحن رصيد ومشتريات داخلية"
            subtitle="شحن لجميع الشبكات والألعاب بشكل فوري وآمن" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topUpCards.map((c, i) => (
              <Link key={i} to={`/product/${c.id}`} state={{ product: { id: c.id, title: c.name, description: c.value, longDescription: c.name + ' - ' + c.value, price: c.price, image: c.img, category: 'topup', rating: 4.7, reviews: 85, features: ['شحن فوري', 'تسليم خلال دقائق'], fileType: 'رقمي', fileSize: '-', inStock: true } }} className="group bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-purple-500/30 transition-all hover:-translate-y-1">
                <img src={c.img} alt={c.name} className="w-full aspect-square rounded-xl object-cover mb-3 group-hover:scale-105 transition-transform" loading="lazy" />
                <h3 className="text-white font-medium text-sm mb-1">{c.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{c.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">{c.price} ر.س</p>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full">شراء</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Subscriptions (new) ─── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="اشتراكات رقمية" badgeColor="red"
            title="اشتراكات بأقل الأسعار"
            subtitle="Netflix، Spotify، YouTube Premium، ChatGPT Plus وغيرها" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subscriptions.map((s, i) => (
              <Link key={i} to={`/product/${s.id}`} state={{ product: { id: s.id, title: 'اشتراك ' + s.name, description: s.period, longDescription: 'اشتراك ' + s.name + ' لمدة ' + s.period, price: s.price, image: s.img, category: 'subscription', rating: 4.9, reviews: 200, features: ['تفعيل فوري', 'ضمان استمرارية'], fileType: 'رقمي', fileSize: '-', inStock: true } }} className="group bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-green-500/30 transition-all hover:-translate-y-1">
                <img src={s.img} alt={s.name} className="w-full aspect-square rounded-xl object-cover mb-3 group-hover:scale-105 transition-transform" loading="lazy" />
                <h3 className="text-white font-medium text-sm mb-1">{s.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{s.period}</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">{s.price} ر.س<span className="text-gray-500 text-xs font-normal">/شهر</span></p>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-600 text-white text-[10px] px-2 py-1 rounded-full">شراء</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. AI Tools (new) ─── */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#0f0a1a]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="أدوات AI" badgeColor="green"
            title="حسابات أدوات الذكاء الاصطناعي"
            subtitle="وصول كامل لأقوى أدوات AI في العالم" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {aiTools.map((t, i) => (
              <Link key={i} to={`/product/${t.id}`} state={{ product: { id: t.id, title: t.name, description: t.desc, longDescription: t.name + ' - ' + t.desc, price: t.price, image: t.img, category: 'ai', rating: 4.9, reviews: 150, features: ['وصول كامل', 'تفعيل فوري'], fileType: 'رقمي', fileSize: '-', inStock: true } }} className="group bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-teal-500/30 transition-all hover:-translate-y-1">
                <img src={t.img} alt={t.name} className="w-full aspect-square rounded-xl object-cover mb-3 group-hover:scale-105 transition-transform" loading="lazy" />
                <h3 className="text-white font-medium text-sm mb-1">{t.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{t.desc}</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">{t.price} ر.س<span className="text-gray-500 text-xs font-normal">/شهر</span></p>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-teal-600 text-white text-[10px] px-2 py-1 rounded-full">شراء</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Digital Services (new) ─── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="خدمات رقمية" badgeColor="orange"
            title="خدمات احترافية لنمو مشروعك"
            subtitle="فريق متخصص جاهز لتنفيذ مشاريعك الرقمية" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {digitalServices.map((s, i) => (
              <div key={i} className="group flex items-start gap-4 bg-[#151520] border border-white/[0.06] rounded-2xl p-5 hover:border-orange-500/30 transition-all hover:-translate-y-1 cursor-pointer">
                <div className={`w-14 h-14 rounded-xl ${s.grad} flex items-center justify-center shrink-0 text-white`}>
                  {s.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{s.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{s.desc}</p>
                  <p className="text-white font-bold">يبدأ من {s.price} ر.س</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Special Offers (new) ─── */}
      <section id="offers" className="py-16 px-4 bg-gradient-to-b from-[#0f0a1a] to-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-4">
              <Percent className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">عروض خاصة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">باقات توفر أكثر</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">اختر باقة ووفّر لغاية 26% على مشترياتك</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {specialOffers.map((o, i) => (
              <div key={i} className="group relative bg-[#151520] border border-white/[0.06] rounded-2xl p-6 hover:border-red-500/30 transition-all hover:-translate-y-1 overflow-hidden">
                <div className={`absolute inset-0 ${o.grad} opacity-10`} />
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{o.tag}</span>
                <h3 className="text-white font-bold text-lg mb-1 relative z-10">{o.name}</h3>
                <p className="text-gray-400 text-sm mb-4 relative z-10">{o.desc}</p>
                <div className="flex items-center gap-3 relative z-10">
                  <span className="text-gray-500 line-through text-sm">{o.oldPrice} ر.س</span>
                  <span className="text-white font-bold text-2xl">{o.price} ر.س</span>
                </div>
                <a href="https://wa.me/966569888456" target="_blank" rel="noopener noreferrer" className="mt-4 block w-full text-center bg-gradient-to-r from-red-500 to-pink-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition-all relative z-10">
                  اطلب الآن
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Social Services (old) ─── */}
      <SocialServicesHome lang={lang as 'ar' | 'en'} />

      {/* ─── 10. Marketing Services (old) ─── */}
      <MarketingServicesHome lang={lang as 'ar' | 'en'} />

      {/* ─── 11. Stats (old) ─── */}
      <Stats />

      {/* ─── 12. Categories (old) ─── */}
      <Categories />

      {/* ─── 13. Featured Products (old) ─── */}
      <FeaturedProducts />

      {/* ─── 14. CTA (old) ─── */}
      <CTASection lang={lang as 'ar' | 'en'} />

      {/* ─── 15. WhyDigzoom (old) ─── */}
      <WhyDigzoom lang={lang as 'ar' | 'en'} />

      {/* ─── 16. Newsletter (new) ─── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">كن أول من يعرف العروض</h2>
          <p className="text-gray-400 mb-6">اشترك في النشرة البريدية واحصل على خصم 10% على أول طلب</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-[#151520] border border-white/[0.08] rounded-xl px-5 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40" />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
              اشترك
            </button>
          </div>
        </div>
      </section>

      {/* ─── 17. Footer (old) ─── */}
      <Footer />

      {/* ─── Overlays ─── */}
      <ChatBot />
      <CouponPopup />
    </div>
  );
}
