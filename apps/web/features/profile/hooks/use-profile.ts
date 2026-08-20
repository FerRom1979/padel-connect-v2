import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { getProfile } from '../api/profile.api';

export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.PROFILE,
    queryFn: getProfile,
  });
}
