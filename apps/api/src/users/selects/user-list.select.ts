import { Prisma } from '@prisma/client';

export const userListSelect = {
  id: true,
  firstName: true,
  lastName: true,
  avatar: true,
  level: true,
  city: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.UserSelect;

export type UserList = Prisma.UserGetPayload<{
  select: typeof userListSelect;
}>;
