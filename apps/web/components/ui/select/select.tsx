'use client';

import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  options,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded-md border border-gray-300 px-3 py-2',
        'outline-none transition-colors',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        'disabled:cursor-not-allowed disabled:bg-gray-100',
        className,
      )}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
