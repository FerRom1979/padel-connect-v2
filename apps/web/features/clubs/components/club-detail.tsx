'use client';

import Link from 'next/link';
import { ArrowLeft, LayoutGrid, MapPin, Phone } from 'lucide-react';

import { EmptyState } from '@/components/ui';

import { useClub } from '../hooks/use-clubs';
import { ClubActivity } from './club-activity';

export function ClubDetail({ id }: { id: string }) {
  const { data: club, isLoading, isError } = useClub(id);

  return (
    <>
      <Link
        href="/clubs"
        className="flex w-fit items-center gap-2 rounded text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a clubes
      </Link>

      {isLoading && (
        <div
          aria-busy="true"
          className="h-56 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
        />
      )}

      {isError && (
        <EmptyState
          title="No encontramos este club"
          description="Puede que se haya borrado, o que el link esté mal."
        />
      )}

      {club && (
        <article className="rounded-xl border border-border bg-surface p-6">
          <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
            {club.name}
          </h2>

          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0" />
            {club.address ? `${club.address} · ` : ''}
            {club.city.name}, {club.city.province}
          </p>

          {club.courts && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <LayoutGrid className="h-4 w-4 shrink-0" />
              {club.courts} {club.courts === 1 ? 'cancha' : 'canchas'}
            </p>
          )}

          {club.phone && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <Phone className="h-4 w-4 shrink-0" />
              {club.phone}
            </p>
          )}

          {club.website && (
            <a
              href={club.website}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 inline-block rounded text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Sitio web
            </a>
          )}

          {club.description && (
            <p className="mt-5 text-sm">{club.description}</p>
          )}
        </article>
      )}

      {club && <ClubActivity clubId={club.id} />}
    </>
  );
}
