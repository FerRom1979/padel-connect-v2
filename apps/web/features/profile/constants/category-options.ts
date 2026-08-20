/**
 * Categorías del pádel argentino. Caballeros C1..C8, damas D1..D7.
 * OJO con el orden: el número MÁS BAJO es el MEJOR jugador.
 * C1 / D1 son profesionales; C8 / D7, principiantes.
 */
export const CABALLEROS = [
  'C1',
  'C2',
  'C3',
  'C4',
  'C5',
  'C6',
  'C7',
  'C8',
] as const;

export const DAMAS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'] as const;

export const PLAYER_CATEGORIES = [...CABALLEROS, ...DAMAS];

export type PlayerCategory = (typeof PLAYER_CATEGORIES)[number];

/** Qué significa cada punta de la escala, para no hacer adivinar al usuario. */
const EDGES: Record<string, string> = {
  C1: 'profesional',
  C8: 'principiante',
  D1: 'profesional',
  D7: 'principiante',
};

export function categoryLabel(category: string) {
  const edge = EDGES[category];

  return edge ? `${category} · ${edge}` : category;
}

export const categoryOptions = PLAYER_CATEGORIES.map((category) => ({
  value: category,
  label: categoryLabel(category),
}));
