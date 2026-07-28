import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, login } from '../api/auth.api';
import { setToken } from '../storage/token-storage';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: async (data) => {
      setToken(data.accessToken);

      const user = await getCurrentUser();

      queryClient.setQueryData(QUERY_KEYS.CURRENT_USER, user);
    },
  });
}
