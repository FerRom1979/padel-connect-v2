'use client';

import {
  CABALLEROS,
  DAMAS,
  type PlayerCategory,
} from '@/features/profile/constants/category-options';
import { cn } from '@/lib/utils';

type CategoryPickerProps = {
  value: PlayerCategory[];
  onChange: (value: PlayerCategory[]) => void;
};

// ponytail: fichas en vez de un multi-select. Radix Select no hace multiple y
// son 15 opciones cortas: entran todas a la vista sin abrir nada.
function Group({
  legend,
  hint,
  categories,
  value,
  onChange,
}: CategoryPickerProps & {
  legend: string;
  hint: string;
  categories: readonly PlayerCategory[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">
        {legend} <span className="font-normal text-muted">· {hint}</span>
      </legend>

      <div className="mt-2 flex flex-wrap gap-2">
        {categories.map((category) => {
          const selected = value.includes(category);

          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() =>
                onChange(
                  selected
                    ? value.filter((item) => item !== category)
                    : [...value, category],
                )
              }
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                selected
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-surface text-muted hover:border-primary/40',
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  return (
    <div className="space-y-4">
      <Group
        legend="Caballeros"
        hint="C1 profesional, C8 principiante"
        categories={CABALLEROS}
        value={value}
        onChange={onChange}
      />

      <Group
        legend="Damas"
        hint="D1 profesional, D7 principiante"
        categories={DAMAS}
        value={value}
        onChange={onChange}
      />

      <p className="text-sm text-muted">
        {value.length === 0
          ? 'Sin elegir ninguna, se suma cualquiera.'
          : `Aceptás ${value.length} ${value.length === 1 ? 'categoría' : 'categorías'}.`}
      </p>
    </div>
  );
}
