'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'hover:bg-gray-100',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4 text-sm',
  lg: 'h-14 px-6 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center h-12',
        'rounded-xl',
        'font-medium',
        'transition-colors',
        'focus:outline-none',
        'focus:ring-2 focus:ring-blue-500/20',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',

        variants[variant],

        sizes[size],

        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
}
