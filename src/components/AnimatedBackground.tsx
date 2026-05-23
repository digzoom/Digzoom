import { useEffect, useRef } from 'react';
import {
  Heart, MessageCircle, Share2, Play, Eye, Users,
  TrendingUp, ShoppingBag, Star, Bookmark, Send,
  Instagram, Youtube, Twitter, MessageSquare,
  Monitor, Smartphone, Globe, Zap
} from 'lucide-react';

/* ═══════════════════════════════════════════
   REALISTIC SOCIAL MEDIA APP CARDS
   ═══════════════════════════════════════════ */

/* ─── Instagram App Card (Real Interface) ─── */
function InstaCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={{ ...style, zIndex: 2 }}>
      <div className="w-[150px] rounded-2xl border-2 border-purple-400/30 overflow-hidden shadow-2xl shadow-purple-500/20"
        style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(180deg, #1a1025 0%, #0d0a18 100%)' }}>
        {/* App Header with Logo */}
        <div className="flex items-center justify-between p-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Instagram className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide">instagram</span>
          </div>
          <div className="w-1 h-4 bg-white/20 rounded-full" />
        </div>
        {/* User bar */}
        <div className="flex items-center gap-2 p-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-pink-500/30" />
          <div className="h-2 bg-white/30 rounded-full w-14" />
          <div className="ml-auto">
            <div className="w-1 h-3 bg-white/20 rounded-full" />
          </div>
        </div>
        {/* Main Image - gradient like real post */}
        <div className="aspect-square bg-gradient-to-br from-purple-800/60 via-pink-800/40 to-orange-800/40 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/10 flex items-center justify-center shadow-xl">
              <Instagram className="w-8 h-8 text-pink-400/60" />
            </div>
          </div>
        </div>
        {/* Action bar */}
        <div className="p-2.5 flex items-center gap-3">
          <Heart className="w-5 h-5 text-pink-500" strokeWidth={2} />
          <MessageCircle className="w-5 h-5 text-white/70" strokeWidth={2} />
          <Send className="w-5 h-5 text-white/70" strokeWidth={2} />
          <div className="flex-1" />
          <Bookmark className="w-5 h-5 text-white/70" strokeWidth={2} />
        </div>
        {/* Likes */}
        <div className="px-2.5 pb-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="h-2 bg-pink-500/40 rounded-full w-16" />
          </div>
          <div className="h-1.5 bg-white/10 rounded-full w-full" />
        </div>
      </div>
    </div>
  );
}

