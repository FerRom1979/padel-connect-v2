import { Prisma } from '@prisma/client';

export const clubSelect = {
  id: true,
  name: true,
  address: true,
  courts: true,
  phone: true,
  website: true,
  description: true,
  createdAt: true,
  city: { select: { id: true, name: true, province: true } },
} satisfies Prisma.ClubSelect;

export type ClubDetail = Prisma.ClubGetPayload<{ select: typeof clubSelect }>;
