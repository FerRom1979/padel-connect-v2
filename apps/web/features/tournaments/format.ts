const dayFormatter = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
});

const dayWithYearFormatter = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** "10 al 12 de octubre" y no dos fechas completas pegadas. */
export function formatTournamentDates(startIso: string, endIso: string | null) {
  const start = new Date(startIso);

  if (!endIso) {
    return dayWithYearFormatter.format(start);
  }

  const end = new Date(endIso);

  if (start.toDateString() === end.toDateString()) {
    return dayWithYearFormatter.format(start);
  }

  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()} al ${dayWithYearFormatter.format(end)}`;
  }

  return `${dayFormatter.format(start)} al ${dayWithYearFormatter.format(end)}`;
}

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export function formatPrice(price: number | null) {
  if (price === null) {
    return null;
  }

  return price === 0 ? 'Gratis' : `${priceFormatter.format(price)} por pareja`;
}
