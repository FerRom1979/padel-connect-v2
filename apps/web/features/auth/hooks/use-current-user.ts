import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { getCurrentUser } from '../api/auth.api';
import { useAuthReady } from './use-auth-ready';

export function useCurrentUser() {
  const isReady = useAuthReady();

  return useQuery({
    queryKey: QUERY_KEYS.CURRENT_USER,
    queryFn: getCurrentUser,
    enabled: isReady,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
