import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { getPlayer, getPlayers } from '../api/players.api';
import type { PlayerFilters } from '../types';

export function usePlayers(filters: PlayerFilters) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PLAYERS, filters],
    queryFn: () => getPlayers(filters),
  });
}

export function usePlayer(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PLAYERS, id],
    queryFn: () => getPlayer(id),
  });
}
