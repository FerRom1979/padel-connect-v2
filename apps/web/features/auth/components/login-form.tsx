'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormData } from '../schemas/login.schema';
import { useLogin } from '../hooks/use-login';
import { useRouter } from 'next/navigation';
import {
  Button,
  FormError,
  FormField,
  Input,
  PasswordInput,
} from '@/components/ui';
import { AuthHeader, AuthLayout } from '@/components/auth';
import { AuthForm } from '@/components/auth-form/auth-form';

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { errors } = form.formState;

  const router = useRouter();

  const login = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Bienvenido"
        description="Accede a tu cuenta de Padel Connect."
      />
      <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <FormError error={login.error} />

        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="correo@email.com"
            {...form.register('email')}
          />
        </FormField>
        <FormField
          label="Contraseña"
          htmlFor="password"
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            autoComplete="current-password"
            {...form.register('password')}
          />
        </FormField>
        <Button type="submit" className="w-full" loading={login.isPending}>
          Ingresar
        </Button>

        <p className="text-center text-sm text-muted">
          ¿No tenés cuenta?{' '}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Creá una
          </Link>
        </p>
      </AuthForm>
    </AuthLayout>
  );
}
