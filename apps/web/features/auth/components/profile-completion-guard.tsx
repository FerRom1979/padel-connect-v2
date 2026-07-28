'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../hooks/use-auth';

export function ProfileCompletionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user, isLoading, isReady } = useAuth();

  useEffect(() => {
    if (!isReady || isLoading || !user) {
      return;
    }

    if (!user.profileCompleted) {
      router.replace('/complete-profile');
    }
  }, [user, isLoading, isReady, router]);

  if (!isReady || isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  if (!user.profileCompleted) {
    return null;
  }

  return children;
}
