'use client';

import { useRouter } from 'next/navigation';

import { ActionCard } from './action-card';
import { actions } from '../constants';

export function QuickActions() {
  const router = useRouter();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <ActionCard
          key={action.href}
          icon={action.icon}
          title={action.title}
          description={action.description}
          onClick={() => router.push(action.href)}
        />
      ))}
    </section>
  );
}
