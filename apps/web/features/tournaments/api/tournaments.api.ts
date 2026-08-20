import { api } from '@/lib/axios';
import type { Paginated } from '@/lib/paginated';

import type {
  CreateTournamentPayload,
  RegisterPayload,
  Tournament,
  TournamentFilters,
} from '../types';

export async function getTournaments(
  filters: TournamentFilters,
): Promise<Paginated<Tournament>> {
  const { data } = await api.get<Paginated<Tournament>>('/tournaments', {
    params: filters,
  });

  return data;
}

export async function getTournament(id: string): Promise<Tournament> {
  const { data } = await api.get<Tournament>(`/tournaments/${id}`);

  return data;
}

export async function createTournament(
  payload: CreateTournamentPayload,
): Promise<Tournament> {
  const { data } = await api.post<Tournament>('/tournaments', payload);

  return data;
}

export async function registerInTournament(
  id: string,
  payload: RegisterPayload,
): Promise<Tournament> {
  const { data } = await api.post<Tournament>(
    `/tournaments/${id}/registrations`,
    payload,
  );

  return data;
}

export async function unregisterFromTournament(
  id: string,
): Promise<Tournament> {
  const { data } = await api.delete<Tournament>(
    `/tournaments/${id}/registrations`,
  );

  return data;
}

export async function cancelTournament(id: string): Promise<Tournament> {
  const { data } = await api.patch<Tournament>(`/tournaments/${id}/cancel`);

  return data;
}

export async function updateTournament(
  id: string,
  payload: Partial<CreateTournamentPayload>,
): Promise<Tournament> {
  const { data } = await api.patch<Tournament>(`/tournaments/${id}`, payload);

  return data;
}
