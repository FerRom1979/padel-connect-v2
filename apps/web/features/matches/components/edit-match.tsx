'use client';

import { EmptyState } from '@/components/ui';
import { PageHeader } from '@/components/layout/page-header';

import { useMatch } from '../hooks/use-match';
import { CreateMatchForm } from './create-match-form';

export function EditMatch({ id }: { id: string }) {
  const { data: match, isLoading, isError } = useMatch(id);

  return (
    <>
      <PageHeader
        title="Editar partido"
        description="Los que ya se anotaron siguen anotados."
      />

      {isLoading && (
        <div
          aria-busy="true"
          className="h-96 max-w-xl animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No encontramos este partido"
          description="Puede que se haya borrado, o que el link esté mal."
        />
      )}

      {match && <CreateMatchForm match={match} />}
    </>
  );
}
