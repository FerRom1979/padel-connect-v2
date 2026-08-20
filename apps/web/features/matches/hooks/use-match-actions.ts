import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { cancelMatch, joinMatch, leaveMatch } from '../api/matches.api';

// Las tres acciones cambian el mismo listado, así que comparten la invalidación.
function useMatchMutation(mutationFn: (id: string) => Promise<unknown>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MATCHES }),
  });
}

export const useJoinMatch = () => useMatchMutation(joinMatch);
export const useLeaveMatch = () => useMatchMutation(leaveMatch);
export const useCancelMatch = () => useMatchMutation(cancelMatch);
