import { useState } from 'react';
import { Link } from 'react-router';
import {
  ShoppingBag, CreditCard, Headphones, ShieldCheck, Zap,
  Gamepad2, Phone, CalendarDays, Wand2, Briefcase, Tag,
  Star, ArrowLeft, Sparkles, Clock, Lock, MessageCircle,
  ChevronRight, Percent, Gift
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

/* ───── data ───── */

const trustBlocks = [
  { icon: <Zap className="w-6 h-6" />, title: 'تسليم فوري', desc: 'استلم طلبك خلال دقائق' },
  { icon: <Lock className="w-6 h-6" />, title: 'دفع آمن 100%', desc: 'حماية كاملة للبيانات' },
  { icon: <MessageCircle className="w-6 h-6" />, title: 'دعم سريع', desc: 'متاح 24/7 على الواتساب' },
  { icon: <Tag className="w-6 h-6" />, title: 'أسعار منافسة', desc: 'أقل سعر مضمون' },
];

const gamingCards = [
  { name: 'بطاقة PlayStation', value: '50$ سعودي', price: 195, img: 'bg-gradient-to-br from-blue-600 to-indigo-800', badge: 'الأكثر مبيعاً' },
  { name: 'بطاقة Xbox', value: '50$ سعودي', price: 195, img: 'bg-gradient-to-br from-green-600 to-emerald-800', badge: '' },
  { name: 'بطاقة Steam', value: '50$ دولار', price: 189, img: 'bg-gradient-to-br from-blue-500 to-cyan-700', badge: 'جديد' },
  { name: 'بطاقة Roblox', value: '800 Robux', price: 45, img: 'bg-gradient-to-br from-red-500 to-orange-600', badge: '' },
  { name: 'بطاقة Nintendo', value: '50$ دولار', price: 199, img: 'bg-gradient-to-br from-red-600 to-pink-700', badge: '' },
  { name: 'بطاقة PUBG', value: '3250 UC', price: 99, img: 'bg-gradient-to-br from-yellow-600 to-amber-700', badge: 'عرض' },
];

const topUpCards = [
  { name: 'شحن رصيد STC', value: '20 ر.س', price: 20, img: 'bg-gradient-to-br from-purple-600 to-indigo-700' },
  { name: 'شحن رصيد Mobily', value: '25 ر.س', price: 25, img: 'bg-gradient-to-br from-green-600 to-teal-700' },
  { name: 'شحن رصيد Zain', value: '20 ر.س', price: 20, img: 'bg-gradient-to-br from-blue-600 to-cyan-700' },
  { name: 'شحن جواهر فري فاير', value: '100 جوهرة', price: 9, img: 'bg-gradient-to-br from-orange-500 to-red-600' },
  { name: 'شحن كوينز FIFA', value: '500 نقطة', price: 29, img: 'bg-gradient-to-br from-blue-500 to-purple-600' },
  { name: 'شحن شدات ببجي', value: '60 UC', price: 12, img: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
];

const subscriptions = [
  { name: 'Netflix', period: 'شهر', price: 39, img: 'bg-gradient-to-br from-red-600 to-red-900', icon: '🎬' },
  { name: 'Spotify', period: 'شهر', price: 25, img: 'bg-gradient-to-br from-green-500 to-green-800', icon: '🎵' },
  { name: 'YouTube Premium', period: 'شهر', price: 29, img: 'bg-gradient-to-br from-red-500 to-red-800', icon: '▶️' },
  { name: 'ChatGPT Plus', period: 'شهر', price: 89, img: 'bg-gradient-to-br from-teal-500 to-teal-800', icon: '🤖' },
  { name: 'Midjourney', period: 'شهر', price: 79, img: 'bg-gradient-to-br from-purple-500 to-purple-800', icon: '🎨' },
  { name: 'Canva Pro', period: 'شهر', price: 19, img: 'bg-gradient-to-br from-blue-400 to-indigo-600', icon: '🖼️' },
];

const aiTools = [
  { name: 'حساب ChatGPT', desc: 'وصول كامل لـ GPT-4', price: 89, img: 'bg-gradient-to-br from-teal-500 to-emerald-600' },
  { name: 'حساب Claude', desc: 'وصول لـ Claude 3 Opus', price: 79, img: 'bg-gradient-to-br from-orange-500 to-amber-600' },
  { name: 'حساب Gemini', desc: 'وصول لـ Gemini Advanced', price: 69, img: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
  { name: 'حساب Jasper', desc: 'كتابة محتوى بـ AI', price: 59, img: 'bg-gradient-to-br from-pink-500 to-rose-600' },
  { name: 'حساب Copy.ai', desc: 'نسخ إعلاني ذكي', price: 49, img: 'bg-gradient-to-br from-violet-500 to-purple-600' },
  { name: 'حساب Grammarly', desc: 'تصحيح إملائي متقدم', price: 35, img: 'bg-gradient-to-br from-green-500 to-emerald-600' },
];

const digitalServices = [
  { name: 'إنشاء موقع WordPress', desc: 'موقع كامل جاهز', price: 499, img: 'bg-gradient-to-br from-blue-600 to-indigo-700', icon: <Briefcase className="w-6 h-6" /> },
  { name: 'تصميم لوجو احترافي', desc: '3 تصاميم + الملفات', price: 299, img: 'bg-gradient-to-br from-purple-600 to-pink-700', icon: <Sparkles className="w-6 h-6" /> },
  { name: 'إدارة سوشال ميديا', desc: 'إدارة كاملة لشهر', price: 599, img: 'bg-gradient-to-br from-orange-500 to-red-600', icon: <MessageCircle className="w-6 h-6" /> },
  { name: 'كتابة محتوى SEO', desc: '10 مقالات احترافية', price: 349, img: 'bg-gradient-to-br from-green-600 to-teal-700', icon: <Tag className="w-6 h-6" /> },
  { name: 'إعداد متجر إلكتروني', desc: 'متجر Shopify كامل', price: 899, img: 'bg-gradient-to-br from-cyan-600 to-blue-700', icon: <ShoppingBag className="w-6 h-6" /> },
  { name: 'تصميم هوية بصرية', desc: 'شعار + ألوان + خطوط', price: 399, img: 'bg-gradient-to-br from-rose-600 to-pink-700', icon: <Star className="w-6 h-6" /> },
];

const specialOffers = [
  { name: 'باقة الألعاب الشاملة', desc: 'PS + Xbox + Steam', oldPrice: 589, price: 449, img: 'bg-gradient-to-br from-indigo-600 to-purple-800', tag: 'وفر 24%' },
  { name: 'باقة الاشتراكات', desc: 'Netflix + Spotify + YouTube', oldPrice: 93, price: 69, img: 'bg-gradient-to-br from-red-600 to-pink-800', tag: 'وفر 26%' },
  { name: 'باقة AI احترافية', desc: 'ChatGPT + Claude + Gemini', oldPrice: 237, price: 179, img: 'bg-gradient-to-br from-teal-600 to-emerald-800', tag: 'وفر 24%' },
];

/* ───── component ───── */

function SectionHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 mb-4">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-gray-300 text-sm">{badge}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" dir="rtl">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] -top-40 -right-40 bg-purple-600/8 rounded-full blur-[120px]" />
          <div className="absolute w-[500px] h-[500px] top-1/2 left-0 bg-blue-600/8 rounded-full blur-[100px]" />
          <div className="absolute w-[400px] h-[400px] bottom-0 right-1/3 bg-cyan-600/5 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-5 py-2 mb-8">
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">أكثر من 500 منتج رقمي</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
              متجر المنتجات الرقمية
            </span>
            <br />
            الأول في العالم العربي
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            بطاقات ألعاب، شحن، اشتراكات رقمية، أدوات AI، وخدمات احترافية — كل شي تحتاجه في مكان واحد.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/shop" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-base rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl font-semibold">
              <ShoppingBag className="w-5 h-5" />
              تسوق الآن
            </Link>
            <a href="#offers" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/10 text-white hover:bg-white/5 px-8 py-4 text-base rounded-xl transition-all font-medium">
              <Gift className="w-5 h-5" />
              عروض خاصة
            </a>
          </div>
          {/* Trust mini */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-gray-500 text-sm">
            {trustBlocks.slice(0, 3).map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-blue-400">{b.icon}</span>
                <span>{b.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Blocks ─── */}
      <section className="py-10 border-y border-white/[0.04] bg-gradient-to-b from-[#0a0a0f] to-[#0f0a1a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBlocks.map((b, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-400 mb-3">
                {b.icon}
              </div>
              <div className="font-semibold text-white text-sm mb-1">{b.title}</div>
              <div className="text-gray-500 text-xs">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Gaming Cards ─── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="بطاقات الألعاب" title="اشحن رصيدك بأفضل الأسعار" subtitle="بطاقات PlayStation، Xbox، Steam، Roblox، Nintendo وغيرها" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {gamingCards.map((c, i) => (
              <div key={i} className="group relative bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                {c.badge && (
                  <span className="absolute -top-2 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{c.badge}</span>
                )}
                <div className={`w-full aspect-square rounded-xl ${c.img} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <Gamepad2 className="w-8 h-8 text-white/80" />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{c.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{c.value}</p>
                <p className="text-white font-bold">{c.price} ر.س</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Top-up Cards ─── */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#0f0a1a]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="بطاقات الشحن" title="شحن رصيد ومشتريات داخلية" subtitle="شحن لجميع الشبكات والألعاب بشكل فوري وآمن" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topUpCards.map((c, i) => (
              <div key={i} className="group bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-purple-500/30 transition-all hover:-translate-y-1">
                <div className={`w-full aspect-square rounded-xl ${c.img} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <Phone className="w-8 h-8 text-white/80" />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{c.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{c.value}</p>
                <p className="text-white font-bold">{c.price} ر.س</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Subscriptions ─── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="اشتراكات رقمية" title="اشتراكات بأقل الأسعار" subtitle="Netflix، Spotify، YouTube Premium، ChatGPT Plus وغيرها" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subscriptions.map((s, i) => (
              <div key={i} className="group bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-green-500/30 transition-all hover:-translate-y-1">
                <div className={`w-full aspect-square rounded-xl ${s.img} flex items-center justify-center mb-3 text-3xl group-hover:scale-105 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{s.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{s.period}</p>
                <p className="text-white font-bold">{s.price} ر.س<span className="text-gray-500 text-xs font-normal">/شهر</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Tools ─── */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#0f0a1a]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="أدوات AI" title="حسابات أدوات الذكاء الاصطناعي" subtitle="وصول كامل لأقوى أدوات AI في العالم" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {aiTools.map((t, i) => (
              <div key={i} className="group bg-[#151520] border border-white/[0.06] rounded-2xl p-4 hover:border-teal-500/30 transition-all hover:-translate-y-1">
                <div className={`w-full aspect-square rounded-xl ${t.img} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <Wand2 className="w-8 h-8 text-white/80" />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{t.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{t.desc}</p>
                <p className="text-white font-bold">{t.price} ر.س<span className="text-gray-500 text-xs font-normal">/شهر</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Digital Services ─── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="خدمات رقمية" title="خدمات احترافية لنمو مشروعك" subtitle="فريق متخصص جاهز لتنفيذ مشاريعك الرقمية" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {digitalServices.map((s, i) => (
              <div key={i} className="group flex items-start gap-4 bg-[#151520] border border-white/[0.06] rounded-2xl p-5 hover:border-orange-500/30 transition-all hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${s.img} flex items-center justify-center shrink-0 text-white`}>
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

      {/* ─── Special Offers ─── */}
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
                <div className={`absolute inset-0 ${o.img} opacity-10`} />
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{o.tag}</span>
                <h3 className="text-white font-bold text-lg mb-1 relative z-10">{o.name}</h3>
                <p className="text-gray-400 text-sm mb-4 relative z-10">{o.desc}</p>
                <div className="flex items-center gap-3 relative z-10">
                  <span className="text-gray-500 line-through text-sm">{o.oldPrice} ر.س</span>
                  <span className="text-white font-bold text-2xl">{o.price} ر.س</span>
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition-all relative z-10">
                  اطلب الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">كن أول من يعرف العروض</h2>
          <p className="text-gray-400 mb-6">اشترك في النشرة البريدية واحصل على خصم 10% على أول طلب</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-[#151520] border border-white/[0.08] rounded-xl px-5 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
              اشترك
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
