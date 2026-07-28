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
      <select {...form.register('position')}>
        <option value="">Seleccione una posición</option>
        <option value="DRIVE">Drive</option>
        <option value="REVES">Revés</option>
        <option value="BOTH">Ambas</option>
      </select>
      {errors.position?.message && <span>{errors.position?.message}</span>}
      <select
        {...form.register('level', {
          valueAsNumber: true,
        })}
      >
        <option value="2">Principiante</option>
        <option value="5">Intermedio</option>
        <option value="8">Competitivo</option>
        <option value="10">Profesional</option>
      </select>
      {errors.level?.message && <span>{errors.level?.message}</span>}
      <button type="submit" disabled={completeProfile.isPending}>
        {completeProfile.isPending ? 'Ingresando...' : 'Continuar'}
      </button>
    </form>
  );
}
