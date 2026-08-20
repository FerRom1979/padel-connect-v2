import { api } from '@/lib/axios';
import type { Paginated } from '@/lib/paginated';

import type { Club, ClubFilters, CreateClubPayload } from '../types';

export async function getClubs(filters: ClubFilters): Promise<Paginated<Club>> {
  const { data } = await api.get<Paginated<Club>>('/clubs', {
    params: filters,
  });

  return data;
}

export async function getClub(id: string): Promise<Club> {
  const { data } = await api.get<Club>(`/clubs/${id}`);

  return data;
}

export async function createClub(payload: CreateClubPayload): Promise<Club> {
  const { data } = await api.post<Club>('/clubs', payload);

  return data;
}
