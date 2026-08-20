import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { getMatches } from '../api/matches.api';
import type { MatchFilters } from '../types';

export function useMatches(filters: MatchFilters) {
  return useQuery({
    queryKey: [...QUERY_KEYS.MATCHES, filters],
    queryFn: () => getMatches(filters),
  });
}
