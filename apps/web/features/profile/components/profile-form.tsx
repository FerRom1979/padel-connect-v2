'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, FormError, FormField, Select } from '@/components/ui';
import { formControlClassName } from '@/components/ui/form-control';
import { cn } from '@/lib/utils';

import { categoryOptions } from '../constants/category-options';
import {
  dominantHandOptions,
  matchTypeOptions,
  positionOptions,
} from '../constants/player-options';
import { useCompleteProfile } from '../hooks/use-complete-profile';
import { profileSchema, type ProfileFormData } from '../schemas/profile.schema';
import type { Profile } from '../types';
import { CityField } from './city-field';

export function ProfileForm({ profile }: { profile: Profile }) {
  const update = useCompleteProfile();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      cityId: profile.city?.id,
      category: profile.category ?? undefined,
      position: profile.position ?? undefined,
      dominantHand: profile.dominantHand ?? undefined,
      preferredMatchType: profile.preferredMatchType ?? undefined,
      bio: profile.bio ?? '',
    },
  });

  const { errors, isDirty } = form.formState;

  return (
    <form
      onSubmit={form.handleSubmit((data) =>
        // reset con los valores guardados: deja de estar "sucio" y el botón se apaga.
        update.mutate(data, { onSuccess: () => form.reset(data) }),
      )}
      className="max-w-xl space-y-6"
    >
      <FormError error={update.error} />

      <Controller
        name="cityId"
        control={form.control}
        render={({ field }) => (
          <CityField
            value={field.value}
            onChange={field.onChange}
            initialLabel={profile.city?.name ?? ''}
            error={errors.cityId?.message}
          />
        )}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Categoría" error={errors.category?.message}>
          <Controller
            name="category"
            control={form.control}
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

        <FormField label="Posición" error={errors.position?.message}>
          <Controller
            name="position"
            control={form.control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={positionOptions}
                placeholder="Elegí tu posición"
              />
            )}
          />
        </FormField>

        <FormField label="Mano hábil" error={errors.dominantHand?.message}>
          <Controller
            name="dominantHand"
            control={form.control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={dominantHandOptions}
                placeholder="Sin especificar"
              />
            )}
          />
        </FormField>

        <FormField
          label="Cómo te gusta jugar"
          error={errors.preferredMatchType?.message}
        >
          <Controller
            name="preferredMatchType"
            control={form.control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={matchTypeOptions}
                placeholder="Sin especificar"
              />
            )}
          />
        </FormField>
      </div>

      <FormField label="Sobre vos" htmlFor="bio" error={errors.bio?.message}>
        <textarea
          id="bio"
          rows={3}
          maxLength={300}
          placeholder="Juego hace 3 años, prefiero partidos de tarde."
          className={cn(formControlClassName, 'h-auto py-3')}
          {...form.register('bio')}
        />
      </FormField>

      <div className="flex items-center gap-4">
        <Button type="submit" loading={update.isPending} disabled={!isDirty}>
          Guardar cambios
        </Button>

        {update.isSuccess && !isDirty && (
          <p role="status" className="text-sm text-primary">
            Guardado.
          </p>
        )}
      </div>
    </form>
  );
}
