'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { EmptyState } from '@/components/ui';

import { useMatch } from '../hooks/use-match';
import { MatchCard } from './match-card';

export function MatchDetail({ id }: { id: string }) {
  const { data: match, isLoading, isError } = useMatch(id);

  return (
    <>
      <Link
        href="/matches"
        className="flex w-fit items-center gap-2 rounded text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a partidos
      </Link>

      {isLoading && (
        <div
          aria-busy="true"
          className="h-64 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No encontramos este partido"
          description="Puede que se haya borrado, o que el link esté mal."
        />
      )}

      {match && <MatchCard match={match} standalone />}
    </>
  );
}
