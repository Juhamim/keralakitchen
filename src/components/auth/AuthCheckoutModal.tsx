'use client';

import { useState } from 'react';
import { AuthUser } from '@/types';
import { signInWithGoogle, signOutUser, isSupabaseConfigured } from '@/lib/supabase/client';
import { CheckCircle2, User, LogOut, ShieldCheck, Sparkles } from 'lucide-react';

interface AuthCheckoutModalProps {
  authUser: AuthUser | null;
  isGuest: boolean;
  onSelectGuest: () => void;
  onSelectGoogle: () => void;
}

export default function AuthCheckoutModal({
  authUser,
  isGuest,
  onSelectGuest,
  onSelectGoogle,
}: AuthCheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        await signInWithGoogle('/book');
      } else {
        // Fallback for local demo mode if Supabase credentials are not set yet
        setTimeout(() => {
          onSelectGoogle();
          setIsLoading(false);
        }, 600);
      }
    } catch (err) {
      console.error('Google Sign In failed:', err);
      alert('Google authentication failed. Proceeding as Guest.');
      onSelectGuest();
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/60 transition-all">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Checkout Authentication
        </span>
        <h3 className="font-serif text-2xl font-bold text-slate-900">Complete Your Order</h3>
        <p className="text-sm text-slate-600 mt-1">
          Choose your preferred way to proceed with your booking.
        </p>
      </div>

      {authUser ? (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl p-5 border border-emerald-200/80 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {authUser.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={authUser.avatarUrl}
                  alt={authUser.name}
                  className="w-12 h-12 rounded-full border-2 border-emerald-500 shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                  {authUser.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  {authUser.name}
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
                <div className="text-xs text-slate-500">{authUser.email}</div>
                <div className="text-[11px] font-medium text-emerald-700 mt-0.5">
                  ✓ Logged in via Google • Addresses saved
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={async () => {
                await signOutUser();
                onSelectGuest();
              }}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-w-md mx-auto">
          {/* Option A: Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3.5 px-5 rounded-2xl border border-slate-300 shadow-sm hover:shadow transition-all group disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.39 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.61 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>{isLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              OR
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Option B: Continue as Guest */}
          <button
            type="button"
            onClick={onSelectGuest}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 px-5 rounded-2xl border transition-all ${
              isGuest && !authUser
                ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Continue as Guest</span>
          </button>

          <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>No account required. Quick & secure checkout.</span>
          </div>
        </div>
      )}
    </div>
  );
}
