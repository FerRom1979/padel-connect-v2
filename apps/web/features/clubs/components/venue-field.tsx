'use client';

import { useState } from 'react';
import { Building2 } from 'lucide-react';

import { Autocomplete } from '@/components/autocomplete/autocomplete';
import { FormField } from '@/components/ui';
import { EMPTY_PAGE } from '@/lib/paginated';

import { useClubs } from '../hooks/use-clubs';

export type VenueValue = {
  clubId?: string;
  venueName?: string;
};

type VenueFieldProps = {
  value: VenueValue;
  onChange: (value: VenueValue) => void;
  error?: string;
};

/**
 * Una sola caja para las dos formas de decir dónde se juega: elegís un club
 * cargado, o escribís el nombre del lugar y listo. Dos campos separados
 * ("¿club o texto?") obligarían a decidir antes de saber si el club existe.
 */
export function VenueField({ value, onChange, error }: VenueFieldProps) {
  const [search, setSearch] = useState(value.venueName ?? '');

  const { data = EMPTY_PAGE, isLoading } = useClubs({
    q: search.length >= 2 ? search : undefined,
  });

  const clubs = data.items;

  // El Autocomplete trabaja con ids numéricos; los clubes usan uuid.
  const options = clubs.map((club, index) => ({
    id: index,
    label: club.name,
  }));

  return (
    <FormField label="Dónde se juega" htmlFor="venue" error={error}>
      <Autocomplete
        id="venue"
        inputValue={search}
        options={search.length >= 2 ? options : []}
        isLoading={isLoading}
        minChars={2}
        placeholder="Buscá un club o escribí el lugar"
        onInputChange={(text) => {
          setSearch(text);
          // Al escribir se suelta el club: lo tipeado manda.
          onChange({ venueName: text || undefined });
        }}
        onChange={(option) => {
          const club = clubs[option.id];

          setSearch(club.name);
          onChange({ clubId: club.id });
        }}
        onClear={() => {
          setSearch('');
          onChange({});
        }}
      />

      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
        <Building2 className="h-3.5 w-3.5 shrink-0" />
        {value.clubId
          ? 'Club de la app: la ciudad y la dirección salen de ahí.'
          : 'Si el club no está cargado, escribí el nombre del lugar nomás.'}
      </p>
    </FormField>
  );
}
