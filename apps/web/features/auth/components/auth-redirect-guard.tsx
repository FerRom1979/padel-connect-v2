'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../hooks/use-auth';

export function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user, isLoading, isReady } = useAuth();

  useEffect(() => {
    if (!isReady || isLoading) {
      return;
    }

    if (user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, isReady, router]);

  if (!isReady || isLoading) {
    return <div>Cargando...</div>;
  }

  if (user) {
    return null;
  }

  return children;
}
