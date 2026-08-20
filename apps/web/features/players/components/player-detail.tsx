'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';

import { EmptyState } from '@/components/ui';
import {
  dominantHandLabels,
  matchTypeLabels,
  positionLabels,
} from '@/features/profile/constants/player-options';

import { usePlayer } from '../hooks/use-players';

function Fact({ label, value }: { label: string; value?: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

export function PlayerDetail({ id }: { id: string }) {
  const { data: player, isLoading, isError } = usePlayer(id);

  return (
    <>
      <Link
        href="/players"
        className="flex w-fit items-center gap-2 rounded text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a jugadores
      </Link>

      {isLoading && (
        <div
          aria-busy="true"
          className="h-64 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No encontramos este jugador"
          description="Puede que haya dado de baja su cuenta, o que el link esté mal."
        />
      )}

      {player && (
        <article className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-2xl font-bold text-primary">
              {player.firstName.charAt(0)}
              {player.lastName.charAt(0)}
            </span>

            <div>
              <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
                {player.firstName} {player.lastName}
              </h2>

              {player.city && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {player.city.name}, {player.city.province}
                </p>
              )}
            </div>
          </div>

          {player.bio && <p className="mt-6 text-sm">{player.bio}</p>}

          <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <Fact label="Categoría" value={player.category} />
            <Fact
              label="Posición"
              value={player.position ? positionLabels[player.position] : null}
            />
            <Fact
              label="Mano hábil"
              value={
                player.dominantHand
                  ? dominantHandLabels[player.dominantHand]
                  : null
              }
            />
            <Fact
              label="Le gusta"
              value={
                player.preferredMatchType
                  ? matchTypeLabels[player.preferredMatchType]
                  : null
              }
            />
          </dl>

          {/* Sin datos de contacto: es dato personal y todavía no hay forma de
              que cada uno elija qué comparte. Se coordina por el partido. */}
          <p className="mt-6 border-t border-border pt-5 text-sm text-muted">
            Para jugar con {player.firstName}, sumate a un partido suyo o
            invitalo al tuyo.
          </p>
        </article>
      )}
    </>
  );
}
