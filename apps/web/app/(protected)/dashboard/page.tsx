'use client';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { DashboardHeader } from './components/dashboard-header';
import { QuickActions } from './components/quick-actions';
import { UpcomingMatches } from './components/upcomming-matches';
import { RecentActivity } from './components/recent-activity';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const logout = useLogout();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) return <p>Not authenticated</p>;

  return (
    <>
      <DashboardHeader name="Fernando" />

      <QuickActions />

      <UpcomingMatches />

      <RecentActivity />
    </>
  );
}
