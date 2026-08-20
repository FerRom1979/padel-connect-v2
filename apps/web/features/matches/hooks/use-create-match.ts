import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { createMatch, updateMatch } from '../api/matches.api';
import type { CreateMatchPayload } from '../types';

export function useCreateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMatch,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MATCHES }),
  });
}

export function useUpdateMatch(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreateMatchPayload>) =>
      updateMatch(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MATCHES }),
  });
}
