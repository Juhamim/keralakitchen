'use client';

import StaffTerminal from '@/components/staff/StaffTerminal';
import RequireRole from '@/components/auth/RequireRole';

export default function StaffPage() {
  return (
    <div className="pt-28 pb-20 bg-coconut-50 min-h-screen">
      <RequireRole role="staff">
        <StaffTerminal />
      </RequireRole>
    </div>
  );
}