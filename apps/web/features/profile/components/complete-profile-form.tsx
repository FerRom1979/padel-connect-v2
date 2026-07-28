'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  CompleteProfileFormData,
  completeProfileSchema,
} from '../schemas/complete-profile.schema';
import { useCompleteProfile } from '../hooks/use-complete-profile';
import { useState } from 'react';
import { useCities } from '../hooks/use-cities';
import { Autocomplete } from '@/components/autocomplete/autocomplete';
import { Button } from '@/components/ui/button/button';
import { FormField, Select } from '@/components/ui';
import { positionOptions } from '../constants/position-options';
import { levelOptions } from '../constants/level-options';

export function CompleteProfileForm() {
  const [citySearch, setCitySearch] = useState('');

  const { data: cities = [], isLoading } = useCities(citySearch);

  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      cityId: undefined,
      level: undefined,
      position: undefined,
    },
  });

  const { errors } = form.formState;

  const router = useRouter();

  const completeProfile = useCompleteProfile();

  const onSubmit = (data: CompleteProfileFormData) => {
    console.log({ data });
    completeProfile.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  const cityOptions = cities.map((city) => ({
    id: city.id,
    label: city.name,
  }));

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Autocomplete
        inputValue={citySearch}
        options={cityOptions}
        isLoading={isLoading}
        placeholder="Buscar ciudad..."
        onInputChange={setCitySearch}
        onChange={(option) => {
          form.setValue('cityId', option.id);
          setCitySearch(option.label);
        }}
        onClear={() => {
          form.setValue('cityId', 0);
          setCitySearch('');
        }}
      />
      {errors.cityId && <span>{errors.cityId?.message}</span>}
      <FormField
        label="Posición"
        htmlFor="position"
        error={errors.position?.message}
      >
        <Select
          id="position"
          placeholder="Seleccione una posición"
          options={positionOptions}
          {...form.register('position')}
        />
      </FormField>
      <FormField label="Nivel" htmlFor="level" error={errors.level?.message}>
        <Select
          id="level"
          placeholder="Seleccione un nivel"
          options={levelOptions}
          {...form.register('level', {
            valueAsNumber: true,
          })}
        />
      </FormField>
      {errors.level?.message && <span>{errors.level?.message}</span>}
      <Button type="submit" disabled={completeProfile.isPending}>
        {completeProfile.isPending ? 'Ingresando...' : 'Continuar'}
      </Button>
    </form>
  );
}
