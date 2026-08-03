'use client';

import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { formControlClassName } from '../form-control';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(formControlClassName, className)} {...props} />;
}
