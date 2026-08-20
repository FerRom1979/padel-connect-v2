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
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      {children}

      {error && (
        <span role="alert" className="text-sm text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
