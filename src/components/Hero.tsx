import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Download, ShieldCheck, Zap,
  Heart, MessageCircle, Play, Eye, Users,
  Star, Sparkles, TrendingUp,
  Instagram, Youtube,
  Monitor, Globe, ShoppingBag
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

/* ═══════════════════════════════════════════
   REALISTIC HERO SOCIAL MEDIA CARDS
   ═══════════════════════════════════════════ */

function HeroInstaCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <div className="w-[115px] rounded-xl border-2 border-purple-400/30 overflow-hidden shadow-xl shadow-purple-500/25" style={{ backdropFilter: 'blur(8px)', background: 'linear-gradient(135deg, rgba(32,24,44,0.93), rgba(22,18,36,0.93))' }}>
        {/* Header with Instagram Logo */}
        <div className="flex items-center gap-1.5 p-2 border-b border-white/[0.06]">
          <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center shadow-sm">
            <Instagram className="w-3 h-3 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[8px] font-bold text-white/80">instagram</span>
        </div>
        {/* User */}
        <div className="flex items-center gap-1.5 p-1.5">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ring-1 ring-pink-500/30" />
          <div className="h-1.5 bg-white/25 rounded-full w-8" />
        </div>
        {/* Image */}
        <div className="aspect-square bg-gradient-to-br from-purple-800/45 via-pink-800/35 to-orange-800/35 relative flex items-center justify-center">
          <Instagram className="w-6 h-6 text-pink-400/50" />
        </div>
        {/* Actions */}
        <div className="p-1.5 flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-pink-500" strokeWidth={2} />
          <MessageCircle className="w-3.5 h-3.5 text-white/60" strokeWidth={2} />
          <div className="flex-1" />
          <div className="h-1 bg-white/20 rounded-full w-5" />
        </div>
      </div>
    </div>
  );
}

function HeroTikTokCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <div className="w-[100px] rounded-xl border-2 border-cyan-400/30 overflow-hidden shadow-xl shadow-cyan-500/25" style={{ backdropFilter: 'blur(8px)', background: 'linear-gradient(180deg, rgba(12,18,30,0.93), rgba(18,14,30,0.93))' }}>
        {/* Video */}
        <div className="aspect-[9/16] bg-gradient-to-b from-cyan-800/40 via-purple-800/35 to-pink-800/25 relative flex items-center justify-center">
          {/* Play */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
            </div>
            {/* TikTok Logo */}
            <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.2 8.2 0 0 0 4.83 1.56v-3.5a4.85 4.85 0 0 1-1.07-.12z"/>
              </svg>
            </div>
          </div>
          {/* Side actions */}
          <div className="absolute right-1.5 bottom-6 flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center"><Heart className="w-2.5 h-2.5 text-white/70" /></div>
            <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center"><MessageCircle className="w-2.5 h-2.5 text-white/70" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroYouTubeCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <div className="w-[135px] rounded-xl border-2 border-red-400/30 overflow-hidden shadow-xl shadow-red-500/25" style={{ backdropFilter: 'blur(8px)', background: 'linear-gradient(135deg, rgba(36,20,20,0.93), rgba(26,16,16,0.93))' }}>
        {/* Header with YouTube Logo */}
        <div className="flex items-center gap-1.5 p-2 border-b border-white/[0.06]">
          <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center">
            <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
          </div>
          <span className="text-[8px] font-bold text-white/80">YouTube</span>
        </div>
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-red-800/40 via-gray-700/30 to-red-700/30 relative flex items-center justify-center">
          <div className="w-7 h-6 rounded-lg bg-red-600/90 flex items-center justify-center">
            <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
          </div>
        </div>
        {/* Info */}
        <div className="p-1.5 flex gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex-shrink-0 flex items-center justify-center">
            <Youtube className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="flex-1 min-w-0 space-y-1 pt-0.5">
            <div className="h-1.5 bg-white/25 rounded-full w-full" />
            <div className="h-1 bg-white/15 rounded-full w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroAnalyticsCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <div className="w-[140px] rounded-xl border-2 border-blue-400/30 overflow-hidden shadow-xl shadow-blue-500/25" style={{ backdropFilter: 'blur(8px)', background: 'linear-gradient(135deg, rgba(20,24,40,0.93), rgba(16,20,36,0.93))' }}>
        {/* Header */}
        <div className="flex items-center gap-1.5 p-2 border-b border-white/[0.05]">
          <div className="w-5 h-5 rounded bg-blue-600/30 flex items-center justify-center">
            <Monitor className="w-3 h-3 text-blue-400" strokeWidth={2} />
          </div>
          <span className="text-[8px] font-bold text-white/80">Analytics</span>
        </div>
        {/* Stats */}
        <div className="p-1.5 flex gap-1">
          <div className="flex-1 bg-white/[0.04] rounded-lg p-1">
            <Users className="w-2.5 h-2.5 text-blue-400 mb-1" />
            <div className="h-1.5 bg-white/25 rounded-full w-full" />
          </div>
          <div className="flex-1 bg-white/[0.04] rounded-lg p-1">
            <Eye className="w-2.5 h-2.5 text-purple-400 mb-1" />
            <div className="h-1.5 bg-white/25 rounded-full w-full" />
          </div>
        </div>
        {/* Chart */}
        <div className="px-1.5 pb-1.5">
          <div className="h-7 bg-white/[0.03] rounded-lg p-1">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient></defs>
              <path d="M0,28 Q15,24 30,18 T60,12 T90,15 T100,5 L100,30 L0,30 Z" fill="url(#hg)" />
              <path d="M0,28 Q15,24 30,18 T60,12 T90,15 T100,5" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO NETWORK CANVAS
   ═══════════════════════════════════════════ */
function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, animId = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width || window.innerWidth;
      h = rect?.height || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
      });
    }
    const triangles: { x1: number; y1: number; x2: number; y2: number; x3: number; y3: number; pulse: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const cx = Math.random() * w, cy = Math.random() * h, size = Math.random() * 100 + 50;
      triangles.push({ x1: cx, y1: cy - size, x2: cx - size * 0.866, y2: cy + size * 0.5, x3: cx + size * 0.866, y3: cy + size * 0.5, pulse: Math.random() * Math.PI * 2 });
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      triangles.forEach((tri) => {
        const alpha = 0.04 + 0.03 * Math.sin(time * 0.0004 + tri.pulse);
        ctx.beginPath(); ctx.moveTo(tri.x1, tri.y1); ctx.lineTo(tri.x2, tri.y2); ctx.lineTo(tri.x3, tri.y3); ctx.closePath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`; ctx.lineWidth = 0.6; ctx.stroke();
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.2})`; ctx.fill();
      });
      particles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) { const alpha = (1 - dist / 140) * 0.1; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`; ctx.lineWidth = 0.4; ctx.stroke(); }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5); grad.addColorStop(0, 'rgba(139,92,246,0.15)'); grad.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* ═══════════════════════════════════════════
   HERO FLOATING ICONS
   ═══════════════════════════════════════════ */
const HERO_ICONS = [
  { Icon: Heart, x: 5, y: 25, color: '#ff3860', size: 24, delay: 0, duration: 18 },
  { Icon: MessageCircle, x: 92, y: 18, color: '#25d366', size: 28, delay: 2, duration: 22 },
  { Icon: Star, x: 82, y: 55, color: '#ffd700', size: 26, delay: 1, duration: 24 },
  { Icon: Zap, x: 22, y: 60, color: '#ff6b35', size: 28, delay: 3, duration: 19 },
  { Icon: TrendingUp, x: 88, y: 32, color: '#00d4aa', size: 22, delay: 5, duration: 21 },
  { Icon: Users, x: 10, y: 82, color: '#e040fb', size: 22, delay: 2.5, duration: 23 },
  { Icon: Globe, x: 55, y: 8, color: '#448aff', size: 20, delay: 4, duration: 20 },
  { Icon: ShoppingBag, x: 75, y: 82, color: '#7c4dff', size: 26, delay: 1, duration: 25 },
  { Icon: Play, x: 35, y: 78, color: '#ff1744', size: 28, delay: 3.5, duration: 17 },
];

/* ═══════════════════════════════════════════
   MAIN HERO COMPONENT
   ═══════════════════════════════════════════ */
export default function Hero() {
  const { lang, t } = useLanguage();
  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const cards = [
    { Component: HeroInstaCard, x: 3, y: 12, delay: 0, duration: 24, name: 'hc1' },
    { Component: HeroTikTokCard, x: 87, y: 8, delay: 3, duration: 28, name: 'hc2' },
    { Component: HeroYouTubeCard, x: 79, y: 55, delay: 1.5, duration: 26, name: 'hc3' },
    { Component: HeroAnalyticsCard, x: 4, y: 55, delay: 5, duration: 25, name: 'hc4' },
    { Component: HeroInstaCard, x: 68, y: 12, delay: 2, duration: 27, name: 'hc5' },
    { Component: HeroTikTokCard, x: 16, y: 82, delay: 4, duration: 22, name: 'hc6' },
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      <HeroNetworkCanvas />

      {/* Glowing orbs */}
      <div className="absolute w-[550px] h-[550px] rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(100px)', animation: 'hOrb1 18s ease-in-out infinite' }} />
      <div className="absolute w-[450px] h-[450px] rounded-full pointer-events-none" style={{ bottom: '-5%', right: '-5%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(100px)', animation: 'hOrb2 22s ease-in-out infinite' }} />

      {/* Template cards */}
      {cards.map(({ Component, x, y, delay, duration, name }, i) => (
        <Component key={name} style={{ left: `${x}%`, top: `${y}%`, opacity: 0.85, animation: `hOrbit${i % 2 === 0 ? 'CW' : 'CCW'} ${duration}s linear ${delay}s infinite`, zIndex: 2, filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.35)) saturate(1.3) brightness(1.1)' }} />
      ))}

      {/* Icons */}
      {HERO_ICONS.map((item, i) => {
        const { Icon, x, y, color, size, delay, duration } = item;
        return (
          <div key={i} className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 3, opacity: 0.6, animation: `hFloatIcon ${duration}s ease-in-out ${delay}s infinite`, filter: `drop-shadow(0 0 14px ${color}80) brightness(1.2)` }}>
            <Icon size={size} color={color} strokeWidth={1.5} />
          </div>
        );
      })}

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)', backgroundSize: '80px 80px', zIndex: 4 }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24">
        <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-gray-300 text-xs font-medium">{lang === 'ar' ? 'قوالب سوشيال ميديا + إدارة مواقع احترافية' : 'Social Media Templates + Professional Web Management'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.15]">
          {t.hero.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">{t.hero.titleHighlight}</span><br />{t.hero.title2}
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link to="/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:-translate-y-0.5 font-medium">
            {t.hero.btnShop} <Arrow className="w-4 h-4" />
          </Link>
          <Link to="/social" className="inline-flex items-center gap-2 border border-white/10 text-white hover:bg-white/5 px-6 py-3 text-sm rounded-xl transition-all font-medium">
            {lang === 'ar' ? 'خدمات السوشيال ميديا' : 'Social Media Services'}
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-gray-400 text-sm">
          <div className="flex items-center gap-2"><Download className="w-4 h-4 text-blue-400" /><span>{t.hero.feature1}</span></div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-purple-400" /><span>{t.hero.feature2}</span></div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /><span>{t.hero.feature3}</span></div>
        </div>
      </div>

      <style>{`
        @keyframes hOrbitCW {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          12.5% { transform: translate(14px, -20px) rotate(2deg) scale(1.03); }
          25% { transform: translate(20px, 0) rotate(0deg) scale(1); }
          37.5% { transform: translate(14px, 20px) rotate(-2deg) scale(0.97); }
          50% { transform: translate(0, 26px) rotate(0deg) scale(1); }
          62.5% { transform: translate(-14px, 20px) rotate(2deg) scale(1.03); }
          75% { transform: translate(-20px, 0) rotate(0deg) scale(1); }
          87.5% { transform: translate(-14px, -20px) rotate(-2deg) scale(0.97); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        @keyframes hOrbitCCW {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          12.5% { transform: translate(-12px, -16px) rotate(-2deg) scale(0.97); }
          25% { transform: translate(-18px, 0) rotate(0deg) scale(1); }
          37.5% { transform: translate(-12px, 18px) rotate(2deg) scale(1.03); }
          50% { transform: translate(0, 22px) rotate(0deg) scale(1); }
          62.5% { transform: translate(12px, 18px) rotate(-2deg) scale(0.97); }
          75% { transform: translate(18px, 0) rotate(0deg) scale(1); }
          87.5% { transform: translate(12px, -16px) rotate(2deg) scale(1.03); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        @keyframes hFloatIcon {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-10px) scale(1.12) rotate(7deg); opacity: 0.8; }
        }
        @keyframes hOrb1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(45px, 25px); } }
        @keyframes hOrb2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-35px, -45px); } }
      `}</style>
    </section>
  );
}
