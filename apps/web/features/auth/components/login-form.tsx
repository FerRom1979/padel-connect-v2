'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormData } from '../schemas/login.schema';
import { useLogin } from '../hooks/use-login';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { FormField } from '@/components/ui/form-field/form-field';
import { AuthHeader, AuthLayout } from '@/components/auth';
import { AuthForm } from '@/components/auth-form/auth-form';
import Link from 'next/link';

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
      <AuthForm onSubmit={form.handleSubmit(onSubmit)} className="ml-4">
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="correo@email.com"
            {...form.register('email')}
          />
        </FormField>
        <FormField
          label="Contraseña"
          htmlFor="password"
          error={errors.password?.message}
        >
          <Input id="password" type="password" {...form.register('password')} />
        </FormField>
        <Button type="submit" loading={login.isPending} className="w-full">
          Ingresar
        </Button>
        <div className="text-center text-sm text-slate-600">
          ¿No tienes una cuenta?{' '}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Crear cuenta
          </Link>
        </div>
      </AuthForm>
    </AuthLayout>
  );
}
