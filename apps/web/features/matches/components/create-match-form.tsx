'use client';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button, FormError, FormField, Input, Select } from '@/components/ui';
import { formControlClassName } from '@/components/ui/form-control';
import { cn } from '@/lib/utils';

import { DURATION_OPTIONS } from '../constants';
import { VenueField } from '@/features/clubs/components/venue-field';
import { CityField } from '@/features/profile/components/city-field';

import { CategoryPicker } from './category-picker';
import { useCreateMatch, useUpdateMatch } from '../hooks/use-create-match';
import type { Match } from '../types';
import {
  createMatchSchema,
  type CreateMatchFormData,
} from '../schemas/create-match.schema';

/** Valor para <input type="datetime-local">, que no acepta ISO con zona. */
function toLocalInputValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

/** Mismo formulario para crear y para editar: los campos son los mismos. */
export function CreateMatchForm({ match }: { match?: Match } = {}) {
  const isEdit = Boolean(match);
  const router = useRouter();

  const createMatch = useCreateMatch();
  const updateMatch = useUpdateMatch(match?.id ?? '');

  const mutation = isEdit ? updateMatch : createMatch;

  const form = useForm<CreateMatchFormData>({
    resolver: zodResolver(createMatchSchema),
    defaultValues: {
      venueName: match?.venueName ?? '',
      clubId: match?.club?.id,
      cityId: match?.city.id,
      playedAt: match ? toLocalInputValue(new Date(match.playedAt)) : '',
      durationMin: match?.durationMin ?? 90,
      categories: match?.categories ?? [],
      notes: match?.notes ?? undefined,
    },
  });

  const { errors } = form.formState;

  // useWatch y no form.watch(): el segundo no se puede memoizar en render.
  const clubId = useWatch({ control: form.control, name: 'clubId' });

  const onSubmit = (data: CreateMatchFormData) => {
    mutation.mutate(
      { ...data, playedAt: new Date(data.playedAt).toISOString() },
      {
        onSuccess: () =>
          router.push(match ? `/matches/${match.id}` : '/matches'),
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <FormError error={mutation.error} />

      <Controller
        name="venueName"
        control={form.control}
        render={({ field }) => (
          <VenueField
            value={{ clubId, venueName: field.value }}
            onChange={(venue) => {
              form.setValue('clubId', venue.clubId);
              field.onChange(venue.venueName);
            }}
            error={errors.venueName?.message}
          />
        )}
      />

      {/* Con un club elegido la ciudad sale de ahí: preguntarla sería redundante. */}
      {!clubId && (
        <Controller
          name="cityId"
          control={form.control}
          render={({ field }) => (
            <CityField
              value={field.value}
              onChange={field.onChange}
              error={errors.cityId?.message}
            />
          )}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Día y hora"
          htmlFor="playedAt"
          error={errors.playedAt?.message}
        >
          <Input
            id="playedAt"
            type="datetime-local"
            min={toLocalInputValue(new Date())}
            {...form.register('playedAt')}
          />
        </FormField>

        <FormField
          label="Duración"
          htmlFor="durationMin"
          error={errors.durationMin?.message}
        >
          <Controller
            name="durationMin"
            control={form.control}
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onChange={(value) => field.onChange(Number(value))}
                options={DURATION_OPTIONS}
              />
            )}
          />
        </FormField>
      </div>

      <FormField
        label="Categorías que buscás"
        error={errors.categories?.message}
      >
        <Controller
          name="categories"
          control={form.control}
          render={({ field }) => (
            <CategoryPicker value={field.value} onChange={field.onChange} />
          )}
        />
      </FormField>

      <FormField
        label="Algo más que quieras aclarar"
        htmlFor="notes"
        error={errors.notes?.message}
      >
        <textarea
          id="notes"
          rows={3}
          placeholder="Llevamos las paletas, falta uno para completar."
          className={cn(formControlClassName, 'h-auto py-3')}
          {...form.register('notes')}
        />
      </FormField>

      <div className="flex gap-3">
        <Button type="submit" loading={mutation.isPending}>
          {isEdit ? 'Guardar cambios' : 'Crear partido'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            router.push(match ? `/matches/${match.id}` : '/matches')
          }
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
