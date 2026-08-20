'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui';
import { ClubList } from '@/features/clubs/components/club-list';

export default function ClubsPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader
          title="Clubes"
          description="Canchas, horarios y precios cerca tuyo."
        />

        <Button onClick={() => router.push('/clubs/new')}>Cargar club</Button>
      </div>

      <ClubList />
    </>
  );
}
