import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/auth.api';
import { getToken } from '../storage/token-storage';
import { useAuthReady } from './use-auth-ready';

export function useCurrentUser() {
  const isReady = useAuthReady();

  const token = isReady ? getToken() : null;

  return useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    enabled: isReady && !!token,
  });
}
