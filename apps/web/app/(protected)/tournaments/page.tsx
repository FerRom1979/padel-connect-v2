'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui';
import { TournamentList } from '@/features/tournaments/components/tournament-list';

export default function TournamentsPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader title="Torneos" description="Competí en tu categoría." />

        <Button onClick={() => router.push('/tournaments/new')}>
          Publicar torneo
        </Button>
      </div>

      <TournamentList />
    </>
  );
}
