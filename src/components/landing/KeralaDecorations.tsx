'use client';

/* ================================================
   Kerala Cultural SVG Decorations & Dividers
   Authentic Pookalam, Nilavilakku, Banana Leaf motifs
   ================================================ */

/* ---- Pookalam Floral Mandala ---- */
export function PookalamMandala({ size = 200, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} aria-hidden="true">
      {/* Outer ring of petals */}
      {[...Array(12)].map((_, i) => (
        <g key={`outer-${i}`} transform={`rotate(${i * 30} 100 100)`}>
          <ellipse cx="100" cy="30" rx="14" ry="28" fill={i % 3 === 0 ? '#F9A825' : i % 3 === 1 ? '#E67E22' : '#D4AF37'} opacity="0.8" />
          <ellipse cx="100" cy="30" rx="8" ry="20" fill={i % 2 === 0 ? '#FFEB3B' : '#FFC107'} opacity="0.5" />
        </g>
      ))}
      {/* Middle ring of petals */}
      {[...Array(8)].map((_, i) => (
        <g key={`mid-${i}`} transform={`rotate(${i * 45} 100 100)`}>
          <ellipse cx="100" cy="52" rx="11" ry="22" fill={i % 2 === 0 ? '#EF5350' : '#8E2430'} opacity="0.7" />
          <ellipse cx="100" cy="54" rx="6" ry="15" fill="#FF8A65" opacity="0.4" />
        </g>
      ))}
      {/* Inner small petals */}
      {[...Array(6)].map((_, i) => (
        <g key={`inner-${i}`} transform={`rotate(${i * 60} 100 100)`}>
          <ellipse cx="100" cy="70" rx="8" ry="16" fill={i % 2 === 0 ? '#4CAF50' : '#2E7D32'} opacity="0.75" />
        </g>
      ))}
      {/* Center circle */}
      <circle cx="100" cy="100" r="12" fill="#D4AF37" stroke="#B78103" strokeWidth="2" />
      <circle cx="100" cy="100" r="6" fill="#FFEB3B" />
    </svg>
  );
}

/* ---- Nilavilakku (Kerala Traditional Brass Lamp) ---- */
export function NilavilakkuLamp({ className = '' }: { className?: string }) {
  return (
    <svg width="40" height="56" viewBox="0 0 40 56" className={className} aria-hidden="true">
      {/* Flame */}
      <ellipse cx="20" cy="8" rx="5" ry="8" fill="#F9A825" className="animate-flame" />
      <ellipse cx="20" cy="8" rx="3" ry="5" fill="#FFEB3B" opacity="0.8" className="animate-flame" />
      {/* Wick */}
      <rect x="19" y="12" width="2" height="6" fill="#8D6E63" rx="1" />
      {/* Lamp body */}
      <ellipse cx="20" cy="22" rx="10" ry="5" fill="#D4AF37" stroke="#B78103" strokeWidth="1" />
      <rect x="17" y="22" width="6" height="14" fill="#D4AF37" rx="1" />
      {/* Stem */}
      <rect x="18" y="36" width="4" height="10" fill="#B78103" rx="1" />
      {/* Base */}
      <ellipse cx="20" cy="48" rx="14" ry="5" fill="#D4AF37" stroke="#B78103" strokeWidth="1" />
      <ellipse cx="20" cy="50" rx="12" ry="4" fill="#B78103" opacity="0.5" />
    </svg>
  );
}

/* ---- Banana Leaf Divider ---- */
export function BananaLeafDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center gap-3 py-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
      <svg width="60" height="24" viewBox="0 0 60 24" aria-hidden="true">
        {/* Left leaf */}
        <path d="M5 12 Q15 4 28 12 Q15 20 5 12Z" fill="#4CAF50" opacity="0.6" />
        <path d="M8 12 Q15 7 25 12" stroke="#2E7D32" strokeWidth="0.5" fill="none" />
        {/* Center dot */}
        <circle cx="30" cy="12" r="3" fill="#D4AF37" />
        <circle cx="30" cy="12" r="1.5" fill="#F9A825" />
        {/* Right leaf */}
        <path d="M55 12 Q45 4 32 12 Q45 20 55 12Z" fill="#4CAF50" opacity="0.6" />
        <path d="M52 12 Q45 7 35 12" stroke="#2E7D32" strokeWidth="0.5" fill="none" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
    </div>
  );
}

