'use client';

import { useRouter } from 'next/navigation';

import { Card, EmptyState } from '@/components/ui';

export function UpcomingMatches() {
  const router = useRouter();

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Próximos partidos</h2>

        <p className="mt-1 text-sm text-gray-500">
          Aquí aparecerán tus próximos partidos.
        </p>
      </div>

      <EmptyState
        title="No tienes partidos programados"
        description="Cuando te unas a un partido aparecerá aquí."
        actionLabel="Buscar partidos"
        onAction={() => router.push('/matches')}
      />
    </Card>
  );
}
