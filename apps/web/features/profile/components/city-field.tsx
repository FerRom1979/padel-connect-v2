'use client';

import { useState } from 'react';

import { Autocomplete } from '@/components/autocomplete/autocomplete';
import { FormField } from '@/components/ui';

import { useCities } from '../hooks/use-cities';

type CityFieldProps = {
  value?: number;
  onChange: (cityId: number | undefined) => void;
  /** Nombre a mostrar cuando la ciudad ya viene elegida (edición de perfil). */
  initialLabel?: string;
  error?: string;
  label?: string;
};

export function CityField({
  onChange,
  initialLabel = '',
  error,
  label = 'Ciudad',
}: CityFieldProps) {
  const [search, setSearch] = useState(initialLabel);

  const { data: cities = [], isLoading } = useCities(search);

  return (
    <FormField label={label} htmlFor="city" error={error}>
      <Autocomplete
        id="city"
        inputValue={search}
        options={cities.map((city) => ({ id: city.id, label: city.name }))}
        isLoading={isLoading}
        minChars={2}
        placeholder="Escribí al menos 2 letras"
        onInputChange={setSearch}
        onChange={(option) => {
          onChange(option.id);
          setSearch(option.label);
        }}
        onClear={() => {
          onChange(undefined);
          setSearch('');
        }}
      />
    </FormField>
  );
}
