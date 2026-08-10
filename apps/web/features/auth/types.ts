export type UserRole = 'PLAYER' | 'CLUB_ADMIN' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  profileCompleted: boolean;
}

export interface LoginResponse {
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  profileCompleted: boolean;
  isActive: boolean;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}
