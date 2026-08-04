'use client';

import { Card, EmptyState } from '@/components/ui';

export function RecentActivity() {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Actividad reciente</h2>

        <p className="mt-1 text-sm text-gray-500">
          Aquí verás tu actividad más reciente.
        </p>
      </div>

      <EmptyState
        title="Aún no tienes actividad"
        description="Cuando empieces a jugar aparecerán aquí tus últimos movimientos."
      />
    </Card>
  );
}
