'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import { EMPTY_PAGE } from '@/lib/paginated';
import { MoreResults } from '@/components/ui';
import { EmptyState, Input, Select } from '@/components/ui';
import { categoryOptions } from '@/features/profile/constants/category-options';
import { positionOptions } from '@/features/profile/constants/player-options';
import type { PlayerCategory } from '@/features/profile/constants/category-options';

import { usePlayers } from '../hooks/use-players';
import type { PlayerFilters } from '../types';
import { PlayerCard } from './player-card';

const ANY = 'ANY';

export function PlayerList() {
  const [filters, setFilters] = useState<PlayerFilters>({});

  const { data = EMPTY_PAGE, isLoading, isError } = usePlayers(filters);

  const { items, hasMore } = data;

  const set = (patch: Partial<PlayerFilters>) =>
    setFilters((current) => ({ ...current, ...patch }));

  return (
    <section className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative sm:col-span-3 lg:col-span-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            className="pl-11"
            placeholder="Buscar por nombre"
            aria-label="Buscar jugadores por nombre"
            value={filters.q ?? ''}
            onChange={(event) => set({ q: event.target.value || undefined })}
          />
        </div>

        <Select
          value={filters.category ?? ANY}
          onChange={(value) =>
            set({
              category: value === ANY ? undefined : (value as PlayerCategory),
            })
          }
          options={[
            { value: ANY, label: 'Todas las categorías' },
            ...categoryOptions,
          ]}
        />

        <Select
          value={filters.position ?? ANY}
          onChange={(value) =>
            set({
              position:
                value === ANY
                  ? undefined
                  : (value as PlayerFilters['position']),
            })
          }
          options={[
            { value: ANY, label: 'Cualquier posición' },
            ...positionOptions,
          ]}
        />
      </div>

      {isLoading && (
        <div className="space-y-4" aria-busy="true">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
            />
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          title="No pudimos cargar los jugadores"
          description="Revisá tu conexión y volvé a intentar."
        />
      )}

      {!isLoading && !isError && items.length === 0 && (
        <EmptyState
          title="Ningún jugador coincide"
          description="Probá aflojando los filtros. Solo aparecen quienes ya completaron su perfil."
        />
      )}

      {items.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}

      <MoreResults show={hasMore} />
    </section>
  );
}
