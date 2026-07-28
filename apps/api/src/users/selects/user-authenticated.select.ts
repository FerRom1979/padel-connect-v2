import { Prisma } from '@prisma/client';

export const userAuthenticatedSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  isActive: true,
  profileCompleted: true,
} satisfies Prisma.UserSelect;

export type UserAuthenticated = Prisma.UserGetPayload<{
  select: typeof userAuthenticatedSelect;
}>;
