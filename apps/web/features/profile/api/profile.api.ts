import { api } from '@/lib/axios';
import type { CompleteProfilePayload } from '../types';

export async function completeProfile(payload: CompleteProfilePayload) {
  const { data } = await api.patch('/users/me/profile', payload);

  return data;
}
