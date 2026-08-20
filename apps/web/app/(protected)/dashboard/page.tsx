'use client';

import { useAuth } from '@/features/auth/hooks/use-auth';

import { DashboardHeader } from './components/dashboard-header';
import { QuickActions } from './components/quick-actions';
import { UpcomingMatches } from './components/upcomming-matches';
import { UpcomingTournaments } from './components/upcoming-tournaments';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <DashboardHeader name={user?.firstName ?? ''} />

      <QuickActions />

      <UpcomingMatches />

      <UpcomingTournaments />
    </>
  );
}
