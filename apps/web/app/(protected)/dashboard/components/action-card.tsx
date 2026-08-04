'use client';

import { Card } from '@/components/ui';
import type { ReactNode } from 'react';

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
    <Card
      onClick={onClick}
      className="
        cursor-pointer
        transition-all
        hover:shadow-md
        hover:-translate-y-1
      "
    >
      <div className="flex flex-col gap-4">
        <div className="text-3xl">{icon}</div>

        <div>
          <h3 className="font-semibold">{title}</h3>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Card>
  );
}
