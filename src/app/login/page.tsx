'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthLoginForm from '@/components/auth/AuthLoginForm';
import { PookalamMandala } from '@/components/landing/KeralaDecorations';
import { UserRole } from '@/types';

function LoginForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const initialRole: UserRole = roleParam === 'staff' ? 'staff' : 'admin';

  return <AuthLoginForm initialRole={initialRole} allowRoleSwitch allowStaffLink />;
}

export default function LoginPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Pookalam */}
      <div className="absolute bottom-10 right-10 opacity-[0.03] pointer-events-none animate-pookalam">
        <PookalamMandala size={280} />
      </div>
      <div className="absolute top-20 left-10 opacity-[0.025] pointer-events-none animate-pookalam">
        <PookalamMandala size={200} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Suspense fallback={<div className="min-h-[40vh]" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}