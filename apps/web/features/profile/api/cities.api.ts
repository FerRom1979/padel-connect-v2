import { api } from '@/lib/axios';
import type { City } from '../types';

export async function getCities(query: string): Promise<City[]> {
  const { data } = await api.get<City[]>('/cities', {
    params: {
      q: query,
    },
  });

  return data;
}
