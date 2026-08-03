import { cn } from '@/lib/utils';

export const formControlClassName = cn(
  'flex h-12 w-full rounded-xl',
  'border border-gray-300',
  'bg-white',
  'px-4',
  'text-sm',
  'transition-colors',
  'placeholder:text-gray-400',
  'focus:outline-none',
  'focus:ring-2 focus:ring-blue-500/20',
  'focus:border-blue-500',
);
