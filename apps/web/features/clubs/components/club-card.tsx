'use client';

import Link from 'next/link';
import { LayoutGrid, MapPin } from 'lucide-react';

import type { Club } from '../types';

export function ClubCard({ club }: { club: Club }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold">
            <Link
              href={`/clubs/${club.id}`}
              className="rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {club.name}
            </Link>
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0" />
            {club.address ? `${club.address} · ` : ''}
            {club.city.name}, {club.city.province}
          </p>
        </div>

        {club.courts && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium">
            <LayoutGrid className="h-3.5 w-3.5" />
            {club.courts} {club.courts === 1 ? 'cancha' : 'canchas'}
          </span>
        )}
      </div>

      {club.description && (
        <p className="mt-3 line-clamp-2 text-sm text-muted">
          {club.description}
        </p>
      )}
    </article>
  );
}
