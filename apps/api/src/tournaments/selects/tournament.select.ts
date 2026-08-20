import { Prisma } from '@prisma/client';

export const tournamentSelect = {
  id: true,
  name: true,
  venueName: true,
  startDate: true,
  endDate: true,
  categories: true,
  maxTeams: true,
  price: true,
  description: true,
  cancelledAt: true,
  organizerId: true,
  city: { select: { id: true, name: true, province: true } },
  club: { select: { id: true, name: true } },
  registrations: {
    select: {
      category: true,
      partnerName: true,
      createdAt: true,
      user: {
        select: { id: true, firstName: true, lastName: true, category: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  },
} satisfies Prisma.TournamentSelect;

export type TournamentDetail = Prisma.TournamentGetPayload<{
  select: typeof tournamentSelect;
}>;
