'use client';

import { useRouter } from 'next/navigation';

import { EMPTY_PAGE } from '@/lib/paginated';
import { EmptyState } from '@/components/ui';
import { MatchGroups } from '@/features/matches/components/match-groups';
import { useMatches } from '@/features/matches/hooks/use-matches';

export function UpcomingMatches() {
  const router = useRouter();

  const { data = EMPTY_PAGE, isLoading, isError } = useMatches({ mine: true });

  const { items } = data;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Próximos partidos</h2>

      {isLoading && (
        <div
          aria-busy="true"
          className="h-52 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No pudimos cargar tus partidos"
          description="Revisá tu conexión y volvé a intentar."
        />
      )}

      {!isLoading && !isError && items.length === 0 && (
        <EmptyState
          title="No tenés partidos programados"
          description="Cuando te sumes a un partido, aparece acá."
          actionLabel="Buscar partidos"
          onAction={() => router.push('/matches')}
        />
      )}

      <MatchGroups matches={items} />
    </section>
  );
}
