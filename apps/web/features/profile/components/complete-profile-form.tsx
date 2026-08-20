'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  CompleteProfileFormData,
  completeProfileSchema,
} from '../schemas/complete-profile.schema';
import { useCompleteProfile } from '../hooks/use-complete-profile';
import { Button } from '@/components/ui/button/button';
import { FormError, FormField, Select } from '@/components/ui';
import { positionOptions } from '../constants/player-options';
import { CityField } from './city-field';
import { categoryOptions } from '../constants/category-options';
import { AuthHeader, AuthLayout } from '@/components/auth';
import { AuthForm } from '@/components/auth-form/auth-form';

export function CompleteProfileForm() {
  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      cityId: undefined,
      category: undefined,
      position: undefined,
    },
  });
  const { control } = form;
  const { errors } = form.formState;

  const router = useRouter();

  const completeProfile = useCompleteProfile();

  const onSubmit = (data: CompleteProfileFormData) => {
    completeProfile.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Cómo jugás"
        description="Con esto te emparejamos con jugadores de tu nivel y zona."
        step={{ current: 2, total: 2 }}
      />
      <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <FormError error={completeProfile.error} />

        <Controller
          name="cityId"
          control={control}
          render={({ field, fieldState }) => (
            <CityField
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
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
        <FormField
          label="Categoría"
          htmlFor="category"
          error={errors.category?.message}
        >
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={categoryOptions}
                placeholder="Elegí tu categoría"
              />
            )}
          />
        </FormField>
        <Button
          type="submit"
          className="w-full"
          loading={completeProfile.isPending}
        >
          Continuar
        </Button>
      </AuthForm>
    </AuthLayout>
  );
}
