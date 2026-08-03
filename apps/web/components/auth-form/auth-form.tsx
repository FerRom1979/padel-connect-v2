import type { FormHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type AppFormProps = FormHTMLAttributes<HTMLFormElement>;

export function AuthForm({ children, className, ...props }: AppFormProps) {
  return (
    <form className={cn('space-y-6', className)} {...props}>
      {children}
    </form>
  );
}
