import { api } from '@/lib/axios';
import type { CompleteProfilePayload, Profile } from '../types';

export async function completeProfile(payload: CompleteProfilePayload) {
  const { data } = await api.patch('/users/me/profile', payload);

  return data;
}

export async function getProfile(): Promise<Profile> {
  const { data } = await api.get<Profile>('/users/me');

  return data;
}