/* ---- Floating Flower Petals (animated, for Hero) ---- */
export function FloatingPetals({ className = '' }: { className?: string }) {
  const petals = [
    { x: '8%', y: '15%', size: 20, color: '#F9A825', delay: '0s', dur: '7s' },
    { x: '20%', y: '70%', size: 16, color: '#EF5350', delay: '1s', dur: '9s' },
    { x: '75%', y: '20%', size: 18, color: '#FF8A65', delay: '0.5s', dur: '8s' },
    { x: '85%', y: '60%', size: 14, color: '#D4AF37', delay: '2s', dur: '6s' },
    { x: '40%', y: '80%', size: 12, color: '#FFEB3B', delay: '1.5s', dur: '10s' },
    { x: '60%', y: '10%', size: 15, color: '#FF7043', delay: '3s', dur: '7.5s' },
    { x: '92%', y: '40%', size: 11, color: '#81C784', delay: '0.8s', dur: '8.5s' },
    { x: '15%', y: '45%', size: 13, color: '#CE93D8', delay: '2.5s', dur: '9s' },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute animate-float-petal"
          style={{
            left: p.x,
            top: p.y,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <ellipse cx="10" cy="10" rx="8" ry="5" fill={p.color} opacity="0.45" transform="rotate(30 10 10)" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ---- Coconut Palm Tree Silhouette ---- */
export function CoconutPalm({ side = 'left', className = '' }: { side?: 'left' | 'right'; className?: string }) {
  const flip = side === 'right' ? 'scale(-1, 1)' : '';
  return (
    <svg width="120" height="200" viewBox="0 0 120 200" className={`${className} animate-sway`} style={{ transform: flip }} aria-hidden="true">
      {/* Trunk */}
      <path d="M60 200 Q55 150 58 100 Q60 80 62 100 Q65 150 60 200Z" fill="#8D6E63" opacity="0.2" />
      {/* Fronds */}
      <path d="M60 100 Q30 60 5 70" stroke="#2E7D32" strokeWidth="2" fill="none" opacity="0.15" />
      <path d="M60 100 Q20 50 10 40" stroke="#2E7D32" strokeWidth="2" fill="none" opacity="0.12" />
      <path d="M60 100 Q40 45 20 30" stroke="#4CAF50" strokeWidth="1.5" fill="none" opacity="0.12" />
      <path d="M60 100 Q90 60 115 70" stroke="#2E7D32" strokeWidth="2" fill="none" opacity="0.15" />
      <path d="M60 100 Q100 50 110 40" stroke="#2E7D32" strokeWidth="2" fill="none" opacity="0.12" />
      <path d="M60 100 Q80 45 100 30" stroke="#4CAF50" strokeWidth="1.5" fill="none" opacity="0.12" />
      {/* Coconuts */}
      <circle cx="55" cy="97" r="4" fill="#8D6E63" opacity="0.2" />
      <circle cx="65" cy="96" r="4" fill="#795548" opacity="0.18" />
    </svg>
  );
}

/* ---- Kasavu Gold Border Strip (horizontal) ---- */
export function KasavuStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="h-[1px] mt-[2px] bg-gradient-to-r from-transparent via-gold-deep/50 to-transparent" />
    </div>
  );
}

/* ---- Section Title with Decorative Elements ---- */
export function SectionTitle({
  badge,
  title,
  subtitle,
  className = '',
}: {
  badge: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`text-center max-w-3xl mx-auto space-y-3 ${className}`}>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-coconut-100 to-coconut-200 border border-gold/30 text-xs font-bold uppercase tracking-[0.15em] text-maroon shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        {badge}
        <span className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse" />
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-leaf-dark leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <BananaLeafDivider className="pt-2" />
    </div>
  );
}
