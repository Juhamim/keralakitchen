'use client';

import { Suspense } from 'react';
import OrderTracker from '@/components/tracking/OrderTracker';

export default function TrackPage() {
  return (
    <div className="pt-28 pb-20 bg-coconut-50 min-h-screen">
      <Suspense fallback={
        <div className="py-20 text-center text-slate-500 font-serif text-lg">
          Loading Order Tracker...
        </div>
      }>
        <OrderTracker />
      </Suspense>
    </div>
  );
}
