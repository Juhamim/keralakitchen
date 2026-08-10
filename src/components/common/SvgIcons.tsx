'use client';

import React from 'react';

/* ================================================
   SVG Icons Collection for Kerala Kitchen
   Replacing all emojis with clean, high-quality SVGs
   ================================================ */

export function VegBadgeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#2E7D32" strokeWidth="2" fill="#E8F5E9" />
      <circle cx="12" cy="12" r="5" fill="#2E7D32" />
    </svg>
  );
}

export function LeafIcon({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 5.5-4.5 9-10 9Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export function BananaLeafIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M4 16C8 6 18 4 28 4C28 14 26 24 16 28C10 28 6 22 4 16Z" fill="#4CAF50" opacity="0.8" />
      <path d="M5 16C12 10 20 6 27 5" stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L9 15M17 10L13 15M22 8L18 14M26 6L22 13" stroke="#1B5E20" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function SadyaThaliIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="1.8" fill="#FFFDF8" />
      <circle cx="8" cy="8" r="2" fill="#E67E22" />
      <circle cx="16" cy="8" r="2" fill="#2E7D32" />
      <circle cx="16" cy="16" r="2" fill="#8E2430" />
      <circle cx="8" cy="16" r="2" fill="#F9A825" />
      <circle cx="12" cy="12" r="2.5" fill="#D4AF37" />
    </svg>
  );
}

export function ChefHatIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 10.58 0A4 4 0 0 1 18 13.87V21H6z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

export function RiceBowlIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3v3M8 4v2M16 4v2" />
      <path d="M4 11a8 8 0 0 0 16 0H4z" />
      <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3H6v3z" />
    </svg>
  );
}

export function CurryPotIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 10h18" />
      <path d="M5 10v7a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-7" />
      <path d="M9 6h6" />
      <path d="M12 3v3" />
      <path d="M2 10h2M20 10h2" />
    </svg>
  );
}

export function SaladBowlIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 11a8 8 0 0 0 16 0H4z" />
      <path d="M7 8c1-1 3-1 4 0" />
      <path d="M13 8c1-1 3-1 4 0" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
  );
}

export function SnackChipsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="4" fill="#F9A825" opacity="0.3" />
      <circle cx="16" cy="12" r="4" fill="#D4AF37" opacity="0.3" />
      <circle cx="10" cy="16" r="4" fill="#E67E22" opacity="0.3" />
      <path d="M8 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M16 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M10 16m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    </svg>
  );
}

export function DessertPayasamIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9h12l-1 9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9z" />
      <path d="M4 9h16" />
      <path d="M12 5v4" />
      <circle cx="12" cy="4" r="1.5" fill="#D4AF37" />
    </svg>
  );
}

export function PickleJarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="7" y="3" width="10" height="3" rx="1" />
      <path d="M6 6h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6z" />
      <circle cx="12" cy="13" r="3" fill="#8E2430" opacity="0.3" />
    </svg>
  );
}

export function WaterDrinkIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

export function FestivalFireIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2C10.5 5.5 7 8 7 13a5 5 0 0 0 10 0c0-5-3.5-7.5-5-11Z" fill="#F9A825" />
      <path d="M12 9c-1 2-2.5 3.5-2.5 5.5a2.5 2.5 0 0 0 5 0C14.5 12.5 13 11 12 9Z" fill="#FFEB3B" />
    </svg>
  );
}

export function SparklesIconSvg({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}

export function CertificateBadgeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

export function FlowerIconSvg({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="#D4AF37" />
      <circle cx="12" cy="5" r="3" fill="#F9A825" opacity="0.8" />
      <circle cx="12" cy="19" r="3" fill="#F9A825" opacity="0.8" />
      <circle cx="5" cy="12" r="3" fill="#F9A825" opacity="0.8" />
      <circle cx="19" cy="12" r="3" fill="#F9A825" opacity="0.8" />
      <circle cx="7" cy="7" r="2.5" fill="#E67E22" opacity="0.7" />
      <circle cx="17" cy="17" r="2.5" fill="#E67E22" opacity="0.7" />
      <circle cx="17" cy="7" r="2.5" fill="#E67E22" opacity="0.7" />
      <circle cx="7" cy="17" r="2.5" fill="#E67E22" opacity="0.7" />
    </svg>
  );
}
