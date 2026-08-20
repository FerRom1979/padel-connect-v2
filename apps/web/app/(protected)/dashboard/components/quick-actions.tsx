'use client';

import { useRouter } from 'next/navigation';

import { QUICK_ACTIONS } from '@/constants/nav';

import { ActionCard } from './action-card';

export function QuickActions() {
  const router = useRouter();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {QUICK_ACTIONS.map(({ href, title, description, icon: Icon }) => (
        <ActionCard
          key={href}
          icon={<Icon className="h-6 w-6" />}
          title={title}
          description={description}
          onClick={() => router.push(href)}
        />
      ))}
    </section>
  );
}
