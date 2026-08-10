import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { KasavuStrip, PookalamMandala, NilavilakkuLamp, BananaLeafDivider } from '@/components/landing/KeralaDecorations';
import { VegBadgeIcon, CertificateBadgeIcon, BananaLeafIcon, FlowerIconSvg, LeafIcon, FestivalFireIcon } from '@/components/common/SvgIcons';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-coconut-200 via-coconut-200 to-coconut-300 border-t border-gold/25 pt-16 pb-28 md:pb-14 text-slate-700 relative overflow-hidden">
      {/* ---- Decorative Elements ---- */}
      {/* Pookalam in background */}
      <div className="absolute -bottom-16 -right-16 opacity-[0.04] pointer-events-none">
        <PookalamMandala size={300} />
      </div>
      
      {/* Kasavu Gold Top Border */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="h-[1px] mt-px bg-gradient-to-r from-transparent via-gold-deep/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-leaf to-leaf-dark flex items-center justify-center shadow-glow-green p-2">
                <NilavilakkuLamp className="w-full h-full text-white" />
              </div>
              <div>
                <span className="font-serif text-2xl font-black text-leaf-dark block leading-none">
                  Kerala<span className="text-gold italic ml-0.5">Kitchen</span>
                </span>
                <span className="text-[9px] tracking-[0.15em] text-maroon font-bold uppercase flex items-center gap-1 mt-0.5">
                  <FestivalFireIcon className="w-2.5 h-2.5" />
                  Onam Sadya 2026
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bringing authentic, traditional Kerala Onam Sadya with 26 hand-prepared vegetarian delicacies served on fresh banana leaves, right to your home & hotel counter.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-leaf-soft text-leaf-dark rounded-full border border-leaf/20">
                <VegBadgeIcon className="w-3.5 h-3.5" /> 100% Pure Veg
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-gold-soft text-gold-deep rounded-full border border-gold/30">
                <CertificateBadgeIcon className="w-3.5 h-3.5 text-gold-deep" /> Festival Certified
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-maroon-soft text-maroon rounded-full border border-maroon/20">
                <BananaLeafIcon className="w-3.5 h-3.5" /> Eco Banana Leaf
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-leaf-dark mb-5 flex items-center gap-2">
              <FlowerIconSvg className="w-4 h-4 text-gold" /> Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/', label: 'Home & Festival Highlights' },
                { href: '/menu', label: 'Full 26-Item Sadya Menu' },
                { href: '/book', label: 'Online Sadya Pre-Booking', bold: true },
                { href: '/track', label: 'Track Your Sadya Order' },
                { href: '/reviews', label: 'Customer Reviews & Photos' },
                { href: '/gallery', label: 'Pookalam & Kitchen Gallery' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`kerala-link hover:text-leaf-dark transition-colors ${link.bold ? 'font-bold text-leaf' : 'text-slate-600'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-bold text-leaf-dark mb-5 flex items-center gap-2">
              <LeafIcon className="w-4 h-4 text-gold" /> Hotel Address
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>MG Road, Near High Court Junction, Marine Drive, Kochi, Kerala - 682031</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="font-semibold">+91 98470 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>orders@keralakitchenonam.com</span>
              </li>
              <li className="flex items-center gap-3 text-xs font-bold text-maroon bg-maroon-soft/60 px-3 py-2 rounded-xl border border-maroon/20">
                <Clock className="w-4 h-4 shrink-0 text-maroon" />
                <span>Onam Days: 10:00 AM – 3:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Onam Dates & Portals */}
          <div>
            <h4 className="font-serif text-lg font-bold text-leaf-dark mb-5 flex items-center gap-2">
              <FestivalFireIcon className="w-4 h-4 text-gold" /> Onam Festival 2026
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/60 border border-gold/20 flex justify-between items-center">
                <span>First Onam (Uthradam)</span>
                <span className="font-bold text-leaf-dark">Sep 3</span>
              </div>
              <div className="p-3 rounded-xl bg-gold-soft/70 border border-gold/40 flex justify-between items-center font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <FestivalFireIcon className="w-3.5 h-3.5 text-maroon" />
                  <span>THIRUVONAM</span>
                </span>
                <span className="text-maroon font-extrabold">Sep 4</span>
              </div>
              <div className="p-3 rounded-xl bg-white/60 border border-gold/20 flex justify-between items-center">
                <span>Third Onam (Avittom)</span>
                <span className="font-bold text-leaf-dark">Sep 5</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gold/20 flex gap-3">
              <Link href="/admin" className="text-xs font-bold text-slate-600 hover:text-leaf kerala-link">
                Admin Dashboard
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/staff" className="text-xs font-bold text-slate-600 hover:text-leaf kerala-link">
                Staff Kitchen Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <BananaLeafDivider className="mt-10 mb-4" />
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Kerala Kitchen Onam Booking. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> in Kerala, India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
