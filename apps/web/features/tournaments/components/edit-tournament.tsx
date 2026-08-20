'use client';

import { EmptyState } from '@/components/ui';
import { PageHeader } from '@/components/layout/page-header';

import { useTournament } from '../hooks/use-tournaments';
import { CreateTournamentForm } from './create-tournament-form';

export function EditTournament({ id }: { id: string }) {
  const { data: tournament, isLoading, isError } = useTournament(id);

  return (
    <>
      <PageHeader
        title="Editar torneo"
        description="Las parejas anotadas se mantienen."
      />

      {isLoading && (
        <div
          aria-busy="true"
          className="h-96 max-w-xl animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No encontramos este torneo"
          description="Puede que se haya borrado, o que el link esté mal."
        />
      )}

      {tournament && <CreateTournamentForm tournament={tournament} />}
    </>
  );
}
