'use client';

import { useRouter } from 'next/navigation';

import { EmptyState } from '@/components/ui';
import { TournamentCard } from '@/features/tournaments/components/tournament-card';
import { useTournaments } from '@/features/tournaments/hooks/use-tournaments';
import { EMPTY_PAGE } from '@/lib/paginated';

export function UpcomingTournaments() {
  const router = useRouter();

  const {
    data = EMPTY_PAGE,
    isLoading,
    isError,
  } = useTournaments({
    mine: true,
  });

  const { items } = data;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Tus torneos</h2>

      {isLoading && (
        <div
          aria-busy="true"
          className="h-44 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No pudimos cargar tus torneos"
          description="Revisá tu conexión y volvé a intentar."
        />
      )}

      {!isLoading && !isError && items.length === 0 && (
        <EmptyState
          title="No estás anotado en ningún torneo"
          description="Cuando te inscribas en uno, aparece acá."
          actionLabel="Ver torneos"
          onAction={() => router.push('/tournaments')}
        />
      )}

      {items.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </section>
  );
}
