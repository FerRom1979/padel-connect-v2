'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { registerSchema, RegisterFormData } from '../schemas/register.schema';

import { useRegister } from '../hooks/use-register';
import { Button } from '@/components/ui/button/button';
import { FormField, Input } from '@/components/ui';
import { AuthHeader, AuthLayout } from '@/components/auth';
import { AuthForm } from '@/components/auth-form/auth-form';

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
    <AuthLayout>
      <AuthHeader title="Crear cuenta" description="Comienza a jugar hoy" />
      <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          label="Nombre"
          htmlFor="firstName"
          error={errors?.firstName?.message}
        >
          <Input
            id="firstName"
            type="firstName"
            placeholder="Nombre"
            {...form.register('firstName')}
          />
        </FormField>

        <FormField
          label="Apellido"
          htmlFor="lastName"
          error={errors?.lastName?.message}
        >
          <Input
            id="lastName"
            type="lastName"
            placeholder="Apellido"
            {...form.register('lastName')}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors?.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...form.register('email')}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={errors?.password?.message}
        >
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...form.register('password')}
          />
        </FormField>

        <FormField
          label="Confirmar password"
          htmlFor="confirmPassword"
          error={errors?.confirmPassword?.message}
        >
          <Input
            id="confirmPassword"
            type="confirmPassword"
            placeholder="Confirmar password"
            {...form.register('confirmPassword')}
          />
        </FormField>

        <Button type="submit" disabled={register.isPending}>
          {register.isPending ? 'Creando cuenta...' : 'Registrarse'}
        </Button>
      </AuthForm>
    </AuthLayout>
  );
}
