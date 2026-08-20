'use client';

import { useState } from 'react';

import { EMPTY_PAGE } from '@/lib/paginated';
import { MoreResults } from '@/components/ui';
import { EmptyState } from '@/components/ui';

import { useMatches } from '../hooks/use-matches';
import { MatchGroups } from './match-groups';

export function MatchList() {
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [past, setPast] = useState(false);

  const {
    data = EMPTY_PAGE,
    isLoading,
    isError,
  } = useMatches({
    // En los ya jugados no tiene sentido filtrar por lugares libres.
    onlyAvailable: past ? undefined : onlyAvailable,
    past: past || undefined,
  });

  const { items, hasMore } = data;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center gap-5">
        {!past && (
          <label className="flex w-fit items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(event) => setOnlyAvailable(event.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            Solo con lugares libres
          </label>
        )}

        <label className="flex w-fit items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={past}
            onChange={(event) => setPast(event.target.checked)}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          Ver los que ya se jugaron
        </label>
      </div>

      {isLoading && (
        <div className="space-y-4" aria-busy="true">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
            />
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          title="No pudimos cargar los partidos"
          description="Revisá tu conexión y volvé a intentar."
        />
      )}

      {!isLoading && !isError && items.length === 0 && (
        <EmptyState
          title={past ? 'No hay partidos jugados' : 'No hay partidos abiertos'}
          description={
            past
              ? 'Cuando pase la fecha de un partido, queda acá.'
              : onlyAvailable
                ? 'Probá sacando el filtro de lugares libres, o armá el tuyo.'
                : 'Todavía nadie armó un partido. Empezá vos.'
          }
        />
      )}

      <MatchGroups matches={items} />

      <MoreResults show={hasMore} />
    </section>
  );
}
