import { Prisma } from '@prisma/client';

export const userProfileSelect = {
  id: true,

  email: true,

  firstName: true,
  lastName: true,

  phone: true,
  birthDate: true,

  avatar: true,
  bio: true,

  level: true,
  position: true,
  dominantHand: true,
  preferredMatchType: true,

  instagram: true,
  whatsapp: true,

  latitude: true,
  longitude: true,
  travelDistanceKm: true,

  profileCompleted: true,

  city: {
    select: {
      id: true,
      name: true,
      province: true,
      country: true,
    },
  },
} satisfies Prisma.UserSelect;

export type UserProfile = Prisma.UserGetPayload<{
  select: typeof userProfileSelect;
}>;
