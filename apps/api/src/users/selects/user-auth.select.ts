import { Prisma } from '@prisma/client';

export const userAuthSelect = {
  id: true,
  email: true,
  role: true,
  password: true,
} satisfies Prisma.UserSelect;

export type UserAuthSelect = Prisma.UserGetPayload<{
  select: typeof userAuthSelect;
}>;
