'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Users } from 'lucide-react';

import { Button, FormError } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils';

import { MATCH_SIZE } from '../constants';
import { formatCategories, formatMatchDate, formatTime } from '../format';
import {
  useCancelMatch,
  useJoinMatch,
  useLeaveMatch,
} from '../hooks/use-match-actions';
import type { Match } from '../types';

export function MatchCard({
  match,
  // En la pantalla de detalle el título no linkea a sí mismo.
  standalone = false,
}: {
  match: Match;
  standalone?: boolean;
}) {
  const router = useRouter();

  const { user } = useAuth();

  const join = useJoinMatch();
  const leave = useLeaveMatch();
  const cancel = useCancelMatch();

  // Cancelar no se deshace. Dos toques en vez de un diálogo: sin portal,
  // sin trampa de foco, y el aviso queda donde está la mano.
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const spotsLeft = MATCH_SIZE - match.players.length;
  const isOrganizer = match.organizerId === user?.id;
  const isPlaying = match.players.some((p) => p.user.id === user?.id);
  const isCancelled = Boolean(match.cancelledAt);

  const actionError = join.error ?? leave.error ?? cancel.error;

  // El organizador ya está en players: los avisados son los otros.
  const othersCount = Math.max(match.players.length - 1, 0);

  const cancelWarning =
    othersCount === 0
      ? '¿Cancelar? Todavía no se anotó nadie más.'
      : othersCount === 1
        ? '¿Cancelar? Se le avisa a la persona anotada.'
        : `¿Cancelar? Se les avisa a las ${othersCount} personas anotadas.`;

  return (
    <article
      className={cn(
        'rounded-xl border border-border bg-surface p-5',
        isCancelled && 'opacity-70',
      )}
    >
      <div className="flex items-start gap-4">
        {/* La hora es lo primero que se escanea en una lista de partidos. */}
        <div className="shrink-0 text-center">
          <p className="font-display text-3xl font-bold leading-none tracking-tight">
            {formatTime(match.playedAt)}
          </p>

          {/* Dentro de un grupo, el encabezado ya dijo qué día es. */}
          {standalone && (
            <p className="mt-1 text-xs text-muted">
              {formatMatchDate(match.playedAt).split(' · ')[0]}
            </p>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold">
                {standalone ? (
                  match.venueName
                ) : (
                  <Link
                    href={`/matches/${match.id}`}
                    className="rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {match.venueName}
                  </Link>
                )}
              </h3>

              {/* El título ya dice el lugar: acá solo la ciudad, y el acceso
                  al club cuando la sede está cargada en la app. */}
              <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-muted">
                <MapPin className="h-4 w-4 shrink-0" />
                {match.city.name}, {match.city.province}
                {match.club && (
                  <Link
                    href={`/clubs/${match.club.id}`}
                    className="rounded font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Ver club
                  </Link>
                )}
              </p>
            </div>

            <span
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-xs font-medium',
                isCancelled
                  ? 'bg-danger/10 text-danger'
                  : spotsLeft > 0
                    ? 'bg-primary/10 text-primary'
                    : 'bg-surface-muted text-muted',
              )}
            >
              {isCancelled
                ? 'Cancelado'
                : spotsLeft > 0
                  ? `Faltan ${spotsLeft}`
                  : 'Completo'}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4 shrink-0 text-muted" />
          {formatCategories(match.categories)}
        </span>

        <span className="text-muted">{match.durationMin} min</span>
      </p>

      {match.notes && <p className="mt-3 text-sm text-muted">{match.notes}</p>}

      <ul className="mt-4 flex flex-wrap gap-2">
        {match.players.map(({ user: player }) => (
          <li
            key={player.id}
            className="rounded-full bg-surface-muted px-3 py-1 text-xs"
          >
            {player.firstName} {player.lastName.charAt(0)}.
            {player.category ? ` · ${player.category}` : ''}
            {player.id === match.organizerId ? ' · organiza' : ''}
          </li>
        ))}

        {!isCancelled &&
          Array.from({ length: spotsLeft }, (_, index) => (
            <li
              key={`libre-${index}`}
              className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted"
            >
              Libre
            </li>
          ))}
      </ul>

      {actionError && (
        <div className="mt-4">
          <FormError error={actionError} />
        </div>
      )}

      {isCancelled ? (
        <p className="mt-4 text-sm text-muted" role="status">
          El organizador canceló este partido.
        </p>
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {isOrganizer ? (
            confirmingCancel ? (
              <>
                <p className="text-sm font-medium">{cancelWarning}</p>

                <Button
                  variant="danger"
                  size="sm"
                  loading={cancel.isPending}
                  onClick={() => cancel.mutate(match.id)}
                >
                  Sí, cancelar
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmingCancel(false)}
                >
                  No
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push(`/matches/${match.id}/edit`)}
                >
                  Editar
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmingCancel(true)}
                >
                  Cancelar partido
                </Button>
              </>
            )
          ) : isPlaying ? (
            <Button
              variant="secondary"
              size="sm"
              loading={leave.isPending}
              onClick={() => leave.mutate(match.id)}
            >
              Salirme
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={spotsLeft === 0}
              loading={join.isPending}
              onClick={() => join.mutate(match.id)}
            >
              {spotsLeft > 0 ? 'Sumarme' : 'Completo'}
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
