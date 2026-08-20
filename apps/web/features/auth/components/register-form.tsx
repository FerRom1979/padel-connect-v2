'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { registerSchema, RegisterFormData } from '../schemas/register.schema';

import { useRegister } from '../hooks/use-register';
import {
  Button,
  FormError,
  FormField,
  Input,
  PasswordInput,
} from '@/components/ui';
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
        router.push('/complete-profile');
      },
    });
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Crear cuenta"
        description="Empezá con tus datos. Después nos contás cómo jugás."
        step={{ current: 1, total: 2 }}
      />
      <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <FormError error={register.error} />

        <FormField
          label="Nombre"
          htmlFor="firstName"
          error={errors?.firstName?.message}
        >
          <Input
            id="firstName"
            type="text"
            autoComplete="given-name"
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
            type="text"
            autoComplete="family-name"
            placeholder="Apellido"
            {...form.register('lastName')}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors?.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            {...form.register('email')}
          />
        </FormField>

        <FormField
          label="Contraseña"
          htmlFor="password"
          error={errors?.password?.message}
        >
          <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            {...form.register('password')}
          />
        </FormField>

        <FormField
          label="Confirmar contraseña"
          htmlFor="confirmPassword"
          error={errors?.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="Repetí tu contraseña"
            {...form.register('confirmPassword')}
          />
        </FormField>

        <Button type="submit" className="w-full" loading={register.isPending}>
          Registrarse
        </Button>

        <p className="text-center text-sm text-muted">
          ¿Ya tenés cuenta?{' '}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Iniciá sesión
          </Link>
        </p>
      </AuthForm>
    </AuthLayout>
  );
}
