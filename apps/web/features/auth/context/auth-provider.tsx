'use client';

import { createContext } from 'react';
import { useCurrentUser } from '../hooks/use-current-user';
import type { AuthUser } from '../types';
import { useAuthReady } from '../hooks/use-auth-ready';

type AuthContextValue = {
  user: AuthUser | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  isReady: boolean;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useCurrentUser();
  const isReady = useAuthReady();
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
