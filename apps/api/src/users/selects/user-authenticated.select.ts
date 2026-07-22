import { Prisma } from '@prisma/client';

export const userAuthenticatedSelect = {
  id: true,
  email: true,
  role: true,
  isActive: true,
} satisfies Prisma.UserSelect;

export type UserAuthenticated = Prisma.UserGetPayload<{
  select: typeof userAuthenticatedSelect;
}>;
