import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function AnimatedBackground({ children, className = '' }: Props) {
  return (
    <div className={`relative min-h-screen bg-[#0a0a0f] overflow-hidden ${className}`}>
      {/* Subtle gradient overlay only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(236,72,153,0.03) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      {/* Very subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
