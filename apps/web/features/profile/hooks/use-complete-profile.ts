import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeProfile } from '../api/profile.api';
import { getCurrentUser } from '@/features/auth/api/auth.api';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useCompleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeProfile,
    onSuccess: async () => {
      const user = await getCurrentUser();
      queryClient.setQueryData(QUERY_KEYS.CURRENT_USER, user);
    },
  });
}
