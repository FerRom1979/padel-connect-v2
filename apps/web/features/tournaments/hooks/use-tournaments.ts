import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import {
  cancelTournament,
  createTournament,
  getTournament,
  getTournaments,
  registerInTournament,
  unregisterFromTournament,
  updateTournament,
} from '../api/tournaments.api';
import type {
  CreateTournamentPayload,
  RegisterPayload,
  TournamentFilters,
} from '../types';

export function useTournaments(filters: TournamentFilters) {
  return useQuery({
    queryKey: [...QUERY_KEYS.TOURNAMENTS, filters],
    queryFn: () => getTournaments(filters),
  });
}

export function useTournament(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.TOURNAMENTS, id],
    queryFn: () => getTournament(id),
  });
}

// Todas las acciones cambian el mismo listado, así que comparten la invalidación.
function useTournamentMutation<TArgs>(
  mutationFn: (args: TArgs) => Promise<unknown>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TOURNAMENTS }),
  });
}

// Propia, y no vía el helper: el genérico pierde el tipo de retorno y la
// pantalla de creación necesita el id del torneo recién publicado.
export function useCreateTournament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTournament,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TOURNAMENTS }),
  });
}

export const useRegisterInTournament = () =>
  useTournamentMutation(
    ({ id, ...payload }: RegisterPayload & { id: string }) =>
      registerInTournament(id, payload),
  );

export const useUnregisterFromTournament = () =>
  useTournamentMutation(unregisterFromTournament);

export const useCancelTournament = () =>
  useTournamentMutation(cancelTournament);

export function useUpdateTournament(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreateTournamentPayload>) =>
      updateTournament(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TOURNAMENTS }),
  });
}
