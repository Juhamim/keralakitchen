'use client';

import { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';

export default function BookPage() {
  return (
    <div className="pt-28 pb-20 bg-coconut-50 min-h-screen">
      <Suspense fallback={
        <div className="py-20 text-center text-slate-500 font-serif text-lg">
          Loading Onam Sadya Booking Engine...
        </div>
      }>
        <BookingWizard />
      </Suspense>
    </div>
  );
}
