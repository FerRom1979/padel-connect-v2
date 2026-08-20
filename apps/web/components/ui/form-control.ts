import { cn } from '@/lib/utils';

export const formControlClassName = cn(
  'flex h-12 w-full rounded-xl',
  'border border-border',
  'bg-surface',
  'px-4',
  'text-sm',
  'transition-colors',
  'placeholder:text-muted',
  'focus:outline-none',
  'focus:ring-2 focus:ring-primary/40',
  'focus:border-primary',
);
