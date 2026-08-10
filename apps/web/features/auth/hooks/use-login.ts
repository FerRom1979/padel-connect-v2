import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/auth.api';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CURRENT_USER,
      });
    },
  });
}
