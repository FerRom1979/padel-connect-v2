'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoadingScreen } from '@/components/brand/loading-screen';
import { useAuth } from '../hooks/use-auth';

export function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLoading, isReady } = useAuth();

  useEffect(() => {
    if (!isReady || isLoading) {
      return;
    }

    if (user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, isReady, pathname, router]);

  if (!isReady || isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return null;
  }

  return children;
}
