import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { logout } from '../api/auth.api';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.CURRENT_USER, null);

      router.replace('/login');
    },
  });
}
