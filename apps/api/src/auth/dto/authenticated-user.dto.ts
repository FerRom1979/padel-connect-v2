import { UserRole } from '@prisma/client';

export class AuthenticatedUserDto {
  id: string;

  email: string;

  role: UserRole;

  isActive: boolean;
}
