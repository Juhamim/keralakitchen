'use client';

import { Suspense } from 'react';
import CustomerDashboard from '@/components/customer/CustomerDashboard';

export default function DashboardPage() {
  return (
    <div className="pt-28 pb-20 bg-coconut-50 min-h-screen">
      <Suspense
        fallback={
          <div className="py-20 text-center text-slate-500 font-serif text-lg">
            Loading Customer Dashboard...
          </div>
        }
      >
        <CustomerDashboard />
      </Suspense>
    </div>
  );
}
