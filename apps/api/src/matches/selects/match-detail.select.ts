import { Prisma } from '@prisma/client';

const player = {
  id: true,
  firstName: true,
  lastName: true,
  avatar: true,
  category: true,
  position: true,
} satisfies Prisma.UserSelect;

export const matchDetailSelect = {
  id: true,
  venueName: true,
  playedAt: true,
  durationMin: true,
  categories: true,
  notes: true,
  cancelledAt: true,
  organizerId: true,
  city: { select: { id: true, name: true, province: true } },
  club: { select: { id: true, name: true } },
  players: {
    select: { joinedAt: true, user: { select: player } },
    orderBy: { joinedAt: 'asc' },
  },
} satisfies Prisma.MatchSelect;

export type MatchDetail = Prisma.MatchGetPayload<{
  select: typeof matchDetailSelect;
}>;
