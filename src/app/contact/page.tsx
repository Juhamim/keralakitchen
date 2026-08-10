'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';
import { SectionTitle, PookalamMandala, BananaLeafDivider, NilavilakkuLamp } from '@/components/landing/KeralaDecorations';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="pt-28 pb-20 relative overflow-hidden">
      {/* Background Pookalam */}
      <div className="absolute bottom-10 right-10 opacity-[0.03] pointer-events-none animate-pookalam">
        <PookalamMandala size={280} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionTitle
          badge="Get in Touch"
          title="Contact Kerala Kitchen"
          subtitle="Have questions about your pre-booking, custom Sadya orders for corporate events, or festival specials? We're here to help!"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details Column */}
          <div className="md:col-span-5 space-y-5">
            {/* Location Card */}
            <div className="bg-white rounded-3xl p-6 border border-gold/25 shadow-soft space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-leaf via-gold to-maroon" />

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf to-leaf-dark flex items-center justify-center text-white shadow-md">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold text-leaf-dark">Our Hotel</h3>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-slate-700">Kerala Kitchen, MG Road, Near High Court Junction, Marine Drive, Ernakulam, Kochi – 682031</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <a href="tel:+919847012345" className="text-leaf font-bold hover:underline">+91 98470 12345</a>
                    <span className="text-[10px] text-slate-500 block">WhatsApp Available</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold shrink-0" />
                  <a href="mailto:orders@keralakitchenonam.com" className="text-leaf hover:underline text-sm font-medium">orders@keralakitchenonam.com</a>
                </li>
              </ul>
            </div>

            {/* Festival Hours Card */}
            <div className="bg-gradient-to-br from-gold-soft to-coconut-100 rounded-3xl p-6 border border-gold/35 shadow-soft space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-deep to-gold flex items-center justify-center text-white shadow-md">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-leaf-dark">Festival Hours</h3>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between px-3 py-2 bg-white/60 rounded-xl">
                  <span className="text-slate-600">Onam Days (Sep 2–6)</span>
                  <strong className="text-leaf-dark">10 AM – 3 PM</strong>
                </div>
                <div className="flex justify-between px-3 py-2 bg-white/60 rounded-xl">
                  <span className="text-slate-600">Regular Days</span>
                  <strong className="text-leaf-dark">11 AM – 9 PM</strong>
                </div>
                <div className="flex justify-between px-3 py-2 bg-white/60 rounded-xl">
                  <span className="text-slate-600">Bulk Order Enquiry</span>
                  <strong className="text-leaf-dark">9 AM – 6 PM</strong>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="bg-maroon-soft/50 border border-maroon/20 rounded-2xl p-4 flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 text-maroon shrink-0 mt-0.5" />
              <div className="text-slate-700">
                <strong className="text-maroon block mb-1">Note for Bulk Orders:</strong>
                For orders above 50 plates, please call us at least 2 days in advance for guaranteed preparation.
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gold/25 shadow-soft relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 opacity-[0.05] pointer-events-none">
              <PookalamMandala size={120} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-maroon to-maroon-light flex items-center justify-center text-white shadow-md">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-leaf-dark">Send Us a Message</h3>
            </div>

            {sent ? (
              <div className="bg-leaf-soft border border-leaf/30 rounded-2xl p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-leaf text-white mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl font-bold text-leaf-dark">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-600">We'll get back to you within 2-3 hours during festival season.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meera Nair"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/10 font-medium text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/10 font-medium text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/10 font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Enquiry Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/10 font-medium text-sm bg-white">
                    <option value="">Select topic...</option>
                    <option>Pre-Booking Help</option>
                    <option>Bulk / Corporate Order</option>
                    <option>Menu Customization</option>
                    <option>Delivery / Pickup Info</option>
                    <option>Feedback / Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you celebrate Onam?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/10 font-medium text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-leaf to-leaf-dark hover:from-leaf-dark hover:to-leaf text-white font-bold py-4 rounded-full shadow-glow-green text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Map Placeholder */}
        <div className="w-full h-64 sm:h-80 rounded-3xl bg-coconut-200 border border-gold/25 flex items-center justify-center text-sm text-slate-500 shadow-sm relative overflow-hidden">
          <div className="text-center space-y-2 z-10">
            <MapPin className="w-10 h-10 text-leaf mx-auto opacity-40" />
            <p className="font-serif text-lg font-bold text-leaf-dark">Kerala Kitchen, MG Road, Kochi</p>
            <p className="text-xs text-slate-500">Map integration available in production build</p>
          </div>
        </div>
      </div>
    </div>
  );
}
