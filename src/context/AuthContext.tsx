'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser, UserRole } from '@/types';
import { authenticate, clearSession, getSession, ROLE_HOME_PATHS, saveSession } from '@/lib/auth';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string; role?: UserRole };
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setUser(getSession());
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    const authenticatedUser = authenticate(username, password);
    if (!authenticatedUser) {
      return { ok: false, error: 'Invalid username or password. Please try again.' };
    }
    setUser(authenticatedUser);
    saveSession(authenticatedUser);
    return { ok: true, role: authenticatedUser.role };
  };

  const logout = () => {
    setUser(null);
    clearSession();
    router.push('/');
  };

  const hasRole = (role: UserRole) => user?.role === role;

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function getRoleHomePath(role: UserRole): string {
  return ROLE_HOME_PATHS[role];
}