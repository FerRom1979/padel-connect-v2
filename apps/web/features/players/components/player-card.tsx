'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';

import { positionLabels } from '@/features/profile/constants/player-options';

import type { Player } from '../types';

/** Iniciales como avatar: no hay fotos todavía y un ícono genérico no distingue nada. */
function Initials({ player }: { player: Player }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">
      {player.firstName.charAt(0)}
      {player.lastName.charAt(0)}
    </span>
  );
}

export function PlayerCard({ player }: { player: Player }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start gap-4">
        <Initials player={player} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-semibold">
              <Link
                href={`/players/${player.id}`}
                className="rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {player.firstName} {player.lastName}
              </Link>
            </h3>

            {player.category && (
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {player.category}
              </span>
            )}
          </div>

          {player.city && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0" />
              {player.city.name}, {player.city.province}
            </p>
          )}

          {player.position && (
            <p className="mt-2 text-sm text-muted">
              Juega de {positionLabels[player.position]}
            </p>
          )}

          {player.bio && (
            <p className="mt-2 line-clamp-2 text-sm text-muted">{player.bio}</p>
          )}
        </div>
      </div>
    </article>
  );
}
