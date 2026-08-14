'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { CREDENTIALS, ROLE_HOME_PATHS, ROLE_LABELS } from '@/lib/auth';
import { UserRole } from '@/types';
import { ShieldCheck, Users, Eye, EyeOff, Lock, AlertCircle, LogIn, ArrowRight } from 'lucide-react';
import { NilavilakkuLamp } from '@/components/landing/KeralaDecorations';

const ROLE_META: Record<UserRole, { icon: typeof ShieldCheck; accent: string; active: string }> = {
  admin: {
    icon: ShieldCheck,
    accent: 'from-maroon to-maroon-light',
    active: 'bg-maroon text-white border-maroon shadow-md',
  },
  staff: {
    icon: Users,
    accent: 'from-leaf to-leaf-dark',
    active: 'bg-leaf text-white border-leaf shadow-md',
  },
  customer: {
    icon: ShieldCheck,
    accent: 'from-amber-500 to-amber-600',
    active: 'bg-amber-600 text-white border-amber-600 shadow-md',
  },
};

interface AuthLoginFormProps {
  fixedRole?: UserRole;
  initialRole?: UserRole;
  allowRoleSwitch?: boolean;
  allowStaffLink?: boolean;
}

export default function AuthLoginForm({
  fixedRole,
  initialRole = 'admin',
  allowRoleSwitch = false,
  allowStaffLink = false,
}: AuthLoginFormProps) {
  const { user, isAuthenticated, login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(fixedRole || initialRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(ROLE_HOME_PATHS[user.role]);
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = login(username, password);
    if (!result.ok) {
      setError(result.error || 'Login failed');
      setIsSubmitting(false);
      return;
    }
  };

  const demoCred = CREDENTIALS.find((c) => c.role === role);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-4xl p-8 sm:p-10 relative overflow-hidden">
        {/* Kasavu top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-leaf to-leaf-dark flex items-center justify-center shadow-glow-green p-3">
            <NilavilakkuLamp className="w-full h-full text-white" />
          </div>
          <h1 className="font-serif text-2xl font-extrabold text-leaf-dark mt-4">
            Kerala<span className="text-gold italic">Kitchen</span> Portal
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {role === 'customer' ? 'Customer Account Portal' : 'Restricted Staff Access'}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 bg-coconut-100 border border-gold/30 px-3.5 py-1.5 rounded-full">
            <Lock className="w-3 h-3 text-gold-deep" />
            {ROLE_LABELS[role]} Role
          </span>
        </div>

        {/* Role Selector */}
        {allowRoleSwitch && (
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {(Object.keys(ROLE_META) as UserRole[]).map((r) => {
              const isActive = role === r;
              const Icon = ROLE_META[r].icon;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setError('');
                  }}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-bold transition-all ${
                    isActive
                      ? ROLE_META[r].active
                      : 'bg-white border-slate-200 text-slate-500 hover:border-gold/50 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {ROLE_LABELS[r]}
                </button>
              );
            })}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 bg-maroon-soft border border-maroon/30 text-maroon-dark rounded-2xl p-3.5 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="auth-username" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Username
            </label>
            <input
              id="auth-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${ROLE_LABELS[role]} username`}
              autoComplete="username"
              required
              className="w-full pl-4 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20 bg-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-300 text-sm font-medium outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20 bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-leaf transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r ${
              role === 'admin' ? 'from-maroon to-maroon-light' : 'from-leaf to-leaf-dark'
            } shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <LogIn className="w-4 h-4" />
            {isSubmitting ? 'Signing in...' : `Sign In as ${ROLE_LABELS[role]}`}
          </button>
        </form>

        {/* Demo Credentials Hint */}
        {demoCred && (
          <div className="mt-6 bg-coconut-100 border border-dashed border-gold/40 rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">
              Demo {ROLE_LABELS[role]} Credentials
            </p>
            <p className="text-xs font-semibold text-slate-600">
              Username: <code className="font-mono text-leaf-dark">{demoCred.username}</code>
              <span className="mx-2 text-slate-300">|</span>
              Password: <code className="font-mono text-maroon">{demoCred.password}</code>
            </p>
          </div>
        )}
      </div>

      {allowStaffLink && (
        <div className="mt-6 text-center">
          <Link
            href="/login?role=staff"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-leaf hover:text-leaf-dark underline underline-offset-4 transition-colors"
          >
            Are you staff? Access the Staff Portal <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}