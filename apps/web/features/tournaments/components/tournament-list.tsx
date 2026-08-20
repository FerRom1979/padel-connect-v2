'use client';

import { useState } from 'react';

import { EMPTY_PAGE } from '@/lib/paginated';
import { MoreResults } from '@/components/ui';
import { EmptyState } from '@/components/ui';

import { useTournaments } from '../hooks/use-tournaments';
import { TournamentCard } from './tournament-card';

export function TournamentList() {
  const [mine, setMine] = useState(false);
  const [past, setPast] = useState(false);

  const {
    data = EMPTY_PAGE,
    isLoading,
    isError,
  } = useTournaments({
    mine: mine || undefined,
    past: past || undefined,
  });

  const { items, hasMore } = data;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center gap-5">
        <label className="flex w-fit items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={mine}
            onChange={(event) => setMine(event.target.checked)}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          Solo en los que estoy anotado
        </label>

        <label className="flex w-fit items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={past}
            onChange={(event) => setPast(event.target.checked)}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          Ver los que ya pasaron
        </label>
      </div>

      {isLoading && (
        <div className="space-y-4" aria-busy="true">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="h-44 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
            />
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          title="No pudimos cargar los torneos"
          description="Revisá tu conexión y volvé a intentar."
        />
      )}

      {!isLoading && !isError && items.length === 0 && (
        <EmptyState
          title={
            past
              ? 'No hay torneos pasados'
              : mine
                ? 'No estás anotado en ninguno'
                : 'No hay torneos abiertos'
          }
          description={
            past
              ? 'Cuando termine un torneo, queda acá.'
              : mine
                ? 'Sacá el filtro para ver todos los que hay.'
                : 'Todavía nadie publicó un torneo. Si organizás uno, cargalo.'
          }
        />
      )}

      {items.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}

      <MoreResults show={hasMore} />
    </section>
  );
}
