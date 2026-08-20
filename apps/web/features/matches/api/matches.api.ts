import { api } from '@/lib/axios';
import type { Paginated } from '@/lib/paginated';

import type { CreateMatchPayload, Match, MatchFilters } from '../types';

export async function getMatches(
  filters: MatchFilters,
): Promise<Paginated<Match>> {
  const { data } = await api.get<Paginated<Match>>('/matches', {
    params: filters,
  });

  return data;
}

export async function createMatch(payload: CreateMatchPayload): Promise<Match> {
  const { data } = await api.post<Match>('/matches', payload);

  return data;
}

export async function joinMatch(id: string): Promise<Match> {
  const { data } = await api.post<Match>(`/matches/${id}/players`);

  return data;
}

export async function leaveMatch(id: string): Promise<Match> {
  const { data } = await api.delete<Match>(`/matches/${id}/players`);

  return data;
}

export async function cancelMatch(id: string): Promise<Match> {
  const { data } = await api.patch<Match>(`/matches/${id}/cancel`);

  return data;
}

export async function getMatch(id: string): Promise<Match> {
  const { data } = await api.get<Match>(`/matches/${id}`);

  return data;
}

export async function updateMatch(
  id: string,
  payload: Partial<CreateMatchPayload>,
): Promise<Match> {
  const { data } = await api.patch<Match>(`/matches/${id}`, payload);

  return data;
}
