'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarDays, MapPin, Ticket, Users } from 'lucide-react';

import { Button, FormError, Select } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { categoryLabel } from '@/features/profile/constants/category-options';
import { useProfile } from '@/features/profile/hooks/use-profile';
import { cn } from '@/lib/utils';

import { formatPrice, formatTournamentDates } from '../format';
import {
  useCancelTournament,
  useRegisterInTournament,
  useUnregisterFromTournament,
} from '../hooks/use-tournaments';
import type { Tournament } from '../types';

export function TournamentCard({
  tournament,
  standalone = false,
}: {
  tournament: Tournament;
  standalone?: boolean;
}) {
  const router = useRouter();

  const { user } = useAuth();
  const { data: profile } = useProfile();

  const register = useRegisterInTournament();
  const unregister = useUnregisterFromTournament();
  const cancel = useCancelTournament();

  const [confirmingCancel, setConfirmingCancel] = useState(false);

  // Si tu categoría está entre las del torneo, arranca elegida.
  const [category, setCategory] = useState(
    profile?.category && tournament.categories.includes(profile.category)
      ? profile.category
      : tournament.categories[0],
  );

  const isOrganizer = tournament.organizerId === user?.id;
  const isCancelled = Boolean(tournament.cancelledAt);
  const myEntry = tournament.registrations.find(
    (entry) => entry.user.id === user?.id,
  );

  const teams = tournament.registrations.length;
  const isFull = tournament.maxTeams !== null && teams >= tournament.maxTeams;
  const price = formatPrice(tournament.price);

  const actionError = register.error ?? unregister.error ?? cancel.error;
  const othersCount = Math.max(teams - (myEntry ? 1 : 0), 0);

  return (
    <article
      className={cn(
        'rounded-xl border border-border bg-surface p-5',
        isCancelled && 'opacity-70',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold">
            {standalone ? (
              tournament.name
            ) : (
              <Link
                href={`/tournaments/${tournament.id}`}
                className="rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {tournament.name}
              </Link>
            )}
          </h3>

          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0" />
            {tournament.club ? (
              <Link
                href={`/clubs/${tournament.club.id}`}
                className="rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {tournament.club.name}
              </Link>
            ) : (
              tournament.venueName
            )}
            <span>· {tournament.city.name}</span>
          </p>
        </div>

        <span
          className={cn(
            'shrink-0 rounded-full px-3 py-1 text-xs font-medium',
            isCancelled
              ? 'bg-danger/10 text-danger'
              : isFull
                ? 'bg-surface-muted text-muted'
                : 'bg-primary/10 text-primary',
          )}
        >
          {isCancelled
            ? 'Cancelado'
            : isFull
              ? 'Cupo lleno'
              : tournament.maxTeams
                ? `${teams} de ${tournament.maxTeams} parejas`
                : `${teams} ${teams === 1 ? 'pareja' : 'parejas'}`}
        </span>
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 shrink-0 text-muted" />
          <dt className="sr-only">Cuándo</dt>
          <dd>
            {formatTournamentDates(tournament.startDate, tournament.endDate)}
          </dd>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 shrink-0 text-muted" />
          <dt className="sr-only">Categorías</dt>
          <dd>{tournament.categories.join(', ')}</dd>
        </div>

        {price && (
          <div className="flex items-center gap-1.5">
            <Ticket className="h-4 w-4 shrink-0 text-muted" />
            <dt className="sr-only">Inscripción</dt>
            <dd>{price}</dd>
          </div>
        )}
      </dl>

      {tournament.description && (
        <p className="mt-3 text-sm text-muted">{tournament.description}</p>
      )}

      {actionError && (
        <div className="mt-4">
          <FormError error={actionError} />
        </div>
      )}

      {isCancelled ? (
        <p className="mt-4 text-sm text-muted" role="status">
          El organizador canceló este torneo.
        </p>
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {isOrganizer ? (
            confirmingCancel ? (
              <>
                <p className="text-sm font-medium">
                  {othersCount === 0
                    ? '¿Cancelar? Todavía no se anotó nadie.'
                    : `¿Cancelar? Se les avisa a ${othersCount} ${othersCount === 1 ? 'pareja anotada' : 'parejas anotadas'}.`}
                </p>

                <Button
                  variant="danger"
                  size="sm"
                  loading={cancel.isPending}
                  onClick={() => cancel.mutate(tournament.id)}
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
                  onClick={() =>
                    router.push(`/tournaments/${tournament.id}/edit`)
                  }
                >
                  Editar
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmingCancel(true)}
                >
                  Cancelar torneo
                </Button>
              </>
            )
          ) : myEntry ? (
            <>
              <p className="text-sm">
                Anotada/o en <strong>{myEntry.category}</strong>
                {myEntry.partnerName ? ` con ${myEntry.partnerName}` : ''}.
              </p>

              <Button
                variant="secondary"
                size="sm"
                loading={unregister.isPending}
                onClick={() => unregister.mutate(tournament.id)}
              >
                Bajarme
              </Button>
            </>
          ) : (
            <>
              <div className="w-44">
                <Select
                  value={category}
                  onChange={(value) =>
                    setCategory(value as (typeof tournament.categories)[number])
                  }
                  options={tournament.categories.map((item) => ({
                    value: item,
                    label: categoryLabel(item),
                  }))}
                />
              </div>

              <Button
                size="sm"
                disabled={isFull}
                loading={register.isPending}
                onClick={() => register.mutate({ id: tournament.id, category })}
              >
                {isFull ? 'Cupo lleno' : 'Anotarme'}
              </Button>
            </>
          )}
        </div>
      )}
    </article>
  );
}
