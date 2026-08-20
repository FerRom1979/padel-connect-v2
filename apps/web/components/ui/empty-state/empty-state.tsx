'use client';

import { Court } from '@/components/brand/court';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'rounded-xl border border-dashed border-border',
        'bg-surface',
        'px-6 py-12',
        'text-center',
        className,
      )}
    >
      {/* Una cancha vacía dice "acá todavía no hay nada". Arriba del texto, no
          detrás: como marca de agua tapaba el título. */}
      <Court className="w-16 text-border" />

      <h3 className="mt-5 text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>

      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
