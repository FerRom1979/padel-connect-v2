import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register } from '../api/auth.api';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { RegisterPayload } from '../types';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      await register(payload);

      return login({
        email: payload.email,
        password: payload.password,
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CURRENT_USER,
      });
    },
  });
}
