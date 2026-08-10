import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isValidKeralaPincode(pincode: string): boolean {
  // Kerala pincodes start with 67, 68, or 69 and are 6 digits
  const clean = pincode.replace(/\D/g, '');
  return /^6[789]\d{4}$/.test(clean);
}

export function generateBookingNumber(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `ONAM-2026-${randomDigits}`;
}
