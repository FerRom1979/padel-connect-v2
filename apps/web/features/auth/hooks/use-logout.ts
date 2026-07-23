import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { removeToken } from '../storage/token-storage';

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  function logout() {
    removeToken();

    queryClient.removeQueries({
      queryKey: ['current-user'],
    });

    router.replace('/login');
  }

  return logout;
}
