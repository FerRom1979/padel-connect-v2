import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { createClub, getClub, getClubs } from '../api/clubs.api';
import type { ClubFilters } from '../types';

export function useClubs(filters: ClubFilters) {
  return useQuery({
    queryKey: [...QUERY_KEYS.CLUBS, filters],
    queryFn: () => getClubs(filters),
  });
}

export function useClub(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.CLUBS, id],
    queryFn: () => getClub(id),
  });
}

export function useCreateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClub,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLUBS }),
  });
}
