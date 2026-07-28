import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, login, register } from '../api/auth.api';
import { setToken } from '../storage/token-storage';
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

    onSuccess: async (data) => {
      setToken(data.accessToken);

      const user = await getCurrentUser();

      queryClient.setQueryData(['current-user'], user);
    },
  });
}
