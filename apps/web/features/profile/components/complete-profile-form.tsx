'use client';

import { Controller, useForm } from 'react-hook-form';
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
import { AuthHeader, AuthLayout } from '@/components/auth';
import { AuthForm } from '@/components/auth-form/auth-form';

export function CompleteProfileForm() {
  const [citySearch, setCitySearch] = useState('');

  const { data: cities = [], isLoading } = useCities(citySearch);

  const citiesOptions = cities.map((city) => ({
    id: city.id,
    label: city.name,
  }));

  const cityOptions = citySearch.length >= 2 ? citiesOptions : [];

  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      cityId: undefined,
      level: undefined,
      position: undefined,
    },
  });
  const { control } = form;
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

  return (
    <AuthLayout>
      <AuthHeader
        title="Completa tu perfil"
        description="Queremos conocerte mejor"
      />
      <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="cityId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Autocomplete
              inputValue={citySearch}

              options={cityOptions}

              isLoading={isLoading}

              minChars={2}

              placeholder="Buscar ciudad"

              error={fieldState.error?.message}

              onInputChange={setCitySearch}

              onChange={(option) => {
                field.onChange(option.id);
                setCitySearch(option.label);
              }}

              onClear={() => {
                field.onChange(null);
                setCitySearch('');
              }}
            />
          )}
        />
        <FormField
          label="Posición"
          htmlFor="position"
          error={errors.position?.message}
        >
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={positionOptions}
                placeholder="Seleccioná posición"
              />
            )}
          />
        </FormField>
        <FormField label="Nivel" htmlFor="level" error={errors.level?.message}>
          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <Select
                value={String(field.value ?? '')}
                onChange={(value) => field.onChange(Number(value))}
                options={levelOptions}
                placeholder="Seleccione un nivel"
              />
            )}
          />
        </FormField>
        <Button type="submit" disabled={completeProfile.isPending}>
          {completeProfile.isPending ? 'Ingresando...' : 'Continuar'}
        </Button>
      </AuthForm>
    </AuthLayout>
  );
}
