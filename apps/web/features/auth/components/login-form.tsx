'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormData } from '../schemas/login.schema';
import { useLogin } from '../hooks/use-login';
import { useRouter } from 'next/navigation';

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
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input type="email" {...form.register('email')} />
      {errors.email && <span>{errors.email?.message}</span>}
      <input type="password" {...form.register('password')} />
      {errors.password?.message && <span>{errors.password?.message}</span>}
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? 'Ingresando...' : 'Login'}
      </button>
    </form>
  );
}
