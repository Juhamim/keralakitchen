import Link from 'next/link';
import Image from 'next/image';
import HeroBanner from '@/components/landing/HeroBanner';
import FeatureCards from '@/components/landing/FeatureCards';
import MenuCard from '@/components/menu/MenuCard';
import { SADYA_MENU_ITEMS, REVIEWS_DATA, EXTRAS_MENU } from '@/lib/constants';
import { formatINR } from '@/lib/utils';
import { ArrowRight, Star, Sparkles, MapPin, Phone, Calendar, Heart, CheckCircle2, Users, Award, ShoppingBag, Truck, UtensilsCrossed } from 'lucide-react';
import { SectionTitle, KasavuStrip, BananaLeafDivider, PookalamMandala, NilavilakkuLamp } from '@/components/landing/KeralaDecorations';
import {
  RiceBowlIcon,
  CurryPotIcon,
  SaladBowlIcon,
  SnackChipsIcon,
  DessertPayasamIcon,
  PickleJarIcon,
  WaterDrinkIcon,
  BananaLeafIcon,
  SadyaThaliIcon,
  FestivalFireIcon
} from '@/components/common/SvgIcons';

export default function HomePage() {
  const delicacies = [
    { name: 'Kerala Matta Rice', icon: <RiceBowlIcon className="w-6 h-6 text-leaf-dark" /> },
    { name: 'Nadan Parippu', icon: <CurryPotIcon className="w-6 h-6 text-amber-600" /> },
    { name: 'Traditional Sambar', icon: <CurryPotIcon className="w-6 h-6 text-orange-600" /> },
    { name: 'Malabar Avial', icon: <SaladBowlIcon className="w-6 h-6 text-emerald-600" /> },
    { name: 'Pumpkin Erissery', icon: <CurryPotIcon className="w-6 h-6 text-amber-500" /> },
    { name: 'Kumbalanga Olan', icon: <SaladBowlIcon className="w-6 h-6 text-teal-600" /> },
    { name: 'Kurukku Kalan', icon: <CurryPotIcon className="w-6 h-6 text-yellow-600" /> },
    { name: 'Pineapple Pulissery', icon: <CurryPotIcon className="w-6 h-6 text-amber-400" /> },
    { name: 'Beans Thoran', icon: <SaladBowlIcon className="w-6 h-6 text-green-600" /> },
    { name: 'Cucumber Pachadi', icon: <SaladBowlIcon className="w-6 h-6 text-emerald-500" /> },
    { name: 'Beetroot Khichadi', icon: <SaladBowlIcon className="w-6 h-6 text-rose-600" /> },
    { name: 'Inji Puli Pickle', icon: <PickleJarIcon className="w-6 h-6 text-maroon" /> },
    { name: 'Lemon Pickle', icon: <PickleJarIcon className="w-6 h-6 text-amber-500" /> },
    { name: 'Mango Pickle', icon: <PickleJarIcon className="w-6 h-6 text-orange-500" /> },
    { name: 'Nenthra Chips', icon: <SnackChipsIcon className="w-6 h-6 text-gold" /> },
    { name: 'Sharkara Varatti', icon: <SnackChipsIcon className="w-6 h-6 text-amber-700" /> },
    { name: 'Crispy Pappadam', icon: <SnackChipsIcon className="w-6 h-6 text-yellow-500" /> },
    { name: 'Sweet Nenthra Banana', icon: <BananaLeafIcon className="w-6 h-6 text-amber-400" /> },
    { name: 'Nadan Rasam', icon: <WaterDrinkIcon className="w-6 h-6 text-red-500" /> },
    { name: 'Pacha Moru', icon: <WaterDrinkIcon className="w-6 h-6 text-slate-400" /> },
    { name: 'Palada Payasam', icon: <DessertPayasamIcon className="w-6 h-6 text-gold-deep" /> },
    { name: 'Ada Pradhaman', icon: <DessertPayasamIcon className="w-6 h-6 text-amber-800" /> },
    { name: 'Kondattam Mulaku', icon: <PickleJarIcon className="w-6 h-6 text-red-700" /> },
    { name: 'Spring Water', icon: <WaterDrinkIcon className="w-6 h-6 text-sky-500" /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroBanner />

      {/* Feature Highlights Grid */}
      <FeatureCards />

      {/* ========================================
          SADYA MENU SHOWCASE SECTION
          ======================================== */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
          <PookalamMandala size={400} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-maroon bg-maroon-soft px-4 py-1.5 rounded-full border border-maroon/20">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
                Traditional Onam Delicacies
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-leaf-dark">
                Our Signature <span className="gold-gradient-text italic">Sadya</span> Packages
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg">
                From royal 30-item feasts to compact mini meals, every Sadya is a celebration of Kerala's culinary heritage.
              </p>
            </div>
            <Link
              href="/menu"
              className="text-leaf-dark font-bold text-sm hover:text-leaf flex items-center gap-1.5 group bg-coconut-100 px-4 py-2 rounded-full border border-gold/30 hover:shadow-gold transition-all"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SADYA_MENU_ITEMS.slice(0, 3).map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          WHAT'S INCLUDED IN SADYA SECTION
          ======================================== */}
      <section className="py-20 section-warm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="26 Traditional Delicacies"
            title="What's Served on Your Banana Leaf?"
            subtitle="Each item is freshly prepared on festival morning using traditional recipes passed down through generations."
          />

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {delicacies.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-gold/20 shadow-sm hover:shadow-gold hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="mb-2 p-2 rounded-xl bg-coconut-100 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Banana leaf note */}
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-leaf-dark font-semibold bg-leaf-soft/50 border border-leaf/20 px-6 py-3 rounded-2xl max-w-md mx-auto">
            <BananaLeafIcon className="w-5 h-5 text-leaf" />
            <span>All items served on a fresh cut banana leaf!</span>
          </div>
        </div>
      </section>

      {/* ========================================
          HOW IT WORKS - BOOKING STEPS
          ======================================== */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Simple & Easy Process"
            title="How Pre-Booking Works"
            subtitle="Book your Onam Sadya in just 3 simple steps. No hassle, no festival rush."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting dotted line */}
            <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-[2px] border-t-2 border-dashed border-gold/40" />

            {[
              {
                step: '01',
                icon: <Calendar className="w-7 h-7 text-white" />,
                title: 'Choose Date & Slot',
                desc: 'Select your preferred Onam festival date (Sep 2-6) and pick a convenient 1-hour delivery or pickup time slot.',
                color: 'from-leaf to-leaf-dark',
                ring: 'ring-leaf/20',
              },
              {
                step: '02',
                icon: <ShoppingBag className="w-7 h-7 text-white" />,
                title: 'Select Sadya & Pay',
                desc: 'Choose your Sadya package (Regular, Royal, Family, Mini or Corporate), add extra Payasam, and pay securely.',
                color: 'from-gold-deep to-gold',
                ring: 'ring-gold/20',
              },
              {
                step: '03',
                icon: <Sparkles className="w-7 h-7 text-white" />,
                title: 'Receive & Celebrate!',
                desc: 'Get your piping hot Sadya delivered to your doorstep or pick it up at the counter with your QR code token.',
                color: 'from-maroon to-maroon-light',
                ring: 'ring-maroon/20',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center bg-coconut-50 rounded-3xl p-8 border border-gold/20 shadow-soft hover:shadow-card-lg transition-shadow"
              >
                {/* Step icon badge */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg ring-4 ${item.ring} mb-5 z-10`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2">
                  Step {item.step}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-leaf to-leaf-dark text-white font-bold text-base px-9 py-4 rounded-full shadow-glow-green hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              <Calendar className="w-5 h-5 text-gold-light" />
              <span>Start Your Pre-Booking</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          STATS BAR (Social Proof)
          ======================================== */}
      <section className="py-12 bg-gradient-to-r from-leaf-dark via-leaf to-leaf-dark text-white relative overflow-hidden">
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Happy Customers', icon: <Users className="w-7 h-7 text-gold mx-auto" /> },
              { value: '26', label: 'Traditional Dishes', icon: <SadyaThaliIcon className="w-7 h-7 text-gold mx-auto" /> },
              { value: '4.9 ★', label: 'Average Rating', icon: <Star className="w-7 h-7 text-gold fill-gold mx-auto" /> },
              { value: '5 Years', label: 'Onam Celebrations', icon: <FestivalFireIcon className="w-7 h-7 text-gold mx-auto" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div>{stat.icon}</div>
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-gold">{stat.value}</div>
                <div className="text-xs font-semibold text-coconut-200 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CUSTOMER TESTIMONIALS
          ======================================== */}
      <section className="py-20 section-warm relative overflow-hidden">
        <div className="absolute -bottom-10 left-10 opacity-[0.04] pointer-events-none">
          <PookalamMandala size={250} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionTitle
            badge="Trusted by 10,000+ Families"
            title="What Our Customers Say"
            subtitle="Real experiences from real families who celebrated Onam with Kerala Kitchen Sadya."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-7 border border-gold/25 shadow-soft hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 text-gold mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 italic leading-relaxed mb-5 relative z-10">
                  "{rev.comment}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 block font-serif text-base">{rev.customerName}</strong>
                    <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {rev.location}
                    </span>
                  </div>
                  <span className="bg-leaf-soft text-leaf-dark text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-leaf/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          EXTRA PAYASAM & ADD-ONS PREVIEW
          ======================================== */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Festival Extras"
            title="Add Extra Payasam & Savories"
            subtitle="Elevate your Onam feast with additional liters of golden Palada Payasam, crispy banana chips, and more."
          />

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {EXTRAS_MENU.slice(0, 8).map((ext) => (
              <div
                key={ext.id}
                className="p-4 bg-coconut-50 rounded-2xl border border-gold/25 shadow-sm hover:shadow-gold hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">{ext.name}</h4>
                  <span className="font-serif font-extrabold text-leaf text-lg mt-1 block">{formatINR(ext.price)}</span>
                </div>
                <Link
                  href="/book"
                  className="mt-3 w-full bg-gradient-to-r from-gold/10 to-gold/20 hover:from-gold/30 hover:to-gold/40 text-slate-800 border border-gold/30 text-xs font-bold py-2.5 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Booking</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA BOOKING BANNER
          ======================================== */}
      <section className="py-20 bg-gradient-to-r from-leaf-dark via-leaf to-leaf-dark text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 opacity-10 animate-pookalam pointer-events-none">
            <PookalamMandala size={200} />
          </div>
          <div className="absolute bottom-10 right-10 opacity-10 animate-pookalam pointer-events-none" style={{ animationDirection: 'reverse' }}>
            <PookalamMandala size={180} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-7 relative z-10">
          <div className="flex items-center justify-center gap-4">
            <NilavilakkuLamp className="w-8 h-10 opacity-80" />
            <FestivalFireIcon className="w-8 h-8 text-gold animate-bounce" />
            <NilavilakkuLamp className="w-8 h-10 opacity-80" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Pre-Book Your <br className="hidden sm:block" />
            <span className="text-gold">Onam Sadya</span> Slot Today
          </h2>
          <p className="text-coconut-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Avoid the festival rush! Secure your preferred pickup or delivery time slot before capacity closes. Limited slots for Thiruvonam.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-gold via-gold-warm to-gold text-slate-900 font-extrabold text-base px-10 py-4.5 rounded-full shadow-glow-gold hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <span>Pre-Book Sadya Now</span>
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-coconut-100 font-bold text-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
            >
              <UtensilsCrossed className="w-4 h-4 text-gold" />
              <span>Browse Menu First</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
