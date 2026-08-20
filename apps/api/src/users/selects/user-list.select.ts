import { Prisma } from '@prisma/client';

export const userListSelect = {
  id: true,
  firstName: true,
  lastName: true,
  avatar: true,
  category: true,
  position: true,
  bio: true,
  city: {
    select: {
      id: true,
      name: true,
      province: true,
    },
  },
} satisfies Prisma.UserSelect;

export type UserList = Prisma.UserGetPayload<{
  select: typeof userListSelect;
}>;
