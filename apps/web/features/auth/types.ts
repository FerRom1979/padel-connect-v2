export type UserRole = 'PLAYER' | 'CLUB_ADMIN' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}
