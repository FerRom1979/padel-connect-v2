'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { EmptyState } from '@/components/ui';

import { useTournament } from '../hooks/use-tournaments';
import { TournamentCard } from './tournament-card';

export function TournamentDetail({ id }: { id: string }) {
  const { data: tournament, isLoading, isError } = useTournament(id);

  return (
    <>
      <Link
        href="/tournaments"
        className="flex w-fit items-center gap-2 rounded text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a torneos
      </Link>

      {isLoading && (
        <div
          aria-busy="true"
          className="h-64 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No encontramos este torneo"
          description="Puede que se haya borrado, o que el link esté mal."
        />
      )}

      {tournament && (
        <>
          <TournamentCard tournament={tournament} standalone />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              Inscriptos ({tournament.registrations.length})
            </h2>

            {tournament.registrations.length === 0 ? (
              <EmptyState
                title="Todavía no se anotó nadie"
                description="Sé la primera pareja en anotarse."
              />
            ) : (
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
                {tournament.registrations.map((entry) => (
                  <li
                    key={entry.user.id}
                    className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm"
                  >
                    <span>
                      {entry.user.firstName} {entry.user.lastName}
                      {entry.partnerName ? ` + ${entry.partnerName}` : ''}
                    </span>

                    <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium">
                      {entry.category}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  );
}
