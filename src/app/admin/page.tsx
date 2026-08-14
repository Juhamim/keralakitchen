'use client';

import AdminDashboard from '@/components/admin/AdminDashboard';
import RequireRole from '@/components/auth/RequireRole';

export default function AdminPage() {
  return (
    <div className="pt-28 pb-20 bg-coconut-50 min-h-screen">
      <RequireRole role="admin">
        <AdminDashboard />
      </RequireRole>
    </div>
  );
}