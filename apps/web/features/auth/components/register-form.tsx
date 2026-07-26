'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { registerSchema, RegisterFormData } from '../schemas/register.schema';

import { useRegister } from '../hooks/use-register';

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { errors } = form.formState;

  const router = useRouter();

  const register = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...payload } = data;

    register.mutate(payload, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input placeholder="Nombre" {...form.register('firstName')} />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <input placeholder="Apellido" {...form.register('lastName')} />
      {errors.lastName && <span>{errors.lastName.message}</span>}

      <input type="email" placeholder="Email" {...form.register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        placeholder="Password"
        {...form.register('password')}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="password"
        placeholder="Confirmar password"
        {...form.register('confirmPassword')}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit" disabled={register.isPending}>
        {register.isPending ? 'Creando cuenta...' : 'Registrarse'}
      </button>
    </form>
  );
}
