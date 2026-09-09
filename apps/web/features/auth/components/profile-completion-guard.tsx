'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../hooks/use-auth';

export function ProfileCompletionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLoading, isReady } = useAuth();

  useEffect(() => {
    if (!isReady || isLoading || !user) {
      return;
    }

    if (!user.profileCompleted && pathname !== '/complete-profile') {
      router.replace('/complete-profile');
      return;
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

  if (!user.profileCompleted) {
    return pathname === '/complete-profile' ? children : null;
  }

  if (pathname === '/complete-profile') {
    return null;
  }

  return children;
}
