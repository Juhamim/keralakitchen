'use client';

import Link from 'next/link';
import { Calendar, Utensils, ChevronRight, Award, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { FloatingPetals, PookalamMandala, CoconutPalm, KasavuStrip, NilavilakkuLamp } from './KeralaDecorations';
import { LeafIcon, BananaLeafIcon, VegBadgeIcon, FestivalFireIcon, SadyaThaliIcon } from '@/components/common/SvgIcons';

export default function HeroBanner() {
  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 bg-hero-gradient overflow-hidden ribbon-top">
      {/* ---- Background Kerala Decorations ---- */}
      
      {/* Pookalam mandala in top left corner */}
      <div className="absolute -top-16 -left-16 opacity-[0.06] animate-pookalam pointer-events-none">
        <PookalamMandala size={340} />
      </div>
      
      {/* Pookalam mandala in bottom right corner */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.05] animate-pookalam pointer-events-none" style={{ animationDirection: 'reverse' }}>
        <PookalamMandala size={300} />
      </div>

      {/* Coconut Palm silhouettes on edges */}
      <div className="absolute bottom-0 left-0 opacity-50 hidden lg:block pointer-events-none">
        <CoconutPalm side="left" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-50 hidden lg:block pointer-events-none">
        <CoconutPalm side="right" />
      </div>
      
      {/* Floating flower petals */}
      <FloatingPetals />

      {/* Soft radial glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/[0.07] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-leaf/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="space-y-6">
          {/* Top badge with Nilavilakku motif */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-lg border border-gold/40 shadow-soft text-leaf-dark text-xs sm:text-sm font-semibold mx-auto">
            <NilavilakkuLamp className="w-5 h-7 opacity-80" />
            <span>Kerala's Premier Onam Sadya Feast</span>
            <span className="bg-gradient-to-r from-maroon to-maroon-light text-white text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full ml-1 animate-pulse-subtle flex items-center gap-1">
              <FestivalFireIcon className="w-3 h-3" />
              Bookings Open
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-[2.75rem] sm:text-6xl lg:text-7xl font-black text-leaf-dark leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Celebrate <span className="text-maroon italic">Onam</span> with <br />
            <span className="gold-gradient-text font-serif italic">Authentic Kerala Sadya</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-700 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience tradition, rich heritage, and pure happiness with{' '}
            <span className="font-semibold text-maroon">26 freshly prepared</span> organic delicacies served on 
            fresh <span className="font-semibold text-leaf-dark">banana leaves</span>. Pre-book your slot now!
          </p>

          {/* Quick highlight checklist with SVGs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-w-2xl mx-auto">
            {[
              { icon: <VegBadgeIcon className="w-4.5 h-4.5" />, text: '26 Pure Veg Items', color: 'border-leaf/30 bg-leaf-soft/60 text-leaf-dark' },
              { icon: <BananaLeafIcon className="w-4.5 h-4.5" />, text: 'Fresh Banana Leaf', color: 'border-gold/30 bg-gold-soft/60 text-slate-900' },
              { icon: <Clock className="w-4 h-4 text-maroon" />, text: 'Guaranteed Time Slots', color: 'border-maroon/20 bg-maroon-soft/60 text-maroon-dark' },
              { icon: <Award className="w-4 h-4 text-gold-deep" />, text: 'Starting at ₹269', color: 'border-gold/40 bg-white text-slate-800' },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${item.color} backdrop-blur-sm text-xs sm:text-sm font-semibold shadow-sm`}
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-gradient-to-r from-leaf via-leaf-dark to-leaf hover:from-leaf-dark hover:via-leaf hover:to-leaf-dark text-white font-bold text-base px-10 py-4.5 rounded-full shadow-glow-green hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2.5 group"
            >
              <Calendar className="w-5 h-5 text-gold-light" />
              <span>Book Your Sadya Now</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/menu"
              className="w-full sm:w-auto bg-white hover:bg-coconut-100 text-leaf-dark border-2 border-gold/50 font-bold text-base px-9 py-4.5 rounded-full shadow-soft hover:shadow-gold transition-all flex items-center justify-center gap-2.5"
            >
              <SadyaThaliIcon className="w-5 h-5" />
              <span>View 26-Item Menu</span>
            </Link>
          </div>
        </div>

        {/* Kasavu Gold Divider */}
        <KasavuStrip className="mt-12 mb-4" />

        {/* Live Festival Countdown */}
        <CountdownTimer />
      </div>
    </section>
  );
}
