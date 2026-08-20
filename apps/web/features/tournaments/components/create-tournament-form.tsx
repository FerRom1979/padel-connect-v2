'use client';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button, FormError, FormField, Input } from '@/components/ui';
import { formControlClassName } from '@/components/ui/form-control';
import { CategoryPicker } from '@/features/matches/components/category-picker';
import { VenueField } from '@/features/clubs/components/venue-field';
import { CityField } from '@/features/profile/components/city-field';
import { cn } from '@/lib/utils';

import {
  useCreateTournament,
  useUpdateTournament,
} from '../hooks/use-tournaments';
import type { Tournament } from '../types';
import {
  createTournamentSchema,
  type CreateTournamentFormData,
} from '../schemas/create-tournament.schema';

/** Valor para <input type="datetime-local">, que no acepta ISO con zona. */
function toLocalInputValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

const numberOrUndefined = (value: string) =>
  value === '' ? undefined : Number(value);

/** Mismo formulario para publicar y para editar. */
export function CreateTournamentForm({
  tournament,
}: { tournament?: Tournament } = {}) {
  const isEdit = Boolean(tournament);
  const router = useRouter();

  const createTournament = useCreateTournament();
  const updateTournament = useUpdateTournament(tournament?.id ?? '');

  const mutation = isEdit ? updateTournament : createTournament;

  const form = useForm<CreateTournamentFormData>({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      name: tournament?.name ?? '',
      venueName: tournament?.venueName ?? '',
      clubId: tournament?.club?.id,
      cityId: tournament?.city.id,
      startDate: tournament
        ? toLocalInputValue(new Date(tournament.startDate))
        : '',
      endDate: tournament?.endDate
        ? toLocalInputValue(new Date(tournament.endDate))
        : '',
      categories: tournament?.categories ?? [],
      maxTeams: tournament?.maxTeams ?? undefined,
      price: tournament?.price ?? undefined,
      description: tournament?.description ?? undefined,
    },
  });

  const { errors } = form.formState;

  // useWatch y no form.watch(): el segundo no se puede memoizar en render.
  const clubId = useWatch({ control: form.control, name: 'clubId' });

  const now = toLocalInputValue(new Date());

  return (
    <form
      onSubmit={form.handleSubmit((data) =>
        mutation.mutate(
          {
            ...data,
            startDate: new Date(data.startDate).toISOString(),
            endDate: data.endDate
              ? new Date(data.endDate).toISOString()
              : undefined,
          },
          {
            onSuccess: (saved) => router.push(`/tournaments/${saved.id}`),
          },
        ),
      )}
      className="max-w-xl space-y-6"
    >
      <FormError error={mutation.error} />

      <FormField label="Nombre" htmlFor="name" error={errors.name?.message}>
        <Input
          id="name"
          placeholder="Apertura de primavera"
          {...form.register('name')}
        />
      </FormField>

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

      {/* Con un club elegido la ciudad sale de ahí. */}
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
          label="Empieza"
          htmlFor="startDate"
          error={errors.startDate?.message}
        >
          <Input
            id="startDate"
            type="datetime-local"
            min={now}
            {...form.register('startDate')}
          />
        </FormField>

        <FormField
          label="Termina (si dura más de un día)"
          htmlFor="endDate"
          error={errors.endDate?.message}
        >
          <Input
            id="endDate"
            type="datetime-local"
            min={now}
            {...form.register('endDate')}
          />
        </FormField>
      </div>

      <FormField
        label="Categorías del torneo"
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

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Cupo de parejas"
          htmlFor="maxTeams"
          error={errors.maxTeams?.message}
        >
          <Input
            id="maxTeams"
            type="number"
            min={2}
            placeholder="16"
            {...form.register('maxTeams', { setValueAs: numberOrUndefined })}
          />
        </FormField>

        <FormField
          label="Inscripción por pareja"
          htmlFor="price"
          error={errors.price?.message}
        >
          <Input
            id="price"
            type="number"
            min={0}
            placeholder="25000"
            {...form.register('price', { setValueAs: numberOrUndefined })}
          />
        </FormField>
      </div>

      <FormField
        label="Detalles"
        htmlFor="description"
        error={errors.description?.message}
      >
        <textarea
          id="description"
          rows={3}
          maxLength={1000}
          placeholder="Formato de grupos y llave. Se juega con pelotas nuevas por partido."
          className={cn(formControlClassName, 'h-auto py-3')}
          {...form.register('description')}
        />
      </FormField>

      <div className="flex gap-3">
        <Button type="submit" loading={mutation.isPending}>
          {isEdit ? 'Guardar cambios' : 'Publicar torneo'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/tournaments')}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
