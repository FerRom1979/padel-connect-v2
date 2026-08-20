'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export function ActionCard({
  icon,
  title,
  description,
  onClick,
}: ActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 text-left',
        'transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>

      <span>
        <span className="block font-semibold">{title}</span>

        <span className="mt-1 block text-sm text-muted">{description}</span>
      </span>
    </button>
  );
}
