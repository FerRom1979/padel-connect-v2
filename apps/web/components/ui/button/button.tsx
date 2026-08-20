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
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary:
    'border border-border bg-surface text-foreground hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:bg-danger/90',
  ghost: 'hover:bg-surface-muted',
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
        'inline-flex items-center justify-center',
        'rounded-xl',
        'font-medium',
        'transition-colors',
        'focus:outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
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
