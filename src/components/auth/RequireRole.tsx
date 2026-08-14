'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_HOME_PATHS } from '@/lib/auth';
import { UserRole } from '@/types';
import { Loader2 } from 'lucide-react';

export default function RequireRole({ role, children }: { role: UserRole; children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(false);
    if (isLoading) return;

    if (!user) {
      router.replace(role === 'admin' ? '/admin/login' : `/login?role=${role}`);
      return;
    }

    if (user.role !== role) {
      router.replace(ROLE_HOME_PATHS[user.role]);
      return;
    }

    setAllowed(true);
  }, [isLoading, user, role, router]);

  if (isLoading || !allowed) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Verifying access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
