'use client';

import { DashboardHeader } from './components/dashboard-header';
import { QuickActions } from './components/quick-actions';
import { UpcomingMatches } from './components/upcomming-matches';
import { RecentActivity } from './components/recent-activity';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader name="Fernando" />

      <QuickActions />

      <UpcomingMatches />

      <RecentActivity />
    </>
  );
}
