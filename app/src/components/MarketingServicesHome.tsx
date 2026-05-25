import { Link } from 'react-router';
import { Palette, TrendingUp, Lightbulb, Camera, Globe } from 'lucide-react';

const services = [
  { icon: Palette, name: 'تصميم محتوى', desc: '10 تصاميم بوستات', price: 200, color: 'from-pink-500 to-rose-600' },
  { icon: TrendingUp, name: 'إعلانات ممولة', desc: 'حملة إعلانية واحدة', price: 300, color: 'from-orange-500 to-red-600' },
  { icon: Lightbulb, name: 'كتابة محتوى', desc: '20 كابشن إبداعي', price: 150, color: 'from-green-500 to-emerald-600' },
  { icon: Camera, name: 'تصوير منتجات', desc: 'جلسة تصوير احترافية', price: 250, color: 'from-purple-500 to-indigo-600' },
  { icon: Globe, name: 'تحسين SEO', desc: 'تحسين شامل للموقع', price: 250, color: 'from-blue-500 to-cyan-600' },
];

export default function MarketingServicesHome({ lang }: { lang: 'ar' | 'en' }) {
  const t = (a: string, e?: string) => lang === 'ar' ? a : e || a;
  return (
    <section className="py-16 px-4 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-green-400 text-sm font-medium">{t('خدمات احترافية', 'Professional Services')}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t('خدمات التسويق الرقمي', 'Digital Marketing Services')}</h2>
          <p className="text-gray-400">{t('خدمات تسويقية احترافية لنمو علامتك التجارية وزيادة مبيعاتك', 'Professional marketing services to grow your brand and increase sales')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {services.map((s, i) => (
            <div key={i} className="bg-[#151520] border border-white/[0.04] rounded-2xl p-5 text-center hover:border-green-500/30 transition-all">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-medium text-sm mb-1">{s.name}</h3>
              <p className="text-gray-400 text-xs mb-3">{s.desc}</p>
              <p className="text-white font-bold">{s.price} {t('ر.س', 'SAR')}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/marketing" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium text-center hover:shadow-lg transition-all">
            {t('تصفح كل الخدمات', 'Browse All Services')}
          </Link>
          <a href="https://wa.me/966569888456" target="_blank" rel="noopener noreferrer" className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-3 rounded-xl font-medium text-center hover:bg-green-500/20 transition-all">
            {t('استشارة مجانية', 'Free Consultation')}
          </a>
        </div>
      </div>
    </section>
  );
}
