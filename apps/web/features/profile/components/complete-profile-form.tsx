'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  CompleteProfileFormData,
  completeProfileSchema,
} from '../schemas/complete-profile.schema';
import { useCompleteProfile } from '../hooks/use-complete-profile';

export function CompleteProfileForm() {
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <select
        {...form.register('cityId', {
          valueAsNumber: true,
        })}
      >
        <option value="">Seleccione una ciudad</option>
        <option value="1">Lomas de Zamora</option>
        <option value="2">Lanús</option>
        <option value="3">Avellaneda</option>
      </select>
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
