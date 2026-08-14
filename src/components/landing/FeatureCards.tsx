import { Utensils, HeartHandshake, ShieldCheck, Clock, Award, Leaf, ChefHat, Truck, Smartphone, CookingPot } from 'lucide-react';
import { BananaLeafDivider, SectionTitle } from './KeralaDecorations';
import {
  VegBadgeIcon,
  SadyaThaliIcon,
  ChefHatIcon,
  BananaLeafIcon,
  CurryPotIcon,
  FlowerIconSvg,
  LeafIcon
} from '@/components/common/SvgIcons';

export default function FeatureCards() {
  const features = [
    {
      icon: <VegBadgeIcon className="w-8 h-8" />,
      title: 'Fresh Organic Ingredients',
      description: 'Cold-pressed coconut oil, stone-ground spices, hand-picked vegetables from local Kerala farms. No preservatives, no shortcuts.',
      gradient: 'from-emerald-500/15 to-emerald-500/5',
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white',
    },
    {
      icon: <SadyaThaliIcon className="w-8 h-8" />,
      title: 'Authentic 26-Curry Sadya',
      description: 'Complete traditional feast from Parippu, Sambar, Avial to two varieties of Payasam, Inji Puli, Chips & Sharkara Varatti.',
      gradient: 'from-amber-500/15 to-amber-500/5',
      border: 'border-amber-500/30 hover:border-amber-500/60',
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-700 text-white',
    },
    {
      icon: <ChefHatIcon className="w-8 h-8 text-white" />,
      title: 'Master Kerala Chefs',
      description: 'Traditional culinary masters with 30+ years of experience crafting authentic festival Sadya in wood-fired kitchens.',
      gradient: 'from-orange-500/15 to-orange-500/5',
      border: 'border-orange-500/30 hover:border-orange-500/60',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-700 text-white',
    },
    {
      icon: <Clock className="w-7 h-7 text-white" />,
      title: 'Guaranteed Time Slots',
      description: 'Choose your preferred 1-hour window (10 AM to 2 PM) for piping hot delivery or instant counter pickup.',
      gradient: 'from-blue-500/15 to-blue-500/5',
      border: 'border-blue-500/30 hover:border-blue-500/60',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700 text-white',
    },
    {
      icon: <BananaLeafIcon className="w-8 h-8" />,
      title: 'Eco Banana Leaf Packing',
      description: 'Heat-retaining eco-friendly containers lined with freshly cut banana leaf for authentic taste and zero plastic.',
      gradient: 'from-green-500/15 to-green-500/5',
      border: 'border-green-500/30 hover:border-green-500/60',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-700 text-white',
    },
    {
      icon: <Smartphone className="w-7 h-7 text-white" />,
      title: 'QR Code & Live Tracking',
      description: 'Dynamic QR code for instant pickup verification. Live order status timeline from kitchen preparation to your dining table.',
      gradient: 'from-purple-500/15 to-purple-500/5',
      border: 'border-purple-500/30 hover:border-purple-500/60',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700 text-white',
    },
  ];

  return (
    <section className="py-20 section-warm relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 text-gold/[0.1] select-none pointer-events-none">
        <FlowerIconSvg className="w-24 h-24" />
      </div>
      <div className="absolute bottom-10 left-10 text-leaf/[0.1] select-none pointer-events-none">
        <LeafIcon className="w-20 h-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Why Choose Kerala Kitchen"
          title="The Gold Standard of Onam Sadya"
          subtitle="We honour Kerala's grandest festival with uncompromised quality, hygiene, traditional wood-fire cooking, and love that you can taste."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-7 border ${feature.border} shadow-soft hover:shadow-card-lg hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden`}
            >
              {/* Subtle gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-800 mb-2.5 group-hover:text-leaf-dark transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
