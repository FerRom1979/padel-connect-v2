'use client';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { useLogout } from '@/features/auth/hooks/use-logout';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const logout = useLogout();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) return <p>Not authenticated</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
