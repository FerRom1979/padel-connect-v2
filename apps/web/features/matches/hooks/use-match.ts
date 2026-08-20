import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { getMatch } from '../api/matches.api';

export function useMatch(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.MATCHES, id],
    queryFn: () => getMatch(id),
  });
}
