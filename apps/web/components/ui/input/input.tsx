'use client';

import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-gray-300 px-3 py-2',
        'transition-colors outline-none',
        'placeholder:text-gray-400',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
        className,
      )}
      {...props}
    />
  );
}
