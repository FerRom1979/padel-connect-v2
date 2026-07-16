import { Prisma } from '@prisma/client';

export const userDetailSelect = {
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
  bio: true,
  level: true,
  position: true,
  dominantHand: true,
  preferredMatchType: true,
  instagram: true,
  whatsapp: true,
  avatar: true,
  city: {
    select: {
      id: true,
      name: true,
      province: true,
    },
  },
} satisfies Prisma.UserSelect;

export type UserDetail = Prisma.UserGetPayload<{
  select: typeof userDetailSelect;
}>;
