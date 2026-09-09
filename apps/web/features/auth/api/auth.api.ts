import { api } from '@/lib/axios';
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '../types';
import axios from 'axios';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);

  return data;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data } = await api.get<AuthUser>('/auth/me');

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
}

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>('/users', payload);

  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}
