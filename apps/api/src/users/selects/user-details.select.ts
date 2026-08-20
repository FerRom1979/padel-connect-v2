import { Prisma } from '@prisma/client';

/**
 * Lo que ve un jugador sobre otro. Sin email, teléfono, whatsapp ni instagram:
 * el contacto es dato personal y todavía no hay forma de que cada uno elija
 * qué comparte. Para tus propios datos está `userProfileSelect` en /users/me.
 */
export const userDetailSelect = {
  id: true,
  firstName: true,
  lastName: true,
  bio: true,
  category: true,
  position: true,
  dominantHand: true,
  preferredMatchType: true,
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
