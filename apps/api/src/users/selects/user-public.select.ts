import { Prisma } from '@prisma/client';

export const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  profileCompleted: true,
  isActive: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type UserPublic = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;
