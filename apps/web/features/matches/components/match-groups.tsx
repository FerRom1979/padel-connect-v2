'use client';

import { groupByDay } from '../format';
import type { Match } from '../types';
import { MatchCard } from './match-card';

/** Partidos agrupados por día. El encabezado da la fecha; la tarjeta, solo la hora. */
export function MatchGroups({ matches }: { matches: Match[] }) {
  return (
    <>
      {groupByDay(matches).map((group) => (
        <section key={group.key} className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            {group.label}
          </h3>

          {group.matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </section>
      ))}
    </>
  );
}
