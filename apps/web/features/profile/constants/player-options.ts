export const positionOptions = [
  { value: 'DRIVE', label: 'Drive' },
  { value: 'REVES', label: 'Revés' },
  { value: 'BOTH', label: 'Ambas' },
];

export const dominantHandOptions = [
  { value: 'RIGHT', label: 'Diestro' },
  { value: 'LEFT', label: 'Zurdo' },
];

export const matchTypeOptions = [
  { value: 'SOCIAL', label: 'Social' },
  { value: 'COMPETITIVE', label: 'Competitivo' },
  { value: 'BOTH', label: 'Los dos' },
];

function toLabels(options: { value: string; label: string }[]) {
  return Object.fromEntries(options.map((o) => [o.value, o.label]));
}

export const positionLabels = toLabels(positionOptions);
export const dominantHandLabels = toLabels(dominantHandOptions);
export const matchTypeLabels = toLabels(matchTypeOptions);
