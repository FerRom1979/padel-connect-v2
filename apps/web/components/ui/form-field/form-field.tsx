'use client';

import type { ReactNode } from 'react';

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: ReactNode;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {children}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
