// 24 horas: acá nadie dice "8 p. m.", dice "a las 20".
const timeFormatter = new Intl.DateTimeFormat('es-AR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const dayFormatter = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const shortDayFormatter = new Intl.DateTimeFormat('es-AR', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Días de diferencia en calendario local, no en milisegundos. */
function daysFromToday(date: Date) {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  return Math.round(
    (startOfDay(date).getTime() - startOfDay(new Date()).getTime()) /
      MS_PER_DAY,
  );
}

export function formatTime(iso: string) {
  return timeFormatter.format(new Date(iso));
}

/** Clave de agrupación por día calendario local. */
export function dayKey(iso: string) {
  return startOfDay(new Date(iso)).toDateString();
}

/** "Hoy" y "Mañana" ubican mucho mejor que "mar, 25 ago". */
export function formatDayLabel(iso: string) {
  const days = daysFromToday(new Date(iso));

  if (days === 0) return 'Hoy';
  if (days === 1) return 'Mañana';

  return dayFormatter.format(new Date(iso));
}

/** Fecha compacta, para donde no hay encabezado de día que dé contexto. */
export function formatMatchDate(iso: string) {
  const days = daysFromToday(new Date(iso));
  const time = formatTime(iso);

  if (days === 0) return `Hoy · ${time}`;
  if (days === 1) return `Mañana · ${time}`;

  return `${shortDayFormatter.format(new Date(iso))} · ${time}`;
}

export function formatCategories(categories: string[]) {
  if (categories.length === 0) {
    return 'Todas las categorías';
  }

  return categories.join(', ');
}

/** Agrupa partidos por día, respetando el orden que ya trae el listado. */
export function groupByDay<T extends { playedAt: string }>(matches: T[]) {
  const groups = new Map<string, { label: string; matches: T[] }>();

  for (const match of matches) {
    const key = dayKey(match.playedAt);

    const group = groups.get(key) ?? {
      label: formatDayLabel(match.playedAt),
      matches: [],
    };

    group.matches.push(match);
    groups.set(key, group);
  }

  return [...groups.entries()].map(([key, group]) => ({ key, ...group }));
}
