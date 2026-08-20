'use client';

import { EmptyState } from '@/components/ui';
import { MatchGroups } from '@/features/matches/components/match-groups';
import { useMatches } from '@/features/matches/hooks/use-matches';
import { TournamentCard } from '@/features/tournaments/components/tournament-card';
import { useTournaments } from '@/features/tournaments/hooks/use-tournaments';
import { EMPTY_PAGE } from '@/lib/paginated';

/**
 * Sin esto el detalle de club es un callejón: entrás, ves la dirección y no hay
 * nada que hacer. Lo que le importa a un jugador es qué se juega ahí.
 */
export function ClubActivity({ clubId }: { clubId: string }) {
  const { data: matches = EMPTY_PAGE, isLoading: loadingMatches } = useMatches({
    clubId,
  });

  const { data: tournaments = EMPTY_PAGE, isLoading: loadingTournaments } =
    useTournaments({ clubId });

  const isLoading = loadingMatches || loadingTournaments;

  if (isLoading) {
    return (
      <div
        aria-busy="true"
        className="h-40 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
      />
    );
  }

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Próximos partidos acá</h2>

        {matches.items.length === 0 ? (
          <EmptyState
            title="Todavía no hay partidos en este club"
            description="Si vas a jugar acá, armá el partido y que se sume quien quiera."
          />
        ) : (
          <MatchGroups matches={matches.items} />
        )}
      </section>

      {tournaments.items.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Torneos acá</h2>

          {tournaments.items.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </section>
      )}
    </>
  );
}
