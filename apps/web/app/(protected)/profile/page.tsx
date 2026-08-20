'use client';

import { PageHeader } from '@/components/layout/page-header';
import { EmptyState } from '@/components/ui';
import { ProfileForm } from '@/features/profile/components/profile-form';
import { useProfile } from '@/features/profile/hooks/use-profile';

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useProfile();

  return (
    <>
      <PageHeader
        title="Tu perfil"
        description="Esto es lo que ven los demás cuando buscan con quién jugar."
      />

      {isLoading && (
        <div
          aria-busy="true"
          className="h-96 max-w-xl animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No pudimos cargar tu perfil"
          description="Revisá tu conexión y volvé a intentar."
        />
      )}

      {profile && <ProfileForm profile={profile} />}
    </>
  );
}
