import { api } from '@/lib/axios';
import type { Paginated } from '@/lib/paginated';

import type { Player, PlayerDetail, PlayerFilters } from '../types';

export async function getPlayers(
  filters: PlayerFilters,
): Promise<Paginated<Player>> {
  const { data } = await api.get<Paginated<Player>>('/users', {
    params: filters,
  });

  return data;
}

export async function getPlayer(id: string): Promise<PlayerDetail> {
  const { data } = await api.get<PlayerDetail>(`/users/${id}`);

  return data;
}
