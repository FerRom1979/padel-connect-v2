/** Pádel es 2v2. Espeja MATCH_SIZE del API. */
export const MATCH_SIZE = 4;

export const DURATION_OPTIONS = [60, 90, 120].map((minutes) => ({
  value: String(minutes),
  label: `${minutes} min`,
}));
