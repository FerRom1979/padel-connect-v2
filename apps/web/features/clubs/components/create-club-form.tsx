'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button, FormError, FormField, Input } from '@/components/ui';
import { formControlClassName } from '@/components/ui/form-control';
import { CityField } from '@/features/profile/components/city-field';
import { cn } from '@/lib/utils';

import { useCreateClub } from '../hooks/use-clubs';
import {
  createClubSchema,
  type CreateClubFormData,
} from '../schemas/create-club.schema';

export function CreateClubForm() {
  const router = useRouter();

  const createClub = useCreateClub();

  const form = useForm<CreateClubFormData>({
    resolver: zodResolver(createClubSchema),
    defaultValues: { name: '', address: '', phone: '', website: '' },
  });

  const { errors } = form.formState;

  return (
    <form
      onSubmit={form.handleSubmit((data) =>
        createClub.mutate(
          // El input vacío manda '', y la API espera una URL válida o nada.
          { ...data, website: data.website || undefined },
          { onSuccess: (club) => router.push(`/clubs/${club.id}`) },
        ),
      )}
      className="max-w-xl space-y-6"
    >
      <FormError error={createClub.error} />

      <FormField label="Nombre" htmlFor="name" error={errors.name?.message}>
        <Input
          id="name"
          placeholder="Club Los Robles"
          {...form.register('name')}
        />
      </FormField>

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

      <FormField
        label="Dirección"
        htmlFor="address"
        error={errors.address?.message}
      >
        <Input
          id="address"
          placeholder="Av. Meeks 1234"
          {...form.register('address')}
        />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Cantidad de canchas"
          htmlFor="courts"
          error={errors.courts?.message}
        >
          <Input
            id="courts"
            type="number"
            min={1}
            max={50}
            placeholder="4"
            {...form.register('courts', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
        </FormField>

        <FormField
          label="Teléfono"
          htmlFor="phone"
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            placeholder="11-5555-1234"
            {...form.register('phone')}
          />
        </FormField>
      </div>

      <FormField
        label="Sitio web"
        htmlFor="website"
        error={errors.website?.message}
      >
        <Input
          id="website"
          type="url"
          placeholder="https://clublosrobles.com"
          {...form.register('website')}
        />
      </FormField>

      <FormField
        label="Algo que valga la pena saber"
        htmlFor="description"
        error={errors.description?.message}
      >
        <textarea
          id="description"
          rows={3}
          maxLength={500}
          placeholder="Canchas techadas, estacionamiento y buffet."
          className={cn(formControlClassName, 'h-auto py-3')}
          {...form.register('description')}
        />
      </FormField>

      <div className="flex gap-3">
        <Button type="submit" loading={createClub.isPending}>
          Cargar club
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/clubs')}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
