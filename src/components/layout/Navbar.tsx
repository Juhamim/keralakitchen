'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Calendar, ShoppingBag, Menu as MenuIcon, X, ShieldCheck, Utensils, Lock } from 'lucide-react';
import { NilavilakkuLamp } from '@/components/landing/KeralaDecorations';
import { FlowerIconSvg, FestivalFireIcon } from '@/components/common/SvgIcons';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Sadya Menu' },
    { href: '/book', label: 'Book Sadya', highlight: true },
    { href: '/track', label: 'Track Order' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-coconut-50/95 backdrop-blur-xl shadow-lg border-b border-gold/20 py-2.5'
          : 'bg-gradient-to-b from-coconut-50/80 to-transparent py-4'
      }`}
    >
      {/* Kasavu gold top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-leaf via-gold to-maroon" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Nilavilakku */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-leaf to-leaf-dark flex items-center justify-center shadow-glow-green group-hover:scale-105 transition-transform p-2">
                <NilavilakkuLamp className="w-full h-full text-white" />
              </div>
              {/* Tiny flower accent */}
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center animate-pulse shadow-sm">
                <FlowerIconSvg className="w-2.5 h-2.5 text-slate-900" />
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-leaf-dark block leading-none">
                Kerala<span className="text-gold font-normal italic ml-0.5">Kitchen</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] text-maroon font-bold uppercase flex items-center gap-1 mt-0.5">
                <FestivalFireIcon className="w-2.5 h-2.5" />
                <span>Onam Sadya 2026</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    link.highlight
                      ? 'bg-gradient-to-r from-leaf to-leaf-dark text-white hover:shadow-glow-green px-5 flex items-center gap-1.5'
                      : isActive
                      ? 'text-leaf-dark font-bold bg-coconut-200 border border-gold/30 shadow-inner-gold'
                      : 'text-slate-700 hover:text-leaf-dark hover:bg-coconut-100/80'
                  }`}
                >
                  {link.highlight && <Calendar className="w-4 h-4 text-gold-light" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-slate-500 hover:text-leaf flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-full hover:border-gold/40 transition-colors font-medium"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              Admin
            </Link>

            <Link
              href="/book"
              className="bg-gradient-to-r from-gold via-gold-warm to-gold text-slate-900 font-bold text-sm px-6 py-2.5 rounded-full shadow-gold hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-slate-900" />
              <span>Pre-Book Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl text-leaf-dark bg-coconut-100 border border-gold/25 hover:bg-coconut-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slideout Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-coconut-50/98 backdrop-blur-xl border-b border-gold/30 shadow-2xl px-4 pt-3 pb-6 space-y-2 mt-2">
          {/* Festival ribbon at top */}
          <div className="h-[2px] bg-gradient-to-r from-leaf via-gold to-maroon rounded-full mb-3" />
          
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                pathname === link.href
                  ? 'bg-gradient-to-r from-leaf to-leaf-dark text-white shadow-md'
                  : 'text-slate-800 hover:bg-coconut-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gold/20 flex flex-col gap-2.5">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-gold" />
              Admin & Staff Portal
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 text-sm font-extrabold text-slate-900 bg-gradient-to-r from-gold via-gold-warm to-gold rounded-2xl shadow-gold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-slate-900" />
              Pre-Book Onam Sadya Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
