'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui';
import { MatchList } from '@/features/matches/components/match-list';

export default function MatchesPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader
          title="Partidos"
          description="Sumate a uno abierto o armá el tuyo."
        />

        <Button onClick={() => router.push('/matches/new')}>
          Crear partido
        </Button>
      </div>

      <MatchList />
    </>
  );
}
