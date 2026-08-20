'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import { EMPTY_PAGE } from '@/lib/paginated';
import { MoreResults } from '@/components/ui';
import { EmptyState, Input } from '@/components/ui';

import { useClubs } from '../hooks/use-clubs';
import { ClubCard } from './club-card';

export function ClubList() {
  const [search, setSearch] = useState('');

  const {
    data = EMPTY_PAGE,
    isLoading,
    isError,
  } = useClubs({
    q: search || undefined,
  });

  const { items, hasMore } = data;

  return (
    <section className="space-y-5">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          className="pl-11"
          placeholder="Buscar club por nombre"
          aria-label="Buscar club por nombre"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {isLoading && (
        <div className="space-y-4" aria-busy="true">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
            />
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          title="No pudimos cargar los clubes"
          description="Revisá tu conexión y volvé a intentar."
        />
      )}

      {!isLoading && !isError && items.length === 0 && (
        <EmptyState
          title={search ? 'Ningún club coincide' : 'Todavía no hay clubes'}
          description={
            search
              ? 'Probá con otro nombre, o cargalo vos si falta.'
              : 'El mapa lo llenamos entre todos: cargá el club donde jugás.'
          }
        />
      )}

      {items.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}

      <MoreResults show={hasMore} />
    </section>
  );
}
