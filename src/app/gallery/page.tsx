'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';
import { SectionTitle, PookalamMandala, KasavuStrip, BananaLeafDivider } from '@/components/landing/KeralaDecorations';

export default function GalleryPage() {
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=1000',
      title: 'Traditional 26-Item Sadya on Banana Leaf',
      category: 'Sadya Feast',
    },
    {
      url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000',
      title: 'Golden Palada Pradhaman Payasam',
      category: 'Payasam',
    },
    {
      url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000',
      title: 'Vibrant Pookalam Floral Art',
      category: 'Pookalam Art',
    },
    {
      url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000',
      title: 'Crispy Nenthra Kaaya Banana Chips',
      category: 'Kerala Savories',
    },
    {
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
      title: 'Eco-Friendly Hot Packing Counter',
      category: 'Kitchen Dispatch',
    },
    {
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
      title: 'Happy Families Celebrating Onam',
      category: 'Onam Celebrations',
    },
  ];

  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-20 relative overflow-hidden">
      {/* Decorative Pookalam background */}
      <div className="absolute -top-10 -left-10 opacity-[0.03] pointer-events-none animate-pookalam">
        <PookalamMandala size={300} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          badge="Festival Visual Journey"
          title="Onam Sadya & Pookalam Gallery"
          subtitle="Explore the colors, culinary craftsmanship, and festive joy behind Kerala Kitchen Onam celebrations."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImg(img.url)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-card-lg border border-gold/25 hover:-translate-y-1 transition-all duration-300"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-gold mb-1">{img.category}</span>
                <h3 className="font-serif font-bold text-lg leading-snug">{img.title}</h3>
              </div>
              
              {/* Category pill always visible */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm border border-gold/20">
                {img.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-gold/50 shadow-2xl">
            <Image src={selectedImg} alt="Enlarged view" fill className="object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