/* ─── TikTok App Card (Real Interface with Logo) ─── */
function TikTokCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={{ ...style, zIndex: 2 }}>
      <div className="w-[125px] rounded-2xl border-2 border-cyan-400/30 overflow-hidden shadow-2xl shadow-cyan-500/20"
        style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(180deg, #0a1520 0%, #0d0a18 100%)' }}>
        {/* Video Area */}
        <div className="aspect-[9/16] bg-gradient-to-b from-cyan-900/50 via-purple-900/40 to-pink-900/30 relative flex items-center justify-center">
          {/* Center Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
            {/* TikTok Logo */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-cyan-300 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.2 8.2 0 0 0 4.83 1.56v-3.5a4.85 4.85 0 0 1-1.07-.12z"/>
                </svg>
              </div>
              <span className="text-[8px] font-bold text-cyan-400 tracking-wider">TikTok</span>
            </div>
          </div>
          {/* Right Side Actions */}
          <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white/80" strokeWidth={2} />
              </div>
              <span className="text-[8px] text-white/60 font-medium">12.5K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white/80" strokeWidth={2} />
              </div>
              <span className="text-[8px] text-white/60 font-medium">842</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-white/80" strokeWidth={2} />
              </div>
              <span className="text-[8px] text-white/60 font-medium">156</span>
            </div>
          </div>
          {/* Bottom User */}
          <div className="absolute left-2 bottom-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 ring-2 ring-white/20" />
            <span className="text-[9px] text-white/80 font-medium">@user</span>
          </div>
          {/* Music note */}
          <div className="absolute bottom-4 right-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-cyan-400" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── YouTube App Card (Real Interface with Logo) ─── */
function YouTubeCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={{ ...style, zIndex: 2 }}>
      <div className="w-[170px] rounded-2xl border-2 border-red-400/30 overflow-hidden shadow-2xl shadow-red-500/20"
        style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(180deg, #1a1010 0%, #0d0a0a 100%)' }}>
        {/* Header with YouTube Logo */}
        <div className="flex items-center justify-between p-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide">YouTube</span>
          </div>
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-white/20 rounded-full" />
            <div className="w-1 h-3 bg-white/20 rounded-full" />
            <div className="w-1 h-3 bg-white/20 rounded-full" />
          </div>
        </div>
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-red-900/50 via-gray-800/30 to-red-800/30 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-9 rounded-xl bg-red-600/90 flex items-center justify-center shadow-xl shadow-red-600/30">
              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
            </div>
          </div>
          {/* Duration */}
          <div className="absolute bottom-2 right-2 bg-black/80 rounded px-1.5 py-0.5">
            <span className="text-[9px] text-white font-medium">12:34</span>
          </div>
          {/* HD badge */}
          <div className="absolute top-2 left-2 bg-black/60 rounded px-1 py-0.5">
            <span className="text-[8px] text-white/80 font-medium">HD</span>
          </div>
        </div>
        {/* Info */}
        <div className="p-2.5 flex gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex-shrink-0 flex items-center justify-center shadow-md shadow-red-500/20">
            <Youtube className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
            <div className="h-2.5 bg-white/30 rounded-full w-full" />
            <div className="h-2 bg-white/15 rounded-full w-3/4" />
            <div className="flex items-center gap-2">
              <div className="h-1.5 bg-white/10 rounded-full w-10" />
              <span className="text-[8px] text-white/30">•</span>
              <div className="h-1.5 bg-white/10 rounded-full w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Twitter/X App Card (Real Interface with Logo) ─── */
function TwitterCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={{ ...style, zIndex: 2 }}>
      <div className="w-[160px] rounded-2xl border-2 border-blue-400/30 overflow-hidden shadow-2xl shadow-blue-500/20"
        style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(180deg, #0f1525 0%, #0a0e18 100%)' }}>
        {/* Header with X Logo */}
        <div className="flex items-center gap-2 p-3 border-b border-white/[0.08]">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-md">
            <Twitter className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-bold text-white tracking-wide">𝕏</span>
        </div>
        {/* User */}
        <div className="flex items-center gap-2 p-2.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500" />
          <div className="flex-1 min-w-0">
            <div className="h-2 bg-white/30 rounded-full w-14" />
            <div className="h-1.5 bg-white/15 rounded-full w-10 mt-1" />
          </div>
        </div>
        {/* Content */}
        <div className="px-2.5 pb-2 space-y-1.5">
          <div className="h-2 bg-white/20 rounded-full w-full" />
          <div className="h-2 bg-white/20 rounded-full w-5/6" />
          <div className="h-2 bg-white/20 rounded-full w-4/6" />
        </div>
        {/* Media */}
        <div className="mx-2.5 mb-2 aspect-[16/9] bg-gradient-to-br from-blue-800/40 to-cyan-800/30 rounded-xl flex items-center justify-center">
          <Twitter className="w-8 h-8 text-blue-400/40" strokeWidth={1.5} />
        </div>
        {/* Actions */}
        <div className="p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-blue-400/60" strokeWidth={2} />
            <span className="text-[9px] text-white/40">24</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4 text-green-400/60" strokeWidth={2} />
            <span className="text-[9px] text-white/40">8</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-pink-400/60" strokeWidth={2} />
            <span className="text-[9px] text-white/40">156</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-purple-400/60" strokeWidth={2} />
            <span className="text-[9px] text-white/40">2.1K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── WhatsApp App Card (Real Interface with Logo) ─── */
function WhatsAppCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={{ ...style, zIndex: 2 }}>
      <div className="w-[120px] rounded-2xl border-2 border-green-400/30 overflow-hidden shadow-2xl shadow-green-500/20"
        style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(180deg, #0a1a0f 0%, #0a120a 100%)' }}>
        {/* Header with WhatsApp Logo */}
        <div className="flex items-center gap-2 p-3 border-b border-white/[0.08]"
          style={{ background: 'linear-gradient(180deg, #0d2818 0%, #0a1a0f 100%)' }}>
          <div className="w-7 h-7 rounded-xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
            <MessageSquare className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-bold text-green-400 tracking-wide">WhatsApp</span>
        </div>
        {/* Status area */}
        <div className="aspect-[9/14] bg-gradient-to-b from-green-900/30 to-emerald-900/20 relative flex items-center justify-center p-3">
          <div className="w-full h-full rounded-xl border-2 border-dashed border-green-500/30 flex flex-col items-center justify-center gap-3">
            {/* WhatsApp Logo Big */}
            <div className="w-14 h-14 rounded-2xl bg-green-600/30 border-2 border-green-400/40 flex items-center justify-center shadow-xl shadow-green-500/20">
              <MessageSquare className="w-7 h-7 text-green-400" strokeWidth={2} />
            </div>
            <div className="text-center space-y-1.5">
              <div className="h-2 bg-green-500/30 rounded-full w-16" />
              <div className="h-1.5 bg-green-500/15 rounded-full w-10" />
            </div>
          </div>
          {/* Reply bar */}
          <div className="absolute bottom-4 left-3 right-3 h-6 bg-green-900/40 rounded-full border border-green-500/20 flex items-center px-3">
            <span className="text-[8px] text-green-400/50">Type a message...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Website Analytics Dashboard Card (Real Interface) ─── */
function AnalyticsCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={{ ...style, zIndex: 2 }}>
      <div className="w-[180px] rounded-2xl border-2 border-blue-400/30 overflow-hidden shadow-2xl shadow-blue-500/20"
        style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(180deg, #0f1a2e 0%, #0a0e1a 100%)' }}>
        {/* Header with Dashboard Icon */}
        <div className="flex items-center gap-2 p-3 border-b border-white/[0.08]">
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center shadow-md shadow-blue-500/20">
            <Monitor className="w-4 h-4 text-blue-400" strokeWidth={2} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white tracking-wide">Analytics</span>
            <div className="h-1.5 bg-green-500/40 rounded-full w-6 mt-0.5" />
          </div>
        </div>
        {/* Stats Grid */}
        <div className="p-2.5 grid grid-cols-2 gap-2">
          <div className="bg-white/[0.04] rounded-xl p-2 border border-blue-500/10">
            <Users className="w-3.5 h-3.5 text-blue-400 mb-1.5" strokeWidth={2} />
            <div className="h-2.5 bg-white/30 rounded-full w-full" />
            <div className="h-1.5 bg-green-500/40 rounded-full w-8 mt-1.5" />
          </div>
          <div className="bg-white/[0.04] rounded-xl p-2 border border-purple-500/10">
            <Eye className="w-3.5 h-3.5 text-purple-400 mb-1.5" strokeWidth={2} />
            <div className="h-2.5 bg-white/30 rounded-full w-full" />
            <div className="h-1.5 bg-green-500/40 rounded-full w-8 mt-1.5" />
          </div>
        </div>
        {/* Chart */}
        <div className="px-2.5 pb-2.5">
          <div className="h-16 bg-white/[0.03] rounded-xl p-2 border border-blue-500/10 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,32 Q10,28 20,22 T40,16 T60,10 T80,14 T100,4 L100,35 L0,35 Z" fill="url(#chartGrad)" />
              <path d="M0,32 Q10,28 20,22 T40,16 T60,10 T80,14 T100,4" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Subscription/VIP Card (Real Interface) ─── */
function SubscriptionCard({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={{ ...style, zIndex: 2 }}>
      <div className="w-[140px] rounded-2xl border-2 border-yellow-400/30 overflow-hidden shadow-2xl shadow-yellow-500/20"
        style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(180deg, #2a1f14 0%, #1a1420 100%)' }}>
        {/* VIP Header with Crown */}
        <div className="flex flex-col items-center pt-4 pb-3 border-b border-white/[0.08]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-2 border-yellow-400/30 flex items-center justify-center mb-2 shadow-lg shadow-yellow-500/20">
            <Star className="w-5 h-5 text-yellow-400" strokeWidth={2} fill="currentColor" />
          </div>
          <span className="text-[10px] font-bold text-yellow-400 tracking-wider">VIP</span>
          <div className="h-2 bg-white/30 rounded-full w-16 mt-1.5" />
          <div className="h-1.5 bg-white/15 rounded-full w-10 mt-1" />
        </div>
        {/* Features */}
        <div className="px-3 pb-3 pt-2 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-400/70" strokeWidth={2} />
              <div className="h-1.5 bg-white/15 rounded-full flex-1" />
            </div>
          ))}
          {/* Subscribe Button */}
          <div className="mt-3 h-7 bg-gradient-to-r from-purple-600/60 to-pink-600/60 rounded-lg flex items-center justify-center">
            <span className="text-[9px] font-bold text-white tracking-wide">SUBSCRIBE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FLOATING ICONS
   ═══════════════════════════════════════════ */
const FLOATING_ICONS = [
  { Icon: Heart, x: 5, y: 20, color: '#ff3860', size: 24, delay: 0 },
  { Icon: MessageCircle, x: 92, y: 15, color: '#25d366', size: 28, delay: 2 },
  { Icon: Share2, x: 85, y: 72, color: '#5865f2', size: 22, delay: 4 },
  { Icon: Star, x: 8, y: 68, color: '#ffd700', size: 26, delay: 1 },
  { Icon: Zap, x: 78, y: 28, color: '#ff6b35', size: 28, delay: 3 },
  { Icon: TrendingUp, x: 12, y: 82, color: '#00d4aa', size: 24, delay: 5 },
  { Icon: Users, x: 90, y: 48, color: '#e040fb', size: 22, delay: 2.5 },
  { Icon: ShoppingBag, x: 28, y: 38, color: '#7c4dff', size: 26, delay: 3.5 },
  { Icon: Play, x: 72, y: 88, color: '#ff1744', size: 30, delay: 0.5 },
  { Icon: Globe, x: 50, y: 10, color: '#448aff', size: 24, delay: 6 },
  { Icon: Smartphone, x: 95, y: 62, color: '#00e5ff', size: 22, delay: 1.5 },
  { Icon: Eye, x: 18, y: 52, color: '#69f0ae', size: 24, delay: 4.5 },
];

/* ═══════════════════════════════════════════
   GEOMETRIC NETWORK CANVAS
   ═══════════════════════════════════════════ */
function GeometricNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, animId = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = Math.max(window.innerHeight, 1200);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }
    const triangles: { x1: number; y1: number; x2: number; y2: number; x3: number; y3: number; alpha: number; pulse: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const cx = Math.random() * w, cy = Math.random() * h, size = Math.random() * 130 + 70;
      triangles.push({
        x1: cx, y1: cy - size, x2: cx - size * 0.866, y2: cy + size * 0.5, x3: cx + size * 0.866, y3: cy + size * 0.5,
        alpha: Math.random() * 0.06 + 0.02, pulse: Math.random() * Math.PI * 2,
      });
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      triangles.forEach((tri) => {
        const pulseAlpha = tri.alpha * (0.7 + 0.3 * Math.sin(time * 0.0005 + tri.pulse));
        ctx.beginPath(); ctx.moveTo(tri.x1, tri.y1); ctx.lineTo(tri.x2, tri.y2); ctx.lineTo(tri.x3, tri.y3); ctx.closePath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${pulseAlpha})`; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.fillStyle = `rgba(139, 92, 246, ${pulseAlpha * 0.2})`; ctx.fill();
      });
      particles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) { const alpha = (1 - dist / 160) * 0.1; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; ctx.fill();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4); grad.addColorStop(0, `rgba(139, 92, 246, ${p.alpha * 0.25})`); grad.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />;
}

/* ═══════════════════════════════════════════
   GLOWING ORBS
   ═══════════════════════════════════════════ */
function GlowingOrbs() {
  return (
    <>
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{ top: '5%', left: '-8%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'orb1 20s ease-in-out infinite' }} />
      <div className="absolute w-[450px] h-[450px] rounded-full pointer-events-none" style={{ top: '45%', right: '-5%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'orb2 24s ease-in-out infinite' }} />
      <div className="absolute w-[350px] h-[350px] rounded-full pointer-events-none" style={{ bottom: '8%', left: '25%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'orb3 22s ease-in-out infinite' }} />
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function AnimatedBackground({
  children,
  showCards = true,
  showIcons = true,
  showNetwork = true,
  showOrbs = true,
  className = '',
}: {
  children?: React.ReactNode;
  showCards?: boolean;
  showIcons?: boolean;
  showNetwork?: boolean;
  showOrbs?: boolean;
  className?: string;
}) {
  const cards = [
    { Component: InstaCard, x: 1, y: 4, delay: 0, duration: 26, name: 'insta1' },
    { Component: TikTokCard, x: 88, y: 2, delay: 3, duration: 30, name: 'tik1' },
    { Component: YouTubeCard, x: 74, y: 50, delay: 1.5, duration: 28, name: 'yt1' },
    { Component: TwitterCard, x: 0, y: 45, delay: 5, duration: 24, name: 'tw1' },
    { Component: WhatsAppCard, x: 90, y: 32, delay: 2, duration: 27, name: 'wa1' },
    { Component: AnalyticsCard, x: 1, y: 70, delay: 4, duration: 25, name: 'analytics1' },
    { Component: SubscriptionCard, x: 72, y: 74, delay: 1, duration: 29, name: 'sub1' },
    { Component: InstaCard, x: 54, y: 8, delay: 6, duration: 23, name: 'insta2' },
    { Component: TikTokCard, x: 16, y: 84, delay: 3.5, duration: 26, name: 'tik2' },
    { Component: YouTubeCard, x: 30, y: 62, delay: 0.5, duration: 31, name: 'yt2' },
  ];

  return (
    <div className={`relative min-h-screen bg-[#0a0a0f] overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(236,72,153,0.03) 0%, transparent 50%)', zIndex: 0 }} />

      {showOrbs && <GlowingOrbs />}
      {showNetwork && <GeometricNetwork />}

      {/* Floating template cards */}
      {showCards && cards.map(({ Component, x, y, delay, duration, name }, i) => (
        <Component
          key={name}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            opacity: 0.85,
            animation: `orbit${i % 2 === 0 ? 'CW' : 'CCW'} ${duration}s linear ${delay}s infinite`,
            filter: 'drop-shadow(0 0 35px rgba(139, 92, 246, 0.4)) saturate(1.3) brightness(1.15)',
          }}
        />
      ))}

      {/* Floating icons */}
      {showIcons && FLOATING_ICONS.map((item, i) => {
        const { Icon, x, y, color, size, delay } = item;
        return (
          <div key={i} className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 3, opacity: 0.7, animation: `floatIcon ${18 + (i % 5) * 2}s ease-in-out ${delay}s infinite`, filter: `drop-shadow(0 0 16px ${color}80) brightness(1.2)` }}>
            <Icon size={size} color={color} strokeWidth={1.5} />
          </div>
        );
      })}

      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 4 }} />

      {children && <div className="relative" style={{ zIndex: 10 }}>{children}</div>}

      <style>{`
        @keyframes orbitCW {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          12.5% { transform: translate(20px, -28px) rotate(2deg) scale(1.03); }
          25% { transform: translate(28px, 0) rotate(0deg) scale(1); }
          37.5% { transform: translate(20px, 28px) rotate(-2deg) scale(0.97); }
          50% { transform: translate(0, 38px) rotate(0deg) scale(1); }
          62.5% { transform: translate(-20px, 28px) rotate(2deg) scale(1.03); }
          75% { transform: translate(-28px, 0) rotate(0deg) scale(1); }
          87.5% { transform: translate(-20px, -28px) rotate(-2deg) scale(0.97); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        @keyframes orbitCCW {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          12.5% { transform: translate(-16px, -22px) rotate(-2deg) scale(0.97); }
          25% { transform: translate(-24px, 0) rotate(0deg) scale(1); }
          37.5% { transform: translate(-16px, 24px) rotate(2deg) scale(1.03); }
          50% { transform: translate(0, 32px) rotate(0deg) scale(1); }
          62.5% { transform: translate(16px, 24px) rotate(-2deg) scale(0.97); }
          75% { transform: translate(24px, 0) rotate(0deg) scale(1); }
          87.5% { transform: translate(16px, -22px) rotate(2deg) scale(1.03); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.7; }
          33% { transform: translateY(-12px) scale(1.12) rotate(6deg); opacity: 0.9; }
          66% { transform: translateY(4px) scale(0.95) rotate(-4deg); opacity: 0.5; }
        }
        @keyframes orb1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(50px, 30px); } }
        @keyframes orb2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-40px, -50px); } }
        @keyframes orb3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(25px, -25px); } }
      `}</style>
    </div>
  );
}
