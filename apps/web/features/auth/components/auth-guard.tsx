'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../hooks/use-auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const pathname = usePathname();

  const { user, isLoading, isReady } = useAuth();

  useEffect(() => {
    if (!isReady || isLoading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    if (!user.profileCompleted && pathname !== '/complete-profile') {
      router.replace('/complete-profile');
    }

    if (user.profileCompleted && pathname === '/complete-profile') {
      router.replace('/dashboard');
    }
  }, [user, isLoading, isReady, pathname, router]);

  if (!isReady || isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
}
