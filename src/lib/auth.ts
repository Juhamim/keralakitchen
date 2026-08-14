import { AuthUser, CredentialsEntry, UserRole } from '@/types';

export const SESSION_STORAGE_KEY = 'kerala_kitchen_auth_session';

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  staff: 'Staff',
  customer: 'Customer',
};

export const ROLE_HOME_PATHS: Record<UserRole, string> = {
  admin: '/admin',
  staff: '/staff',
  customer: '/dashboard',
};

export const CREDENTIALS: CredentialsEntry[] = [
  {
    username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin',
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin@123',
    name: 'Restaurant Admin',
    role: 'admin',
  },
  {
    username: process.env.NEXT_PUBLIC_STAFF_USERNAME || 'staff',
    password: process.env.NEXT_PUBLIC_STAFF_PASSWORD || 'staff@123',
    name: 'Kitchen Staff',
    role: 'staff',
  },
];

export function getSession(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthUser;
    if (!session.role || !session.username) return null;
    return session;
  } catch {
    return null;
  }
}

export function saveSession(user: AuthUser): void {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function authenticate(username: string, password: string): AuthUser | null {
  const entry = CREDENTIALS.find(
    (c) => c.username.toLowerCase() === username.trim().toLowerCase() && c.password === password
  );
  if (!entry) return null;
  return {
    username: entry.username,
    name: entry.name,
    role: entry.role,
    loggedInAt: new Date().toISOString(),
  };
}
